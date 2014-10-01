/***********************************************************/
/*---------Главный файл-----------------------------------*/
/*------Здесь описываются глобальный структуры, переменные, и---- 
--------выполнение функции по загрузке странице-------------*/
/**********************************************************/
/*-----------Структура описывающая информацию о файле---------------*/
var fileInfo = {
	name : '_',
	file_id: 0,
	path: '',
	dir : 'http://localhost:8080/videofiles/',
	typeMIME: '',
	codec: ''
};

/*------------Структура с костылями для выделения файла--------------*/
var checkFile = {
  currentSet: false,
  id : 'checked-file',
  ok: true,
  select: null
};

/*-------------Глобальные переменные--------------------------------*/
var video; //Описывает элемент видео на странице

window.onload = function (){
	/*****Begin {player.js}******************/
	moveVolumeThumb();
	/*****end {player.js}********************/

	/*****Begin {modal-window.js}******************/
	document.getElementById('button-add').addEventListener('click', addFile, false);
	document.getElementById('button-delete').addEventListener('click', delFile, false);
	document.getElementById('button-edit').addEventListener('click', renameFile, false);
	/*****end {modal-window.js}******************/

	document.getElementById('content').addEventListener('click', selectFile, false);


};

/*------------Функция выбора файла--------------------------------------------------*/
var selectFile = function(event) {
  if(event.target.className === 'file-name')
  {

	checkFile.ok = true;
	if(checkFile.currentSet)
	{
		var old = document.getElementById(checkFile.id);
		if(old.id == event.target.id)
		{
			checkFile.ok = false;
		}
		old.id = '';
		fileInfo.name = '_';
		checkFile.currentSet = false;
		checkFile.select.onchange = null;
		removeVideo();
		removeTrack();
	} 
	if (checkFile.ok)
	{
		checkFile.currentSet = true;
		event.target.id = checkFile.id;
		fileInfo.name = event.target.innerHTML;							//имя - текущий элемент
		fileInfo.file_id = event.target.previousSibling.innerHTML;		//ид файла - предыдущая ячейка таблицы
		fileInfo.path = event.target.nextSibling.childNodes[1].value;	//путь - содержиться в следующей ячейке в тэге инпут
		fileInfo.typeMIME = document.getElementById(fileInfo.name).innerHTML;	//тип - с id = имя файла
		checkFile.select = document.getElementById(fileInfo.name).nextSibling.firstChild; //всплывающий список находится в следующей ячейке после типа
		fileInfo.codec = checkFile.select.options[checkFile.select.selectedIndex].text;   //выбранный кодек со всплывающего списка
		
		checkFile.select.onchange = function(e){ 
			fileInfo.codec = e.target.options[e.target.selectedIndex].text;
			video.firstChild.setAttribute('type',fileInfo.typeMIME+"; codecs = '"+fileInfo.codec+"'"); 
		};
		fileInScreen();
	}
  }
};