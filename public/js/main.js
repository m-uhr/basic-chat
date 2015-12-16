var socket = io();

var windowHeight = $( window ).height();
var KEYCODE_ENTER = 13;

var ownNickname = prompt("Your nickname:", "Guest");

var ChatWindow = new ChatWindow();



/* Sending own message */
$( ".own-chat-message" ).keydown( function( event ) {

	if( event.which == KEYCODE_ENTER ) {

		ChatWindow.addOwnMessage( $(".own-chat-message").val() );		
	} 

	else {

		console.log("Writing message...");
	}
});


/* Getting other messages */
socket.on('spreadNewMessage', function( msg ) {

	ChatWindow.addNewMessage( msg );	
});



/* Render View */
var RenderHtml = {

	spacer : '>',
	classForOwnMessages : 'own-message',

	newMessage : function( username, message, isOwnMessage=false ) 
		{
			var cssClass = '';
			if( isOwnMessage ) cssClass = this.classForOwnMessages;

			return '<li class="'+ cssClass +'">'
						+ this.wrapUsername(username, isOwnMessage) 
						+ this.spacer 
						+ this.wrapMessage(message, isOwnMessage) 
					+ '</li>';
		},
	anotherOwnMessage : function ( message, isOwnMessage=false ) 
		{
			return wrapMessage( message, isOwnMessage );
		},

	wrapUsername : function ( username, isOwnMessage=false ) 
		{
			var cssClass = '';
			if( isOwnMessage ) cssClass = this.classForOwnMessages;

			if( username ) return '<span class="chat-username '+ cssClass +'">'+ username +'</span>';
		},

	wrapMessage : function ( message, isOwnMessage=false ) 
		{
			var cssClass = '';
			if( isOwnMessage ) cssClass = this.classForOwnMessages;

			if( message ) return '<span class="chat-message '+ cssClass +'">'+ message + '</span>';
		}

};


/* Chat window class */
function ChatWindow() {

	this.messagesHeight = $( ".chat-window .chat-window-messages" ).height();
	this.hasScrollbar = false;

	this.addOwnMessage = function( ownMessage='' ) {
		if( ownMessage || ownMessage.length !== 0 ) {

			$( ".chat-window-messages" ).append( RenderHtml.newMessage(ownNickname, ownMessage, true) ); //Add to chat window
			$( ".own-chat-message" ).val( "" ); //Empty message box

			socket.emit( 'newMessage', { username: ownNickname, message: ownMessage}); //Send to server

			this.updateMessagesHeight();
		}
	};

	this.addNewMessage = function( data ) {

		console.log("asdfasdf:    "+ data.username +" MESSAGE " + ownNickname);

		if( data.username !== ownNickname ){

			$(".chat-window-messages").append( RenderHtml.newMessage(data.username, data.message) );

			this.updateMessagesHeight();
		}
	};

	this.updateMessagesHeight = function() {

		this.messagesHeight = $( ".chat-window .chat-window-messages" ).height();

		if( !this.hasScrollbar 
			&& this.messagesHeight >= windowHeight - $( ".own-chat-bar" ).height() ) {

			this.addScrollbar();
		}

	};

	this.addScrollbar = function() {

		if( $( ".chat-window" ).css( "overflow-y") !== "scroll" ) {
	
			$( ".chat-window" ).height( windowHeight - $( ".own-chat-bar" ).height() );
			$( ".chat-window" ).css( "overflow-y", "scroll" );	

			this.hasScrollbar = true;
		}
	};

	this.getLastMessage = function() {};
};




