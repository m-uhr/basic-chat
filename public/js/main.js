var socket = io();

var windowHeight = $( window ).height();


var ownNickname = prompt("Your nickname:", "Guest");

$(".own-chat-message").keydown(function(event)
{
	if( event.which == 13 ) 
	{

		var ownMessage = $(".own-chat-message").val();

		if( ownMessage || ownMessage.length !== 0 )
		{

			$( ".chat-window-messages" ).append( newMessageHTML(ownNickname, ownMessage, 'own-message') ); //Add to chat window
			$( ".own-chat-message" ).val( "" ); //Empty message box

			socket.emit( 'newMessage', { username: ownNickname, message: ownMessage}); //Send to server

			//Add scrollbar, if too many messages
			if( windowHeight - $( ".own-chat-bar" ).height() <= $( ".chat-window .chat-window-messages" ).height() )
			{
				$( ".chat-window" ).height( windowHeight - $( ".own-chat-bar" ).height() );
				$( ".chat-window" ).css( "overflow-y", "scroll" );
			}
		}
		
	} 

	else 
	{
		console.log("Writing message...");
	}
});


socket.on('spreadNewMessage', function (msg) 
{
	console.log("asdfasdf:    "+ msg.username +" MESSAGE " + ownNickname);
	if( msg.username !== ownNickname )
	{
		$(".chat-window-messages").append( newMessageHTML(msg.username, msg.message) );
	}
		
});

function newMessageHTML (username, message, cssClass='') 
{
	return '<li class="'+ cssClass +'"><span class="chat-username">'+ username +'</span>'
		+'>'
		+'<span class="chat-message">'+ message + '</span></li>';
}



$(window).resize(function() {
  //update stuff
});
