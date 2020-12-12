import React, { useState, useEffect, useRef } from "react";

import socketIOClient from "socket.io-client"
import styled from 'styled-components'
import 'simplebar' // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import 'simplebar/dist/simplebar.css'

import Container from 'components/Container'
import AssetThumbnail from 'pages/PlayerView/components/AssetThumbnail'
import AssetViewer from 'pages/PlayerView/components/AssetViewer'
import Cursors from 'pages/PlayerView/components/Cursors'

import { getCursorPosition } from 'helpers/cursors'

const SERVER = "http://localhost:4001/"
const socket = socketIOClient(SERVER, {query: 'name=Mary'})

const Assets = styled.div`
	display: flex;
	flex: 0 0 175px;
	flex-direction: column;
	overflow: auto;
	padding: ${props => props.position === 'left' ? "16px 16px 16px 20px" : "16px 20px 16px 16px"};
	span {
		text-align: ${props => props.position};
	}
	.simplebar-scrollbar:before {
		background-image: linear-gradient(-131deg, rgb(103, 101, 101) 0%, rgb(51, 51, 51) 100%);
	}
`

function PlayerView() {
	const [clients, setClients] = useState({})
	const [activeAsset, setActiveAsset] = useState(initialAsset)
	const [assets, setAssets] = useState(initialAssets)
	const activeAssetRef = useRef(activeAsset)

	useEffect(() => {

		socket.on('changeAsset', function(data) {
			let results = refreshCursors(data.clients, false, assets)
			setAssets(results.newAssets)
		})

		socket.on('updateClients', function(data) {
			let results = refreshCursors(data.clients, true, null)
			setClients(results.newClients)
		})

		socket.on('clientConnected', function(data) {
			let results = refreshCursors(data.clients, true, assets)
			setClients(results.newClients)
			setAssets(results.newAssets)
		})

		socket.on('cleanup', function(data) {
			// cleanup when client disconnects
			let results = refreshCursors(data.clients, true, assets)
			setClients(results.newClients)
			setAssets(results.newAssets)
		})

		return () => {
			socket.disconnect()
		}

	}, [])

	useEffect(() => {

		let evt, mouseX, mouseY, pctX, pctY, position, prevMouseX, prevMouseY

		document.addEventListener('mousemove', setMouseMoveParameters)
		function setMouseMoveParameters(e) {
			mouseX = e.pageX
			mouseY = e.pageY
			evt = e
		}

		let updateClientInterval = window.setInterval(function() {
			if (prevMouseX !== mouseX || prevMouseY !== mouseY) {
				let assetWindow = document.getElementById('AssetWindow')
				let display = assetWindow.contains(evt.target) ? 'block' : 'none'

				if (activeAsset.type === 'pannellum') {
					position = window.pn.mouseEventToCoords(evt)
				} else if (activeAsset.type === 'img') {
					let imgElement = assetWindow.querySelector('#img img')
					let imgElementDimensions = imgElement.getBoundingClientRect()
					display = evt.target.matches('#img img') ? 'block' : 'none'
					pctX = (mouseX - imgElementDimensions.x) / imgElementDimensions.width
					pctY = (mouseY - imgElementDimensions.y) / imgElementDimensions.height
					position = [pctX, pctY]
				} else {
					pctX = (mouseX - assetWindow.offsetLeft) / assetWindow.offsetWidth
					pctY = (mouseY - assetWindow.offsetTop) / assetWindow.offsetHeight
					position = [pctX, pctY]
				}

				socket.emit('update', {
					id: socket.id,
					display: display,
					activeAsset: activeAsset,
					position: position,
				})
				prevMouseX = mouseX
				prevMouseY = mouseY
			}
		}, 100)

		return () => {
			document.removeEventListener('mousemove', setMouseMoveParameters)
			window.clearInterval(updateClientInterval)
		}

	}, [activeAsset])


	function changeActiveAsset(newAsset) {
		if (newAsset.name !== activeAsset.name) {
			setActiveAsset(newAsset)
			activeAssetRef.current = newAsset
			socket.emit('changeAsset', {
				id: socket.id,
				newAsset: newAsset,
			})
		}
	}

	function refreshCursors(clientsFromServer, updateClients=false, prevAssets=null) {
		let newClients = {}
		let activeClientsForAssets = {}
		Object.values(clientsFromServer).forEach((client) => {
			if (client.id !== socket.id) {

				if (updateClients) {
					let display = (client.display === 'block' && client.activeAsset.name === activeAssetRef.current.name) ? 'block' : 'none'
					if (display === 'block') {
						let cursorPosition = getCursorPosition(client.position, client.activeAsset)
						client.x = cursorPosition[0]
						client.y = cursorPosition[1]
						display = cursorPosition[2]
					}
					client.display = display
					newClients[client.id] = client
				}

				if (prevAssets) {

						// get clients active asset, set to initialAsset on load if null
						let clientActiveAsset = client.activeAsset || initialAsset

						// create client object in activeClientsForAssets if not yet created
						if (!(clientActiveAsset.name in activeClientsForAssets)) {
							activeClientsForAssets[clientActiveAsset.name] = {}
						}

						// update activeClientsForAssets with client's details
						activeClientsForAssets[clientActiveAsset.name][client.id] = {
							color: client.color,
							name: client.name
						}
				}

			}
		})

		let results = {}
		if (updateClients) { results['newClients'] = newClients }
		if (prevAssets) {
			let newAssets = [...prevAssets]
			newAssets.forEach((asset) => {
				if (asset.name in activeClientsForAssets) {
					asset.activeClients = activeClientsForAssets[asset.name]
				} else {
					asset.activeClients = {}
				}
			})
			results['newAssets'] = newAssets
		}
		return results
	}

  return (
		<Container>
			<Assets position="left" data-simplebar data-simplebar-direction="rtl" data-simplebar-auto-hide="false">
				{assets.filter(asset => asset.section === "spaces").map((asset, idx) => (
					<AssetThumbnail
						key={idx}
						asset={asset}
						activeAssetName={activeAsset.name}
						onClick={changeActiveAsset}
						position="left"
					>
					</AssetThumbnail>
				))}
			</Assets>
			<AssetViewer assets={assets}  activeAsset={activeAsset}></AssetViewer>
			<Cursors clients={clients}></Cursors>
			<Assets position="right" data-simplebar data-simplebar-auto-hide="false">
				{assets.filter(asset => asset.section === "inventory").map((asset, idx) => (
					<AssetThumbnail
						key={idx}
						asset={asset}
						activeAssetName={activeAsset.name}
						onClick={changeActiveAsset}
						position="right"
					></AssetThumbnail>
				))}
			</Assets>
		</Container>
  )
}

export default PlayerView;


const initialAssets = [
	{
		"path": require('images/san-francisco.jpg').default,
		"thumbnail": require('images/san-francisco-thumbnail.jpg').default,
		"name": "san-francisco",
		"label": "San Francisco",
		"section": "spaces",
		"order": 1,
		"type": "pannellum",
		"activeClients": {},
	},
	{
		"path": require('images/tramway.jpg').default,
		"thumbnail": require('images/tramway-thumbnail.jpg').default,
		"name": "tramway",
		"label": "Tramway",
		"section": "spaces",
		"order": 2,
		"type": "pannellum",
		"activeClients": {},
	},
	{
		"path": require('images/bridge.jpg').default,
		"thumbnail": require('images/bridge-thumbnail.jpg').default,
		"name": "bridge",
		"label": "Bridge",
		"section": "spaces",
		"order": 3,
		"type": "pannellum",
		"activeClients": {},
	},
	{
		"path": require('images/milky-way.jpg').default,
		"thumbnail": require('images/milky-way-thumbnail.jpg').default,
		"name": "milky-way",
		"label": "Milky Way",
		"section": "spaces",
		"order": 4,
		"type": "pannellum",
		"activeClients": {},
	},
	{
		"path": require('images/mountains.jpg').default,
		"thumbnail": require('images/mountains-thumbnail.jpg').default,
		"name": "mountains",
		"label": "Mountains",
		"section": "spaces",
		"order": 5,
		"type": "pannellum",
		"activeClients": {},
	},
	{
		"path": require('images/venice.jpg').default,
		"thumbnail": require('images/venice-thumbnail.jpg').default,
		"name": "venice",
		"label": "Venice",
		"section": "spaces",
		"order": 6,
		"type": "pannellum",
		"activeClients": {},
	},
	{
		"path": require('images/valley.jpg').default,
		"thumbnail": require('images/valley-thumbnail.jpg').default,
		"name": "valley",
		"label": "Valley",
		"section": "spaces",
		"order": 7,
		"type": "pannellum",
		"activeClients": {},
	},
	{
		"path": require('images/combo-lock-1.png').default,
		"thumbnail": require('images/combo-lock-1-thumbnail.png').default,
		"name": "combo-lock-1",
		"label": "Combo Lock",
		"section": "inventory",
		"order": 1,
		"type": "img",
		"activeClients": {},
	},
	{
		"path": require('images/key-1.png').default,
		"thumbnail": require('images/key-1-thumbnail.png').default,
		"name": "key-1",
		"label": "Key",
		"section": "inventory",
		"order": 2,
		"type": "img",
		"activeClients": {},
	},
	{
		"path": require('images/magnifying-glass.png').default,
		"thumbnail": require('images/magnifying-glass-thumbnail.png').default,
		"name": "magnifying-glass",
		"label": "Magnifying Glass",
		"section": "inventory",
		"order": 3,
		"type": "img",
		"activeClients": {},
	},
	// {
	// 	"path": require('images/360video.mp4').default,
	// 	"thumbnail": require('images/key-1-thumbnail.png').default,
	// 	"name": "video-360-2",
	// 	"label": "360 Video",
	// 	"section": "inventory",
	// 	"order": 3,
	// 	"type": "video",
	// 	"activeClients": {},
	// },
	{
		"path": require('images/video-file.mp4').default,
		"thumbnail": require('images/cartoon-video-thumbnail.jpg').default,
		"name": "cartoon",
		"label": "Video",
		"section": "inventory",
		"order": 4,
		"type": "video",
		"activeClients": {},
	},
	{
		"path": require('images/wrench.png').default,
		"thumbnail": require('images/wrench-thumbnail.png').default,
		"name": "wrench",
		"label": "Wrench",
		"section": "inventory",
		"order": 5,
		"type": "img",
		"activeClients": {},
	},
	{
		"path": require('images/book.png').default,
		"thumbnail": require('images/book-thumbnail.png').default,
		"name": "book",
		"label": "Book",
		"section": "inventory",
		"order": 6,
		"type": "img",
		"activeClients": {},
	},
]
const initialAsset = initialAssets[1]

