
// credentials
var apiKey = '46469692';
var sessionId = '1_MX40NjQ2OTY5Mn5-MTU3NTQ4ODk1NjI1OH5SYUNpME9qV1p2K05kT3M0UkU3Z2NBNVR-fg';
var token = 'T1==cGFydG5lcl9pZD00NjQ2OTY5MiZzaWc9NDgzNGIxZjdkMzU0ZDdmM2FiMWEyMzJlNDRiNmEwNGVmMmE3ZWY1MTpzZXNzaW9uX2lkPTFfTVg0ME5qUTJPVFk1TW41LU1UVTNOVFE0T0RrMU5qSTFPSDVTWVVOcE1FOXFWMXAySzA1a1QzTTBVa1UzWjJOQk5WUi1mZyZjcmVhdGVfdGltZT0xNTc1NDg5MTU3Jm5vbmNlPTAuMDMzNjU5NDE4MDE3MTEwODEmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTU3NjA5Mzg5NiZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==';
const streams = [];
var streamCounter = 0;


function handleError(error) {
  if (error) {
    alert(error.message);
  }
}

function initializeSession() {
  var session = OT.initSession(apiKey, sessionId);


  // Create a publisher
  var publisher = OT.initPublisher('publisher', {
    insertMode: 'append',
    width: '100%',
    height: '100%'
  }, handleError);

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

//initializeSession();

$('#call_police').on('click',function(){
	initializeSession();
});


$(document).on('click','.stream',function(event){
	session.subscribe(streams[event.target.getAttribute('data-stream-index')], 'subscriber', {
		insertMode: 'append',
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
}); */

  
// create subscriber
/*session.on('streamCreated', function(event) {
   session.subscribe(event.stream);
});*/
