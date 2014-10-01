<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed'); 

class Mydb extends SQLite3{

	protected $db;
	private $error = '';
	private $nameDB;

    function __construct($params) {
    	try{
    		$this->nameDB = $params['name'];
    		$this->db = new SQLite3(APPPATH.'db/'.$params['name'], $params['mod']);
    	} catch (Exception $e) {
    		$this->setError($e->getMessage());
    	}
    }

    /*
        Вывод таблицы $tableName
    */
    public function getTable($tableName)
    {
    	$name = $this->db->escapeString($tableName);
    	$result = $this->db->query("SELECT * FROM ".$tableName.';');
    	$column = $result->numColumns();
    	
    	echo '<table cellspacing = 0>';
    	echo '<tr">';
    	for ($i = 0; $i < $column; $i++) {
    		echo "<td style='border: 1px solid'>".$result->columnName($i)."</td>";
    	}	
    	echo '</tr>';
    	while($row = $result->fetchArray(SQLITE3_NUM)) {
    		echo '<tr">';
    		for ($i = 0; $i < $column; $i++) {
    			echo "<td style='border: 1px solid'>".$row[$i]."</td>";
    		}	
    		echo '</tr>';
    	}
    	echo '<table>';
    }

    public function getError() {
    	return $this->error;
    }

    public function getNameDB() {
        return $nameDB;
    }

    protected function setError($error_msg) {
    	$this->error = "<div class = 'error'>".$error_msg."</div><br />";
    }

    function __destruct() {
        $this->db->close();
    }
}

/* End of file Someclass.php */
