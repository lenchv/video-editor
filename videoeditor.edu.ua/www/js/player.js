/*document.addEventListener('dblclick', getMonitor, false);
function getMonitor(event) {
  var element = document.getElementsByTagName('video')[0];
  if(event.target == element)
  {
	if(element.requestFullscreen) {
		alert(1);
		element.requestFullscreen();
	} else if(element.webkitrequestFullscreen) {
		alert(2);
		element.webkitRequestFullscreen();
	} else if(element.mozRequestFullscreen) {
	alert(1);
		element.mozRequestFullScreen();
	}
  }
}*/

function fileInScreen() {
  var screen = document.getElementById('monitor');
  var video = document.createElement('video');
  var source = document.createElement('source');
  var codec;
  source.setAttribute('src',fileInfo.dir+fileInfo.name);
  video.setAttribute('onerror','failed(event)');
  video.controller = new MediaController(); //media controller
  switch(fileInfo.typeMIME) {
    case 'video/mp4' : codec = 'avc1.42E01E,mp4a.40.2'; break;
    case 'video/webm' : codec = 'vp8,theora'; break;
    case 'video/ogg' : codec = 'theora,vorbis'; break;
	default: codec = '';
  }
  if (!!codec) {
	source.setAttribute('type',fileInfo.typeMIME+"; codecs = '"+codec+"'");
	video.appendChild(source);
	screen.appendChild(video);
	//alert(video.canPlayType(fileInfo.typeMIME+"; codecs = '"+codec+"'"));
  }
}

function removeVideo(){
  var video = document.getElementsByTagName('video')[0];
  video.parentNode.removeChild(video);
}

function noVideo() {
  var err = document.createElement('div');
  err.className = 'no-video';
  err.innerHTML = 'no video';
  return err;
}

function failed(e) {
   // video playback failed - show a message saying why
   switch (e.target.error.code) {
     case e.target.error.MEDIA_ERR_ABORTED:
       alert('You aborted the video playback.');
       break;
     case e.target.error.MEDIA_ERR_NETWORK:
       alert('A network error caused the video download to fail part-way.');
       break;
     case e.target.error.MEDIA_ERR_DECODE:
       alert('The video playback was aborted due to a corruption problem or because the video used features your browser did not support.');
       break;
     case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
       alert('The video could not be loaded, either because the server or network failed or because the format is not supported.');
       break;
     default:
       alert('An unknown error occurred.');
       break;
   }
 }