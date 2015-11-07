var http = require('http');
var express = require('express');
var app = express();
var io = require('socket.io')(http);


//Sending index.html with Express
app.use(express.static(__dirname + '/content/'));
//app.use(express.static(__dirname + '/content/css/'));
//app.use(express.static(__dirname + '/content/js/'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/content/index.html');
});


//Socket.io connection
io.on('connection', function(socket){

});


//Starting server
app.listen(8000, function() {
	console.log('Server running on localhost:8000');
});