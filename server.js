import path from 'path'
const express = require('express')
const http = require('http')
const socket = require('socket.io')

// localhost port
const port = process.env.PORT || 4001;

// App setup
const app = express()
const server = http.createServer(app)
server.listen(port, function() {
    console.log('listening to requests on port 4001')
})

// Static files
// app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'client', 'build')))

// Routes
app.get('/', (req, res) => {
  res.send('just gonna send it')
})

app.get('/flower', (req, res) => {
  res.json({
    name: 'Dandelion',
    colour: 'Blue-ish'
  })
})

// Socket setup
const io = socket(server, {
	cors: {
    origin: '*',
  }
})

// initiate variables
const clients = {}
const colors = [
	['#e6194B', '#ffffff'],
	['#3cb44b', '#ffffff'],
	['#ffe119', '#000000'],
	['#4363d8', '#ffffff'],
	['#f58231', '#ffffff'],
	['#911eb4', '#ffffff'],
	['#42d4f4', '#000000'],
	['#f032e6', '#ffffff'],
	['#bfef45', '#000000'],
	['#fabed4', '#000000'],
	['#469990', '#ffffff'],
	['#dcbeff', '#000000'],
	['#9A6324', '#ffffff'],
	['#fffac8', '#000000'],
	['#800000', '#ffffff'],
	['#aaffc3', '#000000'],
	['#808000', '#ffffff'],
	['#ffd8b1', '#000000'],
	['#000075', '#ffffff'],
	['#a9a9a9', '#ffffff'],
	['#ffffff', '#000000'],
	['#000000', '#ffffff'],
]

io.on('connection', function(socket) {
	console.log('made connection ', socket.id)
	newClient(io, socket)

	socket.on("disconnect", function(reason) {
		// io.sockets.emit("delete", {id: socket.id})
		delete clients[socket.id]
		console.log(reason)
	})

	socket.on("update", function(data) {
		if (data.id in clients) {
			// socket.broadcast.emit("update", {
			// 	id:data.id,
			// 	display: data.display,
			// 	activeAsset: data.activeAsset,
			// 	position: data.position,
			// })
			clients[data.id].updatePos(data.display, data.activeAsset, data.position)
		}
	})

	socket.on('changeAsset', function(data) {
		socket.broadcast.emit("changeAsset", {
			id:data.id,
			newAssetName: data.newAssetName,
			prevAssetName: data.prevAssetName,
			client: clients[data.id]
		})
	})

	let updateClientsInterval = setInterval(function() {
		let filteredClients = {}
		let connectedClients = io.sockets.sockets
		{Object.values(clients).map((client, idx) => {
			if (connectedClients.has(client.id)) {
				filteredClients[client.id] = client
			}
		})}
		socket.emit("updateClients", {
			clients:filteredClients,
		})
	}, 100)

	console.log(io.sockets.sockets.keys())


})


function newClient(io, socket) {
	// initClient(io, socket)
	let clientColor = colors[Math.floor(Math.random() * colors.length)]
	let client = new Client(socket.id, socket.handshake.query.name, clientColor, "none", initialActiveAsset, [0, 0])
	clients[socket.id] = client
	// socket.broadcast.emit("create", client)
}

function initClient(io, socket) {
  for (let sid in clients) {
		// send existing clients to new connecting socket
		io.to(socket.id).emit('create', clients[sid])
  }
}

// manually setting initial active asset
let initialActiveAsset = 	{
	"path": "/static/media/avatar.32e70a97.png",
	"name": "avatar",
	"label": "Avatar",
	"type": "img",
	"activeClients": {},
}

function Client(id, name, color=null, display="none", activeAsset=null, position=[0, 0]) {
	this.id = id
	this.name = name
	this.color = color
	this.display = display
	this.activeAsset = activeAsset
	this.position = position
}

Client.prototype.updatePos = function(display, activeAsset, position) {
	this.display = display
	this.activeAsset = activeAsset
	this.position = position
}

