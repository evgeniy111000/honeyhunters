<?php 
if (!mysql_select_db('database', @mysql_connect('localhost','root',''))){
        die('ошибка при соединении с базой данных');
}
mysql_set_charset('utf8');
function write_into_honeyhunters($name,$email,$comment){
	mysql_query('insert into honeyhunters set name=\''.$name.'\',email=\''.$email.'\',text=\''.$comment.'\'');
}
function read_from_honeyhunters(){
	$query_result=mysql_query('select name,email,text from honeyhunters order by id asc');
        $honeyhunters=array(); 	
	$index=0;
        while($row=mysql_fetch_assoc($query_result)){
		$honeyhunters[$index++]=$row;
	}
	return $honeyhunters;
}
$write=@$_REQUEST['write'];
$inputname=trim(@$_REQUEST['inputname']);
$inputemail=trim(@$_REQUEST['inputemail']);
$textcomment=trim(@$_REQUEST['textcomment']);
if ($write==1){
	if (!empty($inputname) && !empty($inputemail) && !empty($textcomment)){
		write_into_honeyhunters($inputname,$inputemail,$textcomment);
	}
}
header('Content-type: application/json');
echo json_encode(read_from_honeyhunters());
mysql_close();
?>