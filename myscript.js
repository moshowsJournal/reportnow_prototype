
// credentials
var apiKey = '46469692';
var sessionId = '1_MX40NjQ2OTY5Mn5-MTU3NTQ4ODk1NjI1OH5SYUNpME9qV1p2K05kT3M0UkU3Z2NBNVR-fg';
var token = 'T1==cGFydG5lcl9pZD00NjQ2OTY5MiZzaWc9NDgzNGIxZjdkMzU0ZDdmM2FiMWEyMzJlNDRiNmEwNGVmMmE3ZWY1MTpzZXNzaW9uX2lkPTFfTVg0ME5qUTJPVFk1TW41LU1UVTNOVFE0T0RrMU5qSTFPSDVTWVVOcE1FOXFWMXAySzA1a1QzTTBVa1UzWjJOQk5WUi1mZyZjcmVhdGVfdGltZT0xNTc1NDg5MTU3Jm5vbmNlPTAuMDMzNjU5NDE4MDE3MTEwODEmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTU3NjA5Mzg5NiZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==';
const streams = [];
var streamCounter = 0;
const currentConnection = [];
const currentUser = [];
var session = OT.initSession(apiKey, sessionId);
function handleError(error) {
  if (error) {
    alert(error.message);
  }
}
var publisher = OT.initPublisher();
session.connect(token, function(err) {
   // publish publisher
   session.publish(publisher);
});

session.on("signal", function(event) {
		console.log(event.data);
		$('.chat_message_container').append(`
					<div class="card-body">
						<div class="direct-chat-messages">
							<div class="direct-chat-msg mb-lg-0">
								<div class="direct-chat-info clearfix">
									<span class="direct-chat-name float-left">User</span>
									<span class="direct-chat-timestamp float-right"> ${new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")}</span>
								</div>
								<img class="direct-chat-img" src="assets/img/avatar/avatar-1.jpg" alt="message user image">
								<div class="direct-chat-text">
									${event.data}
								</div>
							</div>
						</div>
					</div>
			
			`);
    });

$('#send_message').click(function(){
	session.signal(
	  {
		to: currentConnection[0],
		data:$('#message_text').text()
	  },
	  function(error) {
		if (error) {
		  console.log("signal error ("
					   + error.name
					   + "): " + error.message);
		} else {
			$('.chat_message_container').append(`
					<div class="card-body">
						<div class="direct-chat-messages">
							<div class="direct-chat-msg mb-lg-0">
								<div class="direct-chat-info clearfix">
									<span class="direct-chat-name float-left">User</span>
									<span class="direct-chat-timestamp float-right"> ${new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3")}</span>
								</div>
								<img class="direct-chat-img" src="assets/img/avatar/avatar-1.jpg" alt="message user image">
								<div class="direct-chat-text">${$('#message_text').text()}
									${$('#message_text').html('')}
								</div>
							</div>
						</div>
					</div>
			
			`);
		}
	  }
	);
});

function initializeSession() {

  // Subscribe to a newly created stream
	session.on('streamCreated', function(event) {
		console.log(event.stream);
		/*if(typeof event.stream.name !== Object){
			return false;
		}*/
		console.log(event.stream.name)
		streams.push(event.stream);
		//console.log(streams);
		let audio = new Audio('beep.mp3');
		audio.play();
		
		$('.publisher_list_container').append(`<li><button class="stream" data-stream-index="${streamCounter}"><img src="icons/police.svg"/> ${$.parseJSON(event.stream.name).name} <i class="fa fa-envelope"></i> </button> </li>`);
		streamCounter++;
	});

  // Connect to the session
  session.connect(token, function(error) {
    // If the connection is successful, publish to the session
    if (error) {
      handleError(error);
    } else {
      session.publish(publisher, handleError);
    }
  });
}

initializeSession();


$(document).on('click','.stream',function(event){
	currentConnection.length = 0;
	currentUser.length = 0;
	currentConnection.push(streams[event.target.getAttribute('data-stream-index')].connection);
	currentUser.push($.parseJSON(streams[event.target.getAttribute('data-stream-index')].name));
	$('.caller_info').html(`
		<p>Name : ${currentUser[0].name}</p>
		<p>Phone Number : ${currentUser[0].phone}</p>
		<p>Latitude : ${currentUser[0].latitude}</p>
		<p>Longitude : ${currentUser[0].longitude}</p>
	`);
	
	// The location of Uluru
	  var position = {lat: currentUser[0].latitude, lng: currentUser[0].longitude};
	  // The map, centered at Uluru
	  var map = new google.maps.Map(
		  document.getElementById('map'), {zoom: 4, center: position});
	  // The marker, positioned at Uluru
	  var marker = new google.maps.Marker({position: position, map: map});
	
	
	$('#send_message').removeAttr('disabled');
	session.subscribe(streams[event.target.getAttribute('data-stream-index')], 'subscriber', {
		insertMode: 'replace',
		width: '100%',
		height: '100%'
	  }, handleError);
});




/*// connect to session
var session = OT.initSession(apiKey, sessionId);

// create publisher
var publisher = OT.initPublisher();
session.connect(token, function(err) {
   // publish publisher
   session.publish(publisher);
}); 

  
// create subscriber
/*session.on('streamCreated', function(event) {
   session.subscribe(event.stream);
});*/
