<?php 
include('includes/database_connection.php');
include('includes/constants.php');
?>
<?php

$user_data = json_decode(file_get_contents('php://input'));
//echo "<PRE>"; print_r($user_data); die;
$name = $user_data->name;
$mobile=$user_data->mobile;
$email = $user_data->email;
$password=MD5($user_data->password);
$confirm_password = $user_data->confirm_password;

$device_key = $user_data->device_key;
$current_date = date("y-m-d H:i:s");
$data = [];

if($user_data->password== $confirm_password){
	$sql = "SELECT * FROM accountmanager WHERE email='$email'";
	$result = $conn->query($sql);
	if($result->num_rows > 0){
		$data['error']= true;
		$data['message'] = EMAIL_EXSIST;	
	} else {

		$sql  = "INSERT INTO accountmanager (`name`, `mobile`, `email`, `password`, `device_key`, `last_login`) 
		VALUES ('$name', '$mobile', '$email', '$password', '$device_key', '$current_date')";
		$result = $conn->query($sql);

		if($result === TRUE){
			$data['error']= false;
			$data['message'] = SUCESS_MESSAGE_REGISTER;
		} else {
			$data['error']= true;
			$data['message'] = FAILED_MESSAGE;		
		}
	}
} else{
	$data['error']= true;
	$data['message'] = PASSWORD_MATCH;
}
echo json_encode($data);
 ?>
