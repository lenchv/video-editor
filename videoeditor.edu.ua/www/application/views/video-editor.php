  <div class = "content">
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
  <div class = "screen">
    <div id = "monitor"></div>
    <div class = "control-panel-video">
		<div id = 'time-video' onMouseOver="toolTip('Текущее время')" onMouseOut="toolTip()">0:00:00</div>
		<span style = 'display: block; margin-left :140px;'>
		<div id = 'button-left' onMouseOver="toolTip('На 1 секунду назад')" onMouseOut="toolTip()"></div>
		<div id = 'button-play' onMouseOver="toolTip('Play/Pause')" onMouseOut="toolTip()"></div>
		<div id = 'button-right' onMouseOver="toolTip('На 1 секунду вперед')" onMouseOut="toolTip()"></div>
		<div id = 'button-loop' onMouseOver="toolTip('Зациклить')" onMouseOut="toolTip()"></div>
		</span>
		<div id = 'volume-slider'><div id = 'volume-fill'></div><div id = 'volume-thumb'></div></div>
	</div>
	<div id='info-panel'></div>
  </div>
  
  <div class = "pasteboard">
	<div class = "elements"> 
	  <div id = "info" onMouseOver="toolTip('Продолжительность видео')" onMouseOut="toolTip()">0:00:00</div>
	  <div id = "video" onMouseOver="toolTip('Имя текущего видео')" onMouseOut="toolTip()"></div>
	</div>
	
    <div id = "video-line" onMouseOver="toolTip('Временная шкала для видео дорожки')" onMouseOut="toolTip()">
	<div id = "timeline"  onMouseOver="toolTip('временная шкала, разметка, бегунок')" onMouseOut="toolTip()">
	  <div id = 'line-thumb'></div>
	</div>
	</div>
  </div>
  <div id="floatTip"></div>  <!-- для всплывающей подсказки -->
 <?php echo $error;?>
