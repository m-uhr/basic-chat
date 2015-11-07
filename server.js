var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);


//Sending index.html with Express
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
});


//Socket.io connection
io.on('connection', function (socket) {
	console.log('a user connected');

	socket.on('helloworld', function (msg) {
		console.log('Message from user: ' + msg);
	});
});


//Starting server
http.listen(3000, function() {
	console.log('Server running on localhost:8000');
});