import { useEffect, useRef } from 'react';
import styled from 'styled-components'
import videojs from 'video.js'

import Asset from 'pages/PlayerView/components/Asset'
import Button from 'components/Button'

const pannellumConfig = {
	"autoLoad": true,
	"hotSpotDebug": true,
	"default": {
		"firstScene": "gallery",
		"sceneFadeDuration": 500
	},
	"scenes": {
		"gallery": {
			"type": "equirectangular",
			"panorama": require('images/360img.jpg').default,
			"hotSpots": []
		},
		"office": {
			"type": "equirectangular",
			"panorama": require('images/avatar.png').default,
			"hotSpots": []
		}
	}
}

const StyledAssetViewer = styled.div``

const StyledAssetContainer = styled.div`
	background-color: red;
	border: 8px solid #e4e4e4;
	height: 0;
	padding-bottom: 56.25%;
	position: relative;
	width: 100%;
`

const StyledAssetMenu = styled.div`
	background-color: #e4e4e4;
	display: flex;
	justify-content: flex-start;
	padding: 10px 8px 16px;
	overflow: hidden;
	width: 100%;
	button {
		margin: 0 5px;
	}
`

function AssetViewer({ assets, activeAsset, changeActiveAsset }) {
	const videoTagRef = useRef()
	const playerRef = useRef()

	useEffect(() => {

    // Attach panellum.js script for 360 images
		const script = document.createElement("script");
		script.src = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js'
		script.async = true;
		script.onload = () => {
			if (window.pn) { window.pn.destroy() }
			window.pn = window.pannellum.viewer('360', pannellumConfig)
		}
		document.body.appendChild(script)

		// instantiate Video.js
		playerRef.current = videojs(videoTagRef.current, { autoplay: true }, () => {
			console.log('onPlayerReady', this)
		})
		
		return () => {

			// destroy player on unmount
			if (playerRef.current) {
				playerRef.current.dispose()
			}

		}
		
	}, [])

	useEffect(() => {
			if (activeAsset.type === "pannellum") {
				if (window.pn) {
					let currentScene = window.pn.getScene()
					if (currentScene !== activeAsset.name) {
						window.pn.loadScene(activeAsset.name)
					}
				}
			} else if (activeAsset.type === "img") {
				let imgElement = document.querySelector('#img img')
				let currentSrc = imgElement.getAttribute('src')
				if (currentSrc !== activeAsset.path) {
					imgElement.setAttribute('src', activeAsset.path)
				}
			} else if (activeAsset.type === "video") {
				playerRef.current.src(activeAsset.path)
			}
	}, [activeAsset])

  return (
		<StyledAssetViewer>
			<StyledAssetContainer id="AssetWindow">
				{["pannellum", "img", "video"].map((assetType, idx) => (
					<Asset key={idx} assetType={assetType} activeAsset={activeAsset}>
						{assetType === 'img' &&
							<img className="asset" src="" alt=""/>
						}
						{assetType === 'video' &&
							<div data-vjs-player>
								<video style={{ width:"100%", height:"100%" }} ref={videoTagRef} className="video-js"></video>
							</div>
						}
					</Asset>
				))}
			</StyledAssetContainer>
			<StyledAssetMenu>
				{assets.map((asset, idx) => (
					<Button key={idx} asset={asset} isActive={activeAsset.name === asset.name} onClick={changeActiveAsset} />
				))}
			</StyledAssetMenu>
		</StyledAssetViewer>
  );
}

export default AssetViewer;
