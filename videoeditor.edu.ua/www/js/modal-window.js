/*********************прорисовка модального окна*********************************************/
/*--------------------------------------------------------------------------------------------*/
var drawModalWindow = function() {
	var blockWindow = document.createElement('div'); //блокируем экран
    var inputWindow = document.createElement('div'); //форма ввода
	var butClose = document.createElement('div');	//кнопка закрытия
	var divForm = document.createElement('div');	//блок для формы
	butClose.id = 'close';
	blockWindow.id = 'modal';
    inputWindow.id = 'window';
	inputWindow.appendChild(butClose);
	inputWindow.appendChild(divForm);
    blockWindow.appendChild(inputWindow);
    document.body.appendChild(blockWindow);

    butClose.addEventListener('click', closeWindow, false);
    //blockWindow.addEventListener('click', closeWindow, false);
    return divForm;
};
/*-----------------------------Добавление файла----------------------------------------------*/
var addFile = function() {
	var divForm = drawModalWindow();
	divForm.id = 'addfile';
	divForm.innerHTML = "<form action='http://localhost:8080/main/do_upload'\
							  method='post' accept-charset='utf-8' enctype='multipart/form-data'>\
								<input type = 'file' name = 'userfile' size = '50000' \/>\
								<input type = 'submit' value = 'Load' \/>\
							  </form>";
};
/*-----------------------------Удаление файла------------------------------------------------*/

var delFile = function() {
	if(fileInfo.name !== "_") {
		var divForm = drawModalWindow();
		divForm.id = 'delfile';
		divForm.innerHTML = "<p>Вы уверены, что хотите удалите файл?<\p>\
							<form action='http://localhost:8080/main/do_delete/"+fileInfo.name+"/"+fileInfo.file_id+"'\
							method='post' accept-charset='utf-8' enctype='multipart/form-data'>\
							  <input type = 'submit' value = 'OK'/>\
							  <input type = 'reset' value = 'Отмена' onclick = 'closeWindow()'/>\
							</form>";
	}
};
/*------------------------------Переименование файла-----------------------------------------*/
var renameFile = function() {
	if(fileInfo.name !== "_") {
		var divForm = drawModalWindow();
		divForm.id = 'delfile';
		divForm.innerHTML = "<form action='http://localhost:8080/main/do_rename/"+fileInfo.name+"/"+fileInfo.file_id+"'\
							method='post' accept-charset='utf-8' enctype='multipart/form-data'>\
							  <label for='new_name'>Введите имя</label><input type = 'text' name = 'new_name' value = ''/>\
							  <input type = 'submit' value = 'Переименовать'/>\
							</form>";
	}
};

/*------------------функция закрытия окна----------------------------------------------------*/
function closeWindow(){
	var w = document.getElementById("modal");
	w.parentNode.removeChild(w);
}