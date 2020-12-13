
export function getCursorPosition(position, activeAsset) {
	let x, y, display = 'block', outOfView = ''
	if (activeAsset.type === 'pannellum') {
		if (window.pn) {
			let cursorPosition = get360CursorPosition(position, window.pn)
			x = cursorPosition[0]
			y = cursorPosition[1]
	
			// set display to none if cursor is out of view on 360 images
			let canvasDimensions = window.pn.getRenderer().getCanvas().getBoundingClientRect()
			let outOfViewCoordinates = getOutOfViewCoordinates(x, y, canvasDimensions)
			x = outOfViewCoordinates[0]
			y = outOfViewCoordinates[1]
			outOfView = outOfViewCoordinates[2]
			// [x, y] = getOutOfViewCoordinates(x, y, canvasDimensions)
			// if (x < minX || x > maxX || y < minY || y > maxY) {
			// 	display = 'none'
			// }
		} else {
			x = 0
			y = 0
			display = 'none'
		}
	} else if (activeAsset.type === 'img') {
		let imgElement = document.querySelector('#img img')
		let imgElementDimensions = imgElement.getBoundingClientRect()
		console.log(imgElement)
		console.log(imgElementDimensions)
		x = imgElementDimensions.width * position[0] + imgElementDimensions.x
		y = imgElementDimensions.height * position[1] + imgElementDimensions.y
	} else {
		let assetWindow = document.getElementById('AssetWindow')
		x = assetWindow.offsetWidth * position[0] + assetWindow.offsetLeft
		y = assetWindow.offsetHeight * position[1] + assetWindow.offsetTop
	}
	return [x, y, display, outOfView]
}

function getOutOfViewCoordinates(x, y, dimensions) {
	let minX = dimensions.left
	let maxX = dimensions.right
	let minY = dimensions.top
	let maxY = dimensions.bottom
	let width = dimensions.width
	let height = dimensions.height
	let xOutOfBounds = 0
	let yOutOfBounds = 0
	let outOfView = null
	if (x > maxX) {
		xOutOfBounds = x - maxX
	} else if (x < minX) {
		xOutOfBounds = x - minX
	}
	if (y > maxY) {
		yOutOfBounds = y - maxY
	} else if (y < minY) {
		yOutOfBounds = y - minY
	}
	if (Math.abs(xOutOfBounds) > 0 || Math.abs(yOutOfBounds) > 0) {
		let xMidPoint = (minX + maxX)/2
		let yMidPoint = (minY + maxY)/2
		let xAbs, yAbs
		if (Math.abs(xOutOfBounds) > Math.abs(yOutOfBounds)) {
			// coordinates will be closer to x axis
			let a = Math.abs(xOutOfBounds) + width/2
			let b = Math.abs(yOutOfBounds) + height/2
			let c = pythagorean(a, b)
			let pctX = (width/2/a)
			yAbs = Math.sqrt(Math.pow(c*pctX, 2) - Math.pow(width/2, 2))
			xAbs = width/2
		} else {
			// coordinates will be closer to y axis
			let a = Math.abs(xOutOfBounds) + width/2
			let b = Math.abs(yOutOfBounds) + height/2
			let c = pythagorean(a, b)
			let pctY = (height/2/b)
			xAbs = Math.sqrt(Math.pow(c*pctY, 2) - Math.pow(height/2, 2))
			yAbs = height/2
		}
		x = xOutOfBounds > 0 ? xMidPoint + xAbs : xMidPoint - xAbs
		y = yOutOfBounds > 0 ? yMidPoint + yAbs : yMidPoint - yAbs
		if (Math.abs(xOutOfBounds) > Math.abs(yOutOfBounds)) {
			if (xOutOfBounds > 0) {
				outOfView = 'right'
			} else {
				outOfView = 'left'
			}
		} else {
			if (yOutOfBounds > 0) {
				outOfView = 'bottom'
			} else {
				outOfView = 'top'
			}
		}
	}
	return [x, y, outOfView]
}

function pythagorean(sideA, sideB){
  return Math.sqrt(Math.pow(sideA, 2) + Math.pow(sideB, 2));
}

function setContainedSize() {
  // need to consider if img natural width and height is smaller than section
  let img = document.getElementById(window.activeImgId)
  let ratio = img.naturalWidth/img.naturalHeight
  let height = img.height
  let width = height*ratio
  if (width > img.width) {
    width = img.width
    height = img.width/ratio
  }
  window.containedWidth = width
  window.containedHeight = height
  window.marginLeft = (img.width - width)/2
  window.marginTop = (img.height - height)/2
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
