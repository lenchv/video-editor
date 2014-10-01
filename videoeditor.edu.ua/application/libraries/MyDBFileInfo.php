<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed'); 

require'Mydb.php';
class MyDBFileInfo extends Mydb {
	
	function __construct() {

		$params['name'] = 'fileinfo.db';
	 	$params['mod'] = SQLITE3_OPEN_READWRITE;
	 	parent::__construct($params);
	}	

	/*
        Вставка в таблицу fileinfo информацию о таблице,
        возвращает ошибку или пустую строку
    */
    public function insFileInfo($params) {
    	//выбор mime_id по типу файла из БД
       // echo $_FILES['userfile']['type'];
    	$sqlQuery = "SELECT mime_id FROM mime WHERE mime.mime_type = \"".$params['file_type']."\";";

        $sqlQuery =  $this->db->escapeString($sqlQuery);
        if(!($mime = $this->db->querySingle($sqlQuery))) {
            $this->setError("Ошибка выполнения запроса");
            return $this->getError();
        } 
    	
        //Выполняем вставку поля информации о файле в таблицу fileinfo
    	$sqlQuery = "INSERT INTO fileinfo (size, path, mime_id) VALUES (".$params['file_size'].", \"".$params['full_path']."\", ".$mime.");";
    	$sqlQuery =  $this->db->escapeString($sqlQuery);
    	if(!$this->db->exec($sqlQuery)) {
            $this->setError("Ошибка вставки в базу данных ".$this->getNameDB);
            return $this->getError();
        } else return '';
    }

    /*
        Удаление ингформации о файле из таблицы fileinfo,
        возвращет ошибку или пустую строку
    */
    public function delFileInfo($file_id) {
    	$sqlQuery = "DELETE FROM fileinfo WHERE fileinfo.file_id = ".$file_id." ;";
        $sqlQuery =  $this->db->escapeString($sqlQuery);
        if(!$this->db->exec($sqlQuery)) {
            $this->setError("Ошибка удаления из базы данных ".$this->getNameDB);
            return $this->getError();
        } else return '';
    }

    /*
        Изменение имени файла в таблице fileinfo,
        возвращет ошибку или пустую строку
    */
    public function renameFile($file_name, $file_id) {
        //Вставка адреса сайта вместо первой точки    
        //$file_name = substr_replace($file_name, BASE_URL , 0,1);
        $sqlQuery = "UPDATE fileinfo SET path = \"".$file_name."\" WHERE fileinfo.file_id = ".$file_id." ;";
        $sqlQuery =  $this->db->escapeString($sqlQuery);
        if (!$this->db->exec($sqlQuery)) {
            $this->setError("Ошибка редактирования базы данных ".$this->getNameDB);
            return $this->getError();
        } else return '';
    }

    /*
        Вывод всей необходимой информации о файле
    */
    public function getFileInfo() {
        // Выбираем все поля из таблицы fileinfo (mime_id, чтобы лишний раз не выбирать кодеки (ниже будет ясно)), 
        //и mime тип из таблицы mime
    	if(! ($result = $this->db->query("SELECT fileinfo.file_id AS ID, fileinfo.path AS name, fileinfo.size, mime.mime_type AS type,  
                                        fileinfo.mime_id FROM fileinfo INNER JOIN mime ON fileinfo.mime_id = mime.mime_id ;"))) {
            $this->setError("Ошибка выполнения запроса");
            return $this->getError();
        }
    	$codec = array('mime_id' => '');
            	
	    echo "<table>
			<tr>
			  <td>ID</td>
			  <td>Имя</td>
			  <td>Размер</td>
			  <td>MIME-тип</td>
			  <td>Кодек</td>
			</tr>";
        //перебор запрошенной таблицы
    	while($row = $result->fetchArray(SQLITE3_ASSOC)) {
    		echo '<tr">';
    		
            //из полного пути выбираем только имя файла
    		$name = substr($row['name'], (stripos($row['name'],'videofiles') + 11));//11 = strlen(videofiles/) 
    		
            $ind = $row['mime_id'];
            //проверяем, если уже делали выборку для этого mime типа, то больше не нужно
            if (!isset($codec[$ind])) {
              //выбираем все кодеки, соответствующие mime типу файла
    		  if( !($codec[$ind] = $this->db->query(" SELECT codec.codec FROM codec where codec.mime_id = ".$ind." ;"))) {
                $this->setError("Ошибка выполнения запроса");
                return $this->getError();
              }
            }

            //Получаем позицию папки videofiles, которая находится в корне сайта, из строки полного пути к файлу
            $pos = stripos($row['name'],'videofiles');
            //И добавляем адрес сайта
            $path = BASE_URL."/".substr($row['name'], $pos);

    		echo "<td>".$row['ID']."</td>";
    		echo "<td class = 'file-name'>".$name."</td>";
    		echo "<td> <input type='hidden' name='path' value=".$path." />".$row['size']."</td>";
    		echo "<td id = ".$name.">".$row['type']."</td>";

    		echo "<td><SELECT>";
    		while($el = $codec[$ind]->fetchArray(SQLITE3_ASSOC)) {
    			echo "<option>".$el['codec']."</option>";
			}
			echo "</SELECT></td>";
    		echo '</tr>';
    	}
    	echo '</table>';

        return '';
    }

    public function getPath($id) {
        $res = $this->db->querySingle("SELECT path FROM fileinfo WHERE file_id = ".$id." ;");
        return $res;
    }
}

/* End of file Someclass.php */