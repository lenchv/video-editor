  <div class = "content">
    <div class = "control-panel" onMouseOver="toolTip('������ ���������� � �������� ������')" onMouseOut="toolTip()"> 
		<div id = "button-add"></div>
		<div id = "button-delete"></div>
		<div id = "button-edit"></div>
	</div>
	<table>
	<tr>
	  <td>���</td>
	  <td>MIME-���</td>
	  <td>������</td>
	</tr>
	<?php 
	  $files = get_filenames('./videofiles/', TRUE);
	  foreach($files as $value):
	    $file_info = get_file_info($value);
        echo "<tr><td class = 'file-name'>".$file_info['name']."</td>";
	    echo "<td>".get_mime_by_extension($file_info['name'])."</td>";
	    echo "<td>".$file_info['size']."</td></tr>";
	  endforeach;
	  //unlink($file_info);
	?>
	</table>
  </div>
  <div class = "screen" onMouseOver="toolTip('�����')" onMouseOut="toolTip()">
    <div class = "monitor" onMouseOver="toolTip('����������� �����������')" onMouseOut="toolTip()"></div>
    <div class = "control-panel" onMouseOver="toolTip('������ ���������� �����')" onMouseOut="toolTip()"></div>
  </div>
  
  <div class = "pasteboard">
	<div class = "elements"> 
	  <div class = "info" onMouseOver="toolTip('����������������� �����')" onMouseOut="toolTip()">Info</div>
	  <div class = "video" onMouseOver="toolTip('��� �������� �����')" onMouseOut="toolTip()"></div>
	</div>
    <div class = "timeline"  onMouseOver="toolTip('��������� �����, ��������, �������')" onMouseOut="toolTip()"> Time line
	</div>
    <div class = "video-line" onMouseOver="toolTip('��������� ����� ��� ����� �������')" onMouseOut="toolTip()">��������� ����� ��� ����� �������</div>
  </div>
  <div id="floatTip"></div>  <!-- ��� ����������� ��������� -->
 <?php echo $error;?>
