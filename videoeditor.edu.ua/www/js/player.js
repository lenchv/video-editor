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
	  var progress = document.getElementsByClassName('progress')[0];
	  info.innerHTML = parseTime(this.duration);
	  video.volume = ((getComputedStyle(document.getElementById('volume-fill')).width).slice(0,-2))/100; //получаем стиль у элемента volume-fill, берем его ширину, убераем px, и делим на 100
	  addTrack(video.duration);
	  timeLine();
	  //если видео полностью загружено, то линия загрузки полностью заполнена
	  if(Math.floor(video.buffered.end(0)) >= Math.floor(video.duration))
	    progress.style.width =  video.buffered.end(0)*10 + 'px' ;
	}, false);
	
	//событие, когда видео запустили
	video.addEventListener('play',function(event){
	  document.getElementById('button-play').id = 'button-pause';
	}, false);
	
	//событие, когда видео поставили на паузу
	video.addEventListener('pause',function(event){
	  document.getElementById('button-pause').id = 'button-play';
	}, false);
	
	//событие, когда видео закончится
	video.addEventListener('ended',function(event){
	  document.getElementById('button-pause').id = 'button-play';
	}, false);
	
	//событие, когда видео прогружается
	video.addEventListener('progress',function(event){
	  var progress = document.getElementsByClassName('progress')[0];
	  var end =  video.buffered.end(getBuffer())
	  var start =  video.buffered.start(getBuffer())
	  progress.style.width = (end - start)*10 + 'px' ;	
	  progress.style.left = start*10 + 'px' ;
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
	
	//событие, когда изменяется звук
	video.addEventListener('volumechange',function(event){
	  var volume = document.getElementById('volume');
	  if(!this.muted)
	  if(this.volume > 0.5) {
		volume.className = 'button-full-sound';
	  } else if(this.volume > 0.06){
		volume.className = 'button-half-sound';
	  } else {
	    volume.className = 'button-empty-sound';
		this.volume = 0;
	  }
	}, false);
	
	//событие, когда произошла ошибка
	video.addEventListener('error',function(event){
      //обработка ошибок
	  errMessage(failed(event));	  
	}, false);
	
	//событие, когда загрузка не продолжается более 3х секунд
	video.addEventListener('stalled',function(event){
       //если слишком долго длится загрузка	
	   errMessage('Слишком долго длится загрузка видео, перезагрузите страницу!');
	}, false);
	
	//событие, когда данные мультимедиа загружаются в текущей позиции воспроизведения
	video.addEventListener('loadeddata',function(event){
	  //...
	}, false);
	
	//событие, когда начинает поиск данных мультимедиа
	video.addEventListener('loadstart',function(event){
	  //...	
	}, false);
	
	//событие, когда видео готово к воспроизведению
	video.addEventListener('canplaythrough',function(event){
	 //..		
	}, false);
	
	//событие, когда ничего не загружено
	video.addEventListener('emptied',function(event){
      //если ничего не загружено
	}, false);
	
	//событие, когда происходит запрос видео
	video.addEventListener('loadstart',function(event){
       //обращение к файлу	
	}, false);
	
	//событие, когда не доступен следующий кадр(возможно видео буферезиуется)
	video.addEventListener('waiting',function(event){
       //буферизация
	}, false);
	
	//full screen
	video.addEventListener('dblclick', function(event) {
	  if(this.fullScreenEnabled || document.webkitIsFullScreen|| this.mozFullScreenEnabled) {	
	    cancelFullScreen(this);
	  } else
	  {
		fullScreen(this);
	  }
    }, false);
	//alert(video.canPlayType(fileInfo.typeMIME+"; codecs = '"+codec+"'"));
  }
}

/**
Полноэкранный режим
*/
function fullScreen(elem) {
  if(elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if(elem.webkitRequestFullScreen) {
    elem.webkitRequestFullscreen();
  } else if(elem.mozRequestFullscreen) {
    elem.mozRequestFullScreen();
  }
}
/**
Выключение полноэкранного режима
*/
function cancelFullScreen(elem) {
  if(elem.exitFullscreen) {
	elem.exitFullscreen();
  } else if(elem.webkitExitFullScreen) {
	elem.webkitExitFullscreen();
  } else if(elem.mozExitFullscreen) {
	elem.mozExitFullScreen();
  }
}

document.addEventListener('click',function(event){
  if(event.target.id == 'button-play')
  {
	video.play();
  } else
  if(event.target.id == 'button-pause')
  {
	video.pause();
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
  } else
  if(event.target.id == 'button-full-screen')
  {
	fullScreen(video);
  } else
  if(event.target.id == 'volume')
  {
	if(video.muted == true) {
		video.muted = false;
		if(video.volume > 0.5) {
		  event.target.className = 'button-full-sound';
		} else {
		  event.target.className = 'button-half-sound';
		}
		document.getElementById('volume-fill').style.width = video.volume*100 + 'px';
	} else {
		video.muted = true;
		event.target.className = 'button-empty-sound';
		document.getElementById('volume-fill').style.width = '0';
	}
  }
}, false);
/**
	Событие на изменение бегунка звука
*/
window.onload = function(){
  document.getElementById('volume-thumb').onmousedown = function (e) {
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
  }
  
  document.getElementById('volume-slider').onclick = function(e) {
    
    var fill = this.children[0];
	var shiftX = this.getBoundingClientRect().left;
	var coord = e.pageX - shiftX;
	video.volume = coord/100;
	fill.style.width = coord+'px';
  }
}
/**
Удаляет видео из документа
*/
function removeVideo(){
  var video = document.getElementsByTagName('video')[0];
  video.parentNode.removeChild(video);
}
/**
Разбивает время на часы минуты и секунды и возвращает в виде строки
*/
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
/**
Добавляет дорожку на шкалу времени
*/
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
/**
Маркерует линейку времени по 10 секунд
*/
function marking(elem, length){
  var i = 10;
  while (i <= length) {
    var num = document.createElement('div');
    num.className = 'marking';
    num.innerHTML = i+'';
    elem.appendChild(num);
	i+=10;
  }
}
/**
Удаляет дорожку со шкалы времени
*/
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
  var thumb = document.getElementById('line-thumb');
  var lineTrack = document.getElementsByClassName('line-track')[0];
  thumb.ondragstart = function(){return false;}
  thumb.onmousedown = function (e) {
    var self = this;
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
  }
  
  document.getElementById('timeline').onclick = function(event) {
    var shiftX = lineTrack.getBoundingClientRect().left;
    var coord = event.clientX - shiftX;
    thumb.style.left = coord + 'px'; 
	video.currentTime = coord/10;
  }
}

/**
Получение текущего буфера
*/
function getBuffer() {
  for(var i = 0; i < video.buffered.length; i++)
  {
    if(video.currentTime < video.buffered.end(i))
	  return i;
  }
}

/**
Отображение сообщения об ошибки 5 секунд
*/
function errMessage(msg) {
  var err = document.createElement('div');
  err.className = 'error';
  err.innerHTML = msg;
  document.body.appendChild(err);
  setTimeout(function (){document.body.removeChild(err);}, 5000);
}
/**
Дешифрация ошибки видео
*/
function failed(e) {
   switch (e.target.error.code) {
     case e.target.error.MEDIA_ERR_ABORTED:
       return 'Вы отменили загрузку видео.';
       break;
     case e.target.error.MEDIA_ERR_NETWORK:
       return 'Проблемы с сетью.';
       break;
     case e.target.error.MEDIA_ERR_DECODE:
       return 'Выбранный тип видео не поддерживается.';
       break;
     case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
       return 'Видео не загрузилось, потому что проблемы с сервером или сетью, или потому что выбранный формат не поддерживается.';
       break;
     default:
       return 'Неизвестная ошибка.';
       break;
   }
 }

