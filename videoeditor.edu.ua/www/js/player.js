/*video.addEventListener('dblclick', getMonitor, false);
  function getMonitor(event) {
	alert(1);
	element = event.target;
	if(element.requestFullscreen) {
		element.requestFullscreen();
	} else if(element.webkitrequestFullscreen) {
		element.webkitRequestFullscreen();
	} else if(element.mozRequestFullscreen) {
		element.mozRequestFullScreen();
	}
  }*/
var video;
	//var info = document.getElementById('info-panel');
/**Функция вызывается, когда выбирается видео файл, и она создает
<video> элемент, и вызывает все события video
*/ 
function fileInScreen() {
  var monitor = document.getElementById('monitor');
  var videotag = document.createElement('video');
  var source = document.createElement('source');
  var codec;
  source.setAttribute('src',fileInfo.dir+fileInfo.name);
  //videotag.controller = new MediaController(); //media controller
  switch(fileInfo.typeMIME) {
    case 'video/mp4' : codec = 'avc1.42E01E,mp4a.40.2'; break;
    case 'video/webm' : codec = 'vp8,theora'; break;
    case 'video/ogg' : codec = 'theora,vorbis'; break;
	default: codec = '';
  }
  if (!!codec) {
	source.setAttribute('type',fileInfo.typeMIME+"; codecs = '"+codec+"'");
	videotag.appendChild(source);
	monitor.appendChild(videotag);
	videotag.load();
	video = document.getElementsByTagName('video')[0];
	//событие сработает когда загрузятся данные
	video.addEventListener('loadedmetadata', function(e){
	  var info = document.getElementById('info');
	  info.innerHTML = parseTime(this.duration);
	  video.volume = ((getComputedStyle(document.getElementById('volume-fill')).width).slice(0,-2))/100; //получаем стиль у элемента volume-fill, берем его ширину, убераем px, и делим на 100
	  addTrack(video.duration);
	  timeLine();
	  var inform = document.getElementById('info-panel');
	  inform.innerHTML = video.buffered.start(0) + ' : ' + video.buffered.end(0) ;	
	}, false);
	
	//событие, когда видео закончится
	video.addEventListener('ended',function(event){
	  document.getElementById('button-pause').id = 'button-play';
	}, false);
	
	//событие, когда видео прогружается
	video.addEventListener('progress',function(event){
	  var progress = document.getElementsByClassName('progress')[0];
	  progress.style.width =  video.buffered.end(0)*10 + 'px' ;	
	}, false);
	
	//событие, когда видео запущено
	video.addEventListener('timeupdate',function(event){
	  var info = document.getElementById('time-video');
	 // var videoLine = document.getElementById('video-line');
	  info.innerHTML = parseTime(this.currentTime); 	
      document.getElementById('line-thumb').style.left = this.currentTime*10-2 + 'px';
	  /*if(this.currentTime*10 > videoLine.clientWidth)
	    videoLine.scrollLeft = this.currentTime*10 - videoLine.clientWidth+5;*/	 	
	}, false);
	//alert(video.canPlayType(fileInfo.typeMIME+"; codecs = '"+codec+"'"));
  }
}

document.addEventListener('click',function(event){
  if(event.target.id == 'button-play')
  {
	video.play();
	event.target.id = 'button-pause';
  } else
  if(event.target.id == 'button-pause')
  {
	video.pause();
	event.target.id = 'button-play'
  }else
  if(event.target.id == 'button-right')
  {
	video.currentTime+=1;
  }else
  if(event.target.id == 'button-left')
  {
	video.currentTime-=1;
  }else
  if(event.target.id == 'button-loop')
  {
	if(video.loop == true) {
		video.loop = false;
	} else {
		video.loop = true;
	}
  }
}, false);
/**
	Событие на изменение бегунка звука
*/
window.onload = function(){
  document.getElementById('volume-thumb').onmousedown = function (e) {
    var self = this;
	var slider = this.parentNode;
	var fill = slider.children[0];
	var shiftX = slider.getBoundingClientRect().left;
		
	document.onmousemove = function(e) {
	  var coord = e.pageX - shiftX;
	  if(coord < 100 && coord > 0){
		video.volume = coord/100;
	    fill.style.width = coord+'px';
	  } else if (coord >= 100){
		fill.style.width = '100px';
	  } else {
	    fill.style.width = '0px'
	  }
	}
	document.onmouseup = function(){
	  document.onmousemove = document.onmouseup = null; 
	}
	return false;
  };
}
/**
Удаляет видео из документа
*/
function removeVideo(){
  var video = document.getElementsByTagName('video')[0];
  video.parentNode.removeChild(video);
}

function parseTime(time){
  var seconds = time;
  var hours = Math.floor(seconds/3600);
  seconds = seconds % 3600;
  var minutes = Math.floor(seconds/60);
  seconds = Math.floor(seconds % 60);
  if(seconds.toString().length < 2) seconds = '0' + seconds;
  if(minutes.toString().length < 2) minutes = '0' + minutes;
  return hours + ':' + minutes + ':' + seconds;
}


function addTrack(duration) {
  var nameTrack = document.createElement('div');
  var trackLine = document.createElement('div');
  var areaForName = document.getElementById('video');
  var areaForTrack = document.getElementById('video-line');
  var timeLine = document.getElementById('timeline');
  var progress = document.createElement('div');
  nameTrack.className = 'name-track';
  nameTrack.innerHTML = fileInfo.name;
  areaForName.appendChild(nameTrack);
  trackLine.className = 'line-track';
  trackLine.style.width = 10*duration + 'px';
  timeLine.style. width = 10*duration + 5 + 'px';
  marking(timeLine, duration);
  progress.className = 'progress';
  trackLine.appendChild(progress);
  areaForTrack.appendChild(trackLine);
}

function marking(elem, length){
  var i = 10;
  while (i <= length) {
    //alert(num.innerHTML);
	
    var num = document.createElement('div');
    num.className = 'marking';
    num.innerHTML = i+'';
    elem.appendChild(num);
	i+=10;
  }
}

function removeTrack() {
  var name = document.getElementsByClassName('name-track')[0];
  var line = document.getElementsByClassName('line-track')[0];
  var marking = document.getElementsByClassName('marking');
  line.parentNode.removeChild(line);
  name.parentNode.removeChild(name);
  var i = marking.length-1;
  while(i >= 0)
  {
    marking[i].parentNode.removeChild(marking[i]);
	i--;
  }
}
/**Бегунок для шкалы времени*/
function timeLine(){
  document.getElementById('line-thumb').ondragstart = function(){return false;}
  document.getElementById('line-thumb').onmousedown = function (e) {
    var self = this;
	var lineTrack = document.getElementsByClassName('line-track')[0];
	var videoLine = document.getElementById('video-line');
	var shiftX = lineTrack.getBoundingClientRect().left;
	document.onmousemove = function(e) {
	  var coord = e.clientX - shiftX;
	  if(coord > 0 && coord < (video.duration*10)) {
		self.style.left = coord-2+'px';
		video.currentTime = coord/10;
		/*if((e.pageX - shiftX) > videoLine.clientWidth-20) {
		  videoLine.scrollLeft = coord - videoLine.clientWidth+10;
		}*/
      } else if (coord <= 0){
	    self.style.left = '-2px';
	  } else {
	    self.style.left = (video.duration*10)-2 + 'px';
	  }
	}
	document.onmouseup = function(){
	  document.onmousemove = document.onmouseup = null; 
	}
	return false;
  };
}

/***************************************************/
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
