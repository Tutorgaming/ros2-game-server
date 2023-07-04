//var io = require('socket.io-client');
var socket = io.connect('http://localhost:3000');
// When a "message" is received (click on button), it's logged in the console
socket.on('message', function (message) {
  // Update TextArea with message
  $('#output').val($('#output').val() + '\n' + message);
  console.log(`Received from ${socket.id}: ${message}`)
});
// When the button is clicked, send message to server
$('#send').click(function () {
  var message = $('#message').val();
  var out_msg = `[SERVER] : ${message}`;
  socket.emit('message', out_msg);
});