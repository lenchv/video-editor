/*var add = document.getElementById("button-add");
var edit = document.getElementById("button-edit");
var del = document.getElementById("button-delete");*/
var fileInfo = {
	name : '_',
	dir : './videofiles/',
	currentSet: false,
	id : 'checked-file',
	ok: true
};

document.onclick = function(event){
  if(event.target.id == 'button-add' || event.target.id == 'button-delete') {
    var blockWindow = document.createElement('div');
    var inputWindow = document.createElement('div');
	var butClose = document.createElement('div');
	butClose.className = 'close';
	butClose.innerHTML = 'x';
	if(event.target.id == 'button-add')
	{
		inputWindow.innerHTML = "<div id = 'addfile'>\
			<form action='http://videoeditor.edu.ua/index.php/main/do_upload'\
			method='post' accept-charset='utf-8' enctype='multipart/form-data'>\
			<input type = 'file' name = 'userfile' size = '100000' />\
			<input type = 'submit' value = 'Load' />\
			</form> </div>"
	} else if(event.target.id == 'button-delete')
	{
		inputWindow.innerHTML = "<div id = 'delfile'>\
			<p>Вы уверены, что хотите удалите файл?<\p>\
			<form action='http://videoeditor.edu.ua/index.php/main/do_delete/"+fileInfo.dir+fileInfo.name+"'\
			method='post' accept-charset='utf-8' enctype='multipart/form-data'>\
			<input type = 'submit' value = 'OK' class = 'button'/>\
			<input type = 'reset' value = 'Отмена' onclick = 'closeWindow()'/>\
			</form></div>"
	}
    blockWindow.classList.add('modal');
    inputWindow.classList.add('window');
	inputWindow.appendChild(butClose);
    blockWindow.appendChild(inputWindow);
    document.body.appendChild(blockWindow);
  }
  
  if(event.target.className == 'close' || event.target.className == "modal"){
	closeWindow();
  }
  
  if(event.target.className == 'file-name')
  {
	fileInfo.ok = true;
	if(fileInfo.currentSet)
	{
		var old = document.getElementById(fileInfo.id);
		if(old.id == event.target.id)
		{
			fileInfo.ok = false;
		}
		old.id = '';
		fileInfo.currentSet = false;
	} 
	if (fileInfo.ok)
	{
		fileInfo.currentSet = true;
		event.target.id = fileInfo.id;
		fileInfo.name = event.target.innerHTML;
	}
  }
}

function closeWindow(){
	var w = document.getElementsByClassName("modal")[0];
	w.parentNode.removeChild(w);
}