"use strict";

var path = require('path');

var express = require('express');

var http = require('http');

var socket = require('socket.io'); // localhost port


var port = process.env.PORT || 4001; // App setup

var app = express();
var server = http.createServer(app);
server.listen(port, function () {
  console.log('listening to requests on port 4001');
}); // Static files
// app.use(express.static('public'))

app.use(express["static"](path.join(__dirname, 'client', 'build'))); // Routes

app.get('/', function (req, res) {
  res.send('just gonna send it');
});
app.get('/flower', function (req, res) {
  res.json({
    name: 'Dandelion',
    colour: 'Blue-ish'
  });
}); // Socket setup

var io = socket(server, {
  cors: {
    origin: '*'
  }
}); // initiate variables

var clients = {};
var colors = [['#e6194B', '#ffffff'], ['#3cb44b', '#ffffff'], ['#ffe119', '#000000'], ['#4363d8', '#ffffff'], ['#f58231', '#ffffff'], ['#911eb4', '#ffffff'], ['#42d4f4', '#000000'], ['#f032e6', '#ffffff'], ['#bfef45', '#000000'], ['#fabed4', '#000000'], ['#469990', '#ffffff'], ['#dcbeff', '#000000'], ['#9A6324', '#ffffff'], ['#fffac8', '#000000'], ['#800000', '#ffffff'], ['#aaffc3', '#000000'], ['#808000', '#ffffff'], ['#ffd8b1', '#000000'], ['#000075', '#ffffff'], ['#a9a9a9', '#ffffff'], ['#ffffff', '#000000'], ['#000000', '#ffffff']];
io.on('connection', function (socket) {
  console.log('made connection ', socket.id);
  socket.on("setupClient", function (data) {
    newClient(io, data.id, data.name);
  });
  socket.on("disconnect", function (reason) {
    delete clients[socket.id];
    socket.broadcast.emit("cleanup", {
      clients: clients
    });
    console.log(reason);
  });
  socket.on("update", function (data) {
    if (data.id in clients) {
      clients[data.id].updatePos(data.display, data.activeAsset, data.position);
    }
  });
  socket.on('changeAsset', function (data) {
    if (data.id in clients) {
      clients[data.id].activeAsset = data.newAsset;
      socket.broadcast.emit("changeAsset", {
        clients: clients
      });
    }
  });
  var updateClientsInterval = setInterval(function () {
    if (socket.id in clients) {
      var filteredClients = {};
      var connectedClients = io.sockets.sockets;
      {
        Object.values(clients).map(function (client, idx) {
          if (connectedClients.has(client.id)) {
            filteredClients[client.id] = client;
          }
        });
      }
      socket.emit("updateClients", {
        clients: filteredClients
      });
    }
  }, 100);
  console.log(io.sockets.sockets.keys());
});

function newClient(io, id, name) {
  var clientColor = colors[Math.floor(Math.random() * colors.length)];
  var client = new Client(id, name, clientColor, "none", null, [0, 0]);
  clients[id] = client;
  io.emit("clientConnected", {
    clients: clients
  });
}

function Client(id, name) {
  var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var display = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "none";
  var activeAsset = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  var position = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [0, 0];
  this.id = id;
  this.name = name;
  this.color = color;
  this.display = display;
  this.activeAsset = activeAsset;
  this.position = position;
}

Client.prototype.updatePos = function (display, activeAsset, position) {
  this.display = display;
  this.activeAsset = activeAsset;
  this.position = position;
};
