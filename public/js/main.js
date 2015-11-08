var socket = io();

socket.emit('helloworld', 'Hello server!');
//$(".chat-window").find("ul").;

$(".chat-message").keydown(function(e){
	if ( event.which == 13 ) {
		var msg = $(".chat-message").val();

		console.log("ENTER!");

		socket.emit("sentMessage", msg); //Send to server

		$(".chat-window ul").append( "<li>"+msg+"</li>" ); //Add to chat window
		$(".chat-message").val(""); //Empty message box

		//Add scrollbar, if too many messages
		if( $(".chat-window").height() < $(".chat-window ul").height() )
		{
			$(".chat-window").css("overflow-y", "scroll");
		}
	} 
	else {
		console.log("Writing message...");
	}
});



console.log('Hello world!');