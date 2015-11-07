var socket = io();

socket.emit('helloworld', 'Hello server!');

console.log('Hello world!');