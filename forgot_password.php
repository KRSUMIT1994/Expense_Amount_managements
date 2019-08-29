<?php 
include('includes/database_connection.php');
include('includes/constants.php');
?>

<?php
function random_string($length) {
    $key = '';
    $keys = array_merge(range(0, 9), range('a', 'z'), range('A', 'Z'));

    for ($i = 0; $i < $length; $i++) {
        $key .= $keys[array_rand($keys)];
    }

    return $key;
}



$post_data = json_decode(file_get_contents('php://input'));

$email = $post_data->email;

$data = [];

if($email!=""){
	$sql = "SELECT * FROM accountmanager WHERE `email`= '$email'";
	$result= $conn->query($sql);
	if($result->num_rows > 0){
		$rand_password = random_string(7);
		$password = md5($rand_password);
		$sql = "UPDATE accountmanager SET password='$password' WHERE email='$email'";

		if($conn->query($sql)=== TRUE){
			$data['error']= false;
			$data['message'] = "Password is : $rand_password";

		} else {
			$data['error']= true;
			$data['message'] = FAILED_MESSAGE;		
		}
	} else {
		$data['error']= true;
		$data['message'] = 'email not found. Please try again by correct email.';
	}
	

}
echo json_encode($data);
