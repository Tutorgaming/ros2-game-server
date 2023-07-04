// Create Ros2Node Js Client and connect with socket.io server
const rclnodejs = require('rclnodejs');
const io = require('socket.io-client');
var socket = io.connect('http://localhost:3000');


rclnodejs.init().then(() => {
  console.log("Hello World");
  const node = new rclnodejs.Node('publisher_example_node');
  const publisher = node.createPublisher('std_msgs/msg/String', 'topic');

// Create Subscriber on topic2
    const subscription = node.createSubscription('std_msgs/msg/String', 'topic2', (msg) => {
        console.log(`CLIENT EMIT: [${msg.data}]`);
        const outmsg = `CLIENT EMIT: [${msg.data}]`
        socket.emit('message', outmsg);
    });

  // connect socket-io client to server
  // When a "message" is received (click on button), it's logged in the console
  socket.on('message', function (message) {
    console.log(`From Server : ${message}`);
    publisher.publish(`${message}`);
  });
  node.spin();
}).catch((err) => {
    console.error(err);
});


