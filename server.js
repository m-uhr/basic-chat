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
io.on('connection', function (socket) 
{

	console.log('a user connected');

	socket.emit('newUser', function (data) 
	{
		console.log('New user: ' + data);
	});


	socket.on('newMessage', function (data) 
	{
		console.log('Message from '+ data.username +': ' + data.message);
		io.emit('spreadNewMessage', data);
	});


});



var port ='63963';
//var port = process.env.PORT || '3000';
http.listen(port, function () {
    console.log('listening on port ' + port);
});