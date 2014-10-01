<h3>Структура БД fileinfo</h3>
<br/> 
<pre>
	fileinfo							
 --------------------
|file_id| integer PK |						 						codec
|--------------------|						  					  -----------------------
|size   | integer    |						 					 | codec_id | integer PK |
|--------------------|											 |-----------------------|
|path   | text	     |				mime	 					 | codec	| text       |
|--------------------|			  -----------------------        |-----------------------|
|mime_id| integer FK |---------->| mime_id  | integer PK |<------| mime_id  | integer FK |
 --------------------			 |-----------------------|	 	  -----------------------
								 | mime_type| text       |
				 				  -----------------------
</pre>