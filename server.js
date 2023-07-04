// NodeJS App to create Socket.io Server for Simple Chatroom and serve index.html
// Dependencies
var express = require('express');
var app = express();
var path = require('path');
// Serve static assets from public/ directory
app.use(express.static('public'));
// Serve index.html as homepage
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// Start server on port 3000
var server = app.listen(3000, function () {
  console.log('Listening on port %d', server.address().port);
});
// Create Socket.io Server
// with cors_allowed_origins
var io = require('socket.io')(server, { cors: { origin: '*' } });
//var io = require('socket.io')(server);
// Allow EIO3 (required for Socket.io v3)
// io.eio = 3;
// When a client connects, we note it in the console
io.on('connection', function (socket) {
  console.log('A client is connected! ID: ' + socket.id);
  // When a "message" is received (click on button), it's logged in the console
  socket.on('message', function (message) {
    console.log(`Received from ${socket.id}: ${message}`);
    // Send message to all connected clients (no need to specify)
    const server_msg = `${message}`;
    io.emit('message', server_msg);
  });
});
