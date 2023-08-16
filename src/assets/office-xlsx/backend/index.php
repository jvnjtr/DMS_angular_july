<?php
//  print_r($_FILES);
//  exit();
$uploads_dir = '/uploads';
$res=move_uploaded_file($_FILES['file']['tmp_name'], 'uploads/demo'.time().'.xlsx');
if($res){
    $result=array('status' =>200,'message' =>'File uploaded successfully');
}else{
    $result=array('status' =>400,'message' =>'File uploaded successfully');
}
 echo json_encode($result);
?>