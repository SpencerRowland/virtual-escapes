
export function getCursorPosition(position, activeAsset) {
	let x, y, display = 'block'
	if (activeAsset.type === 'pannellum') {
		let cursorPosition = get360CursorPosition(position, window.pn)
		x = cursorPosition[0]
		y = cursorPosition[1]

		// set display to none if cursor is out of view on 360 images
		let canvasDimensions = window.pn.getRenderer().getCanvas().getBoundingClientRect()
		let minX = canvasDimensions.left
		let maxX = canvasDimensions.right
		let minY = canvasDimensions.top
		let maxY = canvasDimensions.bottom
		if (x < minX || x > maxX || y < minY || y > maxY) {
			display = 'none'
		}

	} else {
		let assetWindow = document.getElementById('AssetWindow')
		x = assetWindow.offsetWidth * position[0] + assetWindow.offsetLeft
		y = assetWindow.offsetHeight * position[1] + assetWindow.offsetTop
	}
	return [x, y, display]
}

function get360CursorPosition(position, pannellum) {

  let [pitch, yaw] = position
  let config = pannellum.getConfig()
  let pitchSin = Math.sin(pitch * Math.PI / 180)
  let pitchCos = Math.cos(pitch * Math.PI / 180)
  let configPitchSin = Math.sin(config.pitch * Math.PI / 180)
  let configPitchCos = Math.cos(config.pitch * Math.PI / 180)
  let yawCos = Math.cos((-yaw + config.yaw) * Math.PI / 180)
  let z = pitchSin * configPitchSin + pitchCos * yawCos * configPitchCos

  if ((yaw <= 90 && yaw > -90 && z <= 0) ||
    ((yaw > 90 || yaw <= -90) && z <= 0)) {
		return [0, 0]
  } else {
		var yawSin = Math.sin((-yaw + config.yaw) * Math.PI / 180),
				hfovTan = Math.tan(config.hfov * Math.PI / 360);
		// Subpixel rendering doesn't work in Firefox
		// https://bugzilla.mozilla.org/show_bug.cgi?id=739176
		var canvas = pannellum.getRenderer().getCanvas(),
				canvasWidth = canvas.clientWidth,
				canvasHeight = canvas.clientHeight
		var coord = [-canvasWidth / hfovTan * yawSin * pitchCos / z / 2,
				-canvasWidth / hfovTan * (pitchSin * configPitchCos -
					pitchCos * yawCos * configPitchSin) / z / 2]
		// Apply roll 
		var rollSin = Math.sin(config.roll * Math.PI / 180),
				rollCos = Math.cos(config.roll * Math.PI / 180)
		coord = [coord[0] * rollCos - coord[1] * rollSin,
							coord[0] * rollSin + coord[1] * rollCos]
		coord[0] += (canvasWidth) / 2 + canvas.getBoundingClientRect().x
		coord[1] += (canvasHeight) / 2 + canvas.getBoundingClientRect().y
		return coord
  }
}
