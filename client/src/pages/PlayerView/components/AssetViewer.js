import { useEffect, useRef } from 'react';
import styled from 'styled-components'
import videojs from 'video.js'

import Asset from 'pages/PlayerView/components/Asset'


const pannellumConfig = {
	"autoLoad": true,
	"hotSpotDebug": true,
	"default": {
		"firstScene": "tramway",
		"sceneFadeDuration": 500
	},
	"scenes": {
		"san-francisco": {
			"type": "equirectangular",
			"panorama": require('images/san-francisco.jpg').default,
			"hotSpots": []
		},
		"tramway": {
			"type": "equirectangular",
			"panorama": require('images/tramway.jpg').default,
			"hotSpots": []
		},
		"bridge": {
			"type": "equirectangular",
			"panorama": require('images/bridge.jpg').default,
			"hotSpots": []
		},
		"milky-way": {
			"type": "equirectangular",
			"panorama": require('images/milky-way.jpg').default,
			"hotSpots": []
		},
		"mountains": {
			"type": "equirectangular",
			"panorama": require('images/mountains.jpg').default,
			"hotSpots": []
		},
		"venice": {
			"type": "equirectangular",
			"panorama": require('images/venice.jpg').default,
			"hotSpots": []
		},
		"valley": {
			"type": "equirectangular",
			"panorama": require('images/valley.jpg').default,
			"hotSpots": []
		}
	}
}

const StyledAssetViewer = styled.div`
	display: flex;
	align-items: center;
	flex: 1 1 0;
	margin: 42px;
	position: relative;
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
		<StyledAssetViewer id="AssetWindow">
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
		</StyledAssetViewer>
  );
}

export default AssetViewer;
