<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
include('includes/database_connection.php');
include('includes/constants.php');

$expanse_data = json_decode(file_get_contents('php://input'));
//print_r($expanse_data);
$data = [];
$category = $expanse_data->category;
$title = $expanse_data->title;
$amount = $expanse_data->amount;
$extra_expanse = $expanse_data->extra_expanse;
$date = $expanse_data->date;
$user_id = $expanse_data->user_id;


if($category!="" && $title!="" && $amount!="" && $date){
	if($extra_expanse == true) {
		$extra_expanse = 1;
	} else if($extra_expanse == false) {
		$extra_expanse = 0;
	}
	$sql  = "INSERT INTO expanse_details (`category`, `title`, `amount`, `extra_expanse`, `date`, `user_id`) VALUES ('$category', '$title', '$amount', '$extra_expanse', '$date', '$user_id');";

	if($conn->query($sql)=== TRUE){
		$data['error']= false;
		$data['message'] = SUCESS_MESSAGE_EXPENSE_SAVE;

	} else {
		$data['error']= true;
		$data['message'] = FAILED_MESSAGE;		
	}

}
echo json_encode($data);
