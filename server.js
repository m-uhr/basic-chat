var express = require('express');
var app = express();
var io = require('socket.io');


//Sending index.html with Express
app.use(express.static('/content/'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/content/index.html');
});


//Socket.io connection



//Starting server
app.listen(8000, function() {
	console.log('Server running on localhost:8000');
});