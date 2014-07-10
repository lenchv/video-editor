
//Структура описывающая информацию о файле
var fileInfo = {
	name : '_',
	dir : 'http://videoeditor.edu.ua/videofiles/',
	typeMIME: ''
};
//Структура с костылями для выделения файла
var checkFile = {
  currentSet: false,
  id : 'checked-file',
  ok: true
};
//Прорисовка модального окна для событий
document.addEventListener('click', containerEvent, false);
function containerEvent(event){
//Если нажаты кнопки добавления, удаления или переименования файла, то вывести модальное
  if(event.target.id == 'button-add' || event.target.id == 'button-delete' || event.target.id == 'button-edit') {
    var blockWindow = document.createElement('div');
    var inputWindow = document.createElement('div');
	var butClose = document.createElement('div');
	butClose.className = 'close';
	//Вывод формы в окно в зависимости от выбранной задачи
	if(event.target.id == 'button-add')
	{
		inputWindow.innerHTML = "<div id = 'addfile'>\
			<form action='http://videoeditor.edu.ua/index.php/main/do_upload'\
			method='post' accept-charset='utf-8' enctype='multipart/form-data'>\
			<input type = 'file' name = 'userfile' size = '200000' />\
			<input type = 'submit' value = 'Load' />\
			</form> </div>"
	} else if(event.target.id == 'button-delete')
	{
		inputWindow.innerHTML = "<div id = 'delfile'>\
			<p>Вы уверены, что хотите удалите файл?<\p>\
			<form action='http://videoeditor.edu.ua/index.php/main/do_delete/"+fileInfo.name+"'\
			method='post' accept-charset='utf-8' enctype='multipart/form-data'>\
			<input type = 'submit' value = 'OK'/>\
			<input type = 'reset' value = 'Отмена' onclick = 'closeWindow()'/>\
			</form></div>"
	} else if(event.target.id == 'button-edit' && fileInfo.name != '_')
	{
		inputWindow.innerHTML = "<div id = 'delfile'>\
			<form action='http://videoeditor.edu.ua/index.php/main/do_rename/"+fileInfo.name+"'\
			method='post' accept-charset='utf-8' enctype='multipart/form-data'>\
			<label for='new_name'>Введите имя</label><input type = 'text' name = 'new_name' value"+fileInfo.name+"'/>\
			<input type = 'submit' value = 'Переименовать'/>\
			</form></div>"
	} else {
		closeWindow();		//нужно если в переименовании не выбран файл
	}
    blockWindow.classList.add('modal');
    inputWindow.classList.add('window');
	inputWindow.appendChild(butClose);
    blockWindow.appendChild(inputWindow);
    document.body.appendChild(blockWindow);
  }
  //закрытие модального окна, если нажать на крестик или в свободную область
  if(event.target.className == 'close' || event.target.className == "modal"){
	closeWindow();
  }
  //Выделение файла по клику мыши
  if(event.target.className == 'file-name')
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
		removeVideo();
		removeTrack();
	} 
	if (checkFile.ok)
	{
		checkFile.currentSet = true;
		event.target.id = checkFile.id;
		fileInfo.name = event.target.innerHTML;
		fileInfo.typeMIME = document.getElementById(fileInfo.name).innerHTML;
		fileInScreen();
	}
  }
}
//функция закрытия окна
function closeWindow(){
	var w = document.getElementsByClassName("modal")[0];
	w.parentNode.removeChild(w);
}

