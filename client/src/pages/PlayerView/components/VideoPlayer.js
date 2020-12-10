import { useEffect, useRef } from 'react'
import videojs from 'video.js'


function VideoPlayer(props) {
	const playerRef = useRef()
 
	useEffect(() => {

		// instantiate Video.js
		const player = videojs(playerRef.current, { autoplay: true }, () => {
			console.log('onPlayerReady', this)
		})
		window.player = player
		
		return () => {

			// destroy player on unmount
			if (player) {
				player.dispose()
			}

		}
		
	}, [])

	return (
		<div data-vjs-player>
			<video style={{ width:"100%", height:"100%" }} ref={playerRef} className="video-js"></video>
		</div>
	)
}

export default VideoPlayer
