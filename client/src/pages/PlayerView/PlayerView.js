import React, { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client"

import Container from 'components/Container'
import AssetViewer from 'pages/PlayerView/components/AssetViewer'
import Cursors from 'pages/PlayerView/components/Cursors'

import { getCursorPosition } from 'helpers/cursors'

const SERVER = "http://localhost:4001/"
const socket = socketIOClient(SERVER, {query: 'name=Mary'})

function PlayerView() {
	const [clients, setClients] = useState({})
	const [activeAsset, setActiveAsset] = useState(initialAssets[2])
	const [assets, setAssets] = useState(initialAssets)
	const activeAssetRef = useRef(activeAsset)

	useEffect(() => {

		console.log('inside PlayerView useEFfect')

		socket.on('create', function(data) {
			setClients(prev => {
				let newClients = {...prev}
				newClients[data.id] = data
				return newClients
			})
			window.clients = clients
		})

		socket.on('delete', function(data) {
			setClients(prev => {
				let newClients = {...prev}
				delete newClients[data.id]
				return newClients
			})
			window.clients = clients
		})

		socket.on('update', function(data) {
			let display = (data.display === 'block' && data.activeAsset.name === activeAssetRef.current.name) ? 'block' : 'none'
			setClients(prev => {
				let newClients = {...prev}
				if (display === 'block') {
					let cursorPosition = getCursorPosition(data.position, data.activeAsset)
					newClients[data.id].x = cursorPosition[0]
					newClients[data.id].y = cursorPosition[1]
					display = cursorPosition[2]
				}
				newClients[data.id].display = display
				newClients[data.id].activeAsset = data.activeAsset.name
				return newClients
			})
		})

		socket.on('changeAsset', function(data) {
			// update activeClients for each asset, triggered by asset change
			setAssets(prev => {
				let assets = prev
				assets.forEach((asset) => {
					let inActiveClients = data.id in asset.activeClients
					if (asset.name === data.newAssetName) {
						// add data.id to asset's activeClients if not already present
						if (!inActiveClients) {
							asset.activeClients[data.id] = {color: data.client.color, name: data.client.name}
						}
					}
					if (asset.name === data.prevAssetName) {
						// remove data.id from asset's activeClients if present
						if (inActiveClients) {
							delete asset.activeClients[data.id]
						}
					}
				})
				return assets
			})
		})

		socket.on('updateClients', function(data) {
			let newClients = {}
			Object.values(data.clients).forEach((client) => {
				if (client.id !== socket.id) {
					let display = (client.display === 'block' && client.activeAsset.name === activeAssetRef.current.name) ? 'block' : 'none'
					if (display === 'block') {
						let cursorPosition = getCursorPosition(client.position, client.activeAsset)
						client.x = cursorPosition[0]
						client.y = cursorPosition[1]
						display = cursorPosition[2]
					}
					client.display = display
					client.activeAsset = client.activeAsset.name
					newClients[client.id] = client
				}
			})
			setClients(newClients)
			window.test = newClients
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

		// window.setInterval(function() {
		let updateClientInterval = window.setInterval(function() {
			if (prevMouseX !== mouseX || prevMouseY !== mouseY) {
				let assetWindow = document.getElementById('AssetWindow')
				let display = assetWindow.contains(evt.target) ? 'block' : 'none'

				if (activeAsset.type === 'pannellum') {
					position = window.pn.mouseEventToCoords(evt)
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
				newAssetName: newAsset.name,
				prevAssetName: activeAsset.name,
			})
		}
	}

  return (
		<Container>
			<AssetViewer assets={assets}  activeAsset={activeAsset} changeActiveAsset={changeActiveAsset}></AssetViewer>
			<Cursors clients={clients}></Cursors>
		</Container>
  )
}

export default PlayerView;


const initialAssets = [
	{
		"path": require('images/360img.jpg').default,
		"name": "gallery",
		"label": "Hahn's Gallery",
		"type": "pannellum",
		"activeClients": {},
	},
	{
		"path": require('images/360img.jpg').default,
		"name": "office",
		"label": "Office",
		"type": "pannellum",
		"activeClients": {},
	},
	{
		"path": require('images/avatar.png').default,
		"name": "avatar",
		"label": "Avatar",
		"type": "img",
		"activeClients": {},
	},
	{
		"path": require('images/cblock.jpg').default,
		"name": "cblock",
		"label": "C-Block",
		"type": "img",
		"activeClients": {},
	},
	{
		"path": require('images/video-file.mp4').default,
		"name": "cartoon",
		"label": "Video",
		"type": "video",
		"activeClients": {},
	},
]
