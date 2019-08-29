<?php 
include('includes/database_connection.php');
include('includes/constants.php');
?>

<?php

$expanse_data = json_decode(file_get_contents('php://input'));

$category = $expanse_data->category;
$title = $expanse_data->title;
$amount = $expanse_data->amount;
$extra_expanse = $expanse_data->extra_expanse;
$date = $expanse_data->date;
$user_id = $expanse_data->user_id;
$expanse_id = $expanse_data->expanse_id;

$data = [];

if($category!="" && $title!="" && $amount!="" && $extra_expanse!="" && $date){
	$sql = "UPDATE expanse_details SET category='$category', title='$title', amount='$amount', extra_expanse='$extra_expanse', `date`='$date', user_id='$user_id' WHERE id='$expanse_id'";

	if($conn->query($sql)=== TRUE){
		$data['error']= false;
		$data['message'] = SUCESS_MESSAGE;

	} else {
		$data['error']= true;
		$data['message'] = FAILED_MESSAGE;		
	}

}
echo json_encode($data);
