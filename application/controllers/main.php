<?php
class Main extends CI_Controller{
    function __construct() {
	  parent::__construct();
	  $this->load->helper(array('file'));
    }
	
	public function index(){
	  $data = array('error'=>' ');
	  $this->loadPage($data);
	}
	
	public function do_upload () {
	  $config['upload_path'] = './videofiles/';
	  $config['allowed_types'] = 'mp4|webm|ogv|png|jpg';
	  $config['max_size'] = '100000';
	  $config['overwrite'] = 'TRUE';
	  
	  $this->load->library('upload', $config);
	  if(!$this->upload->do_upload())
	  {
	    $data = array('error' => $this->upload->display_errors("<div class = 'error'>",'<div>'));
	    $this->loadPage($data);
	  } else
	  {
	    $data = array('error' => '');
	    $this->loadPage($data);
	  }
  }
  
  public function do_delete($dir, $file) {
	$file_path = './'.$dir.'/'.$file; 
	if(file_exists($file_path)) {
	  unlink($file_path);
	  $data = array('error' => '');
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
}
?>