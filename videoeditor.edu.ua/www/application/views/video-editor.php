﻿  <div class = "content">
    <div class = "control-panel"> 
		<div id = "button-add" onMouseOver="toolTip('Добавить')" onMouseOut="toolTip()"></div>
		<div id = "button-delete"  onMouseOver="toolTip('Удалить')" onMouseOut="toolTip()"></div>
		<div id = "button-edit"  onMouseOver="toolTip('Переименовать')" onMouseOut="toolTip()"></div>
	</div>
	<table>
	<tr>
	  <td>Имя</td>
	  <td>MIME-тип</td>
	  <td>Размер</td>
	</tr>
	<?php 
	  $files = get_filenames('./videofiles/', TRUE);
	  foreach($files as $value):
	    $file_info = get_file_info($value);
        echo "<tr><td class = 'file-name'>".$file_info['name']."</td>";
	    echo "<td id = ".$file_info['name'].">".get_mime_by_extension($file_info['name'])."</td>";
	    echo "<td>".$file_info['size']."</td></tr>";
	  endforeach;
	?>
	</table>
  </div>
  <div class = "screen" onMouseOver="toolTip('Экран')" onMouseOut="toolTip()">
    <div id = "monitor" onMouseOver="toolTip('Отображение видеопотока')" onMouseOut="toolTip()"></div>
    <div class = "control-panel" onMouseOver="toolTip('Панель управления видео')" onMouseOut="toolTip()"></div>
  </div>
  
  <div class = "pasteboard">
	<div class = "elements"> 
	  <div class = "info" onMouseOver="toolTip('Продолжительность видео')" onMouseOut="toolTip()">Info</div>
	  <div class = "video" onMouseOver="toolTip('Имя текущего видео')" onMouseOut="toolTip()"></div>
	</div>
    <div class = "timeline"  onMouseOver="toolTip('временная шкала, разметка, бегунок')" onMouseOut="toolTip()"> Time line
	</div>
    <div class = "video-line" onMouseOver="toolTip('Временная шкала для видео дорожки')" onMouseOut="toolTip()">Временная шкала для видео дорожек</div>
  </div>
  <div id="floatTip"></div>  <!-- для всплывающей подсказки -->
 <?php echo $error;?>
