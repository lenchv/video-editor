<?php

class Main extends CI_Controller{
	function __construct() {
	  parent::__construct();
	  
	  $this->load->library('MyDBFileInfo');
	  $this->load->helper(array('file'));
    }
	
	public function index(){
	  $data = array('error'=>' ');
	  $data['error'] = $this->mydbfileinfo->getError();
	  $this->loadPage($data);
	}
	
	public function do_upload () {
	  $config['upload_path'] = './videofiles/';
	  $config['allowed_types'] = "webm|Webm|WebM|3gpp|3gp|webm|mp4|ogv|ogg";
	  $config['file_name'] = 'video';
	  $config['max_size'] = '50000';
	  //$config['overwrite'] = 'TRUE';
	  $this->load->library('upload', $config);
	  if(!$this->upload->do_upload())
	  {
	    $data = array('error' => $this->upload->display_errors("<div class = 'error'>",'<div>'));
	    $this->loadPage($data);
	  } else
	  {
	    $data = array('error' => '');
	    $params = $this->upload->data();
	    $data['error'] = $this->mydbfileinfo->insFileInfo($params);
	   // echo $_FILES['userfile']['type'];
	    $this->loadPage($data);
	    //header("Location: ".BASE_URL);
	  }
  }
  
  public function do_delete($file, $id) {
	if(isset($file))
	{
	  $file_path = $this->mydbfileinfo->getPath($id); 
	  if(file_exists($file_path)) {
	  	
	    unlink($file_path);
		$data = array('error' => '');
		$data['error'] = $this->mydbfileinfo->delFileInfo($id);
	    $this->loadPage($data);
	    //header("Location: ".BASE_URL);
	  } else {
	    $data = array('error' => "<div class = 'error'> File not found!</div>");
	    $this->loadPage($data);
	  }
	} else
	{
	  $data = array('error' => "<div class = 'error'> File not found!</div>");
	  $this->loadPage($data);
	}
  }
  
  public function do_rename($file, $id) {
	$file_path = './videofiles/'.$this->inrus($file); 
	if (isset($_POST['new_name']))
		$new_name = "./videofiles/".$_POST['new_name'].strrchr($file,'.');
	if(file_exists($file_path)) {
	  rename($file_path, $new_name);
	  $data = array('error' => '');

	  $data['error'] = $this->mydbfileinfo->renameFile($new_name, $id);
	  //header("Location: ".BASE_URL);
	  $this->loadPage($data);
	} else {
	  $data = array('error' => "<div class = 'error'> File not found!</div>");
	  $this->loadPage($data);
	}
  } 
  
  private function loadPage($data) {
    $this->load->view('header');
    $this->load->view('video-editor',$data);
	$this->load->view('footer');
  }
  
  private function inrus($str){
    return urldecode($str);
  }
}
?>