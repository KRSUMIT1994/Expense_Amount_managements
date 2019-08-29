<?php 
include('includes/database_connection.php');
include('includes/constants.php');
?>

<?php

$expanse_data = json_decode(file_get_contents('php://input'));

$category = $expanse_data->category;
$extra_expanse = $expanse_data->extra_expanse;
$from_date = $expanse_data->from_date;
$to_date = $expanse_data->to_date;
$days_count = $expanse_data->days_count;
$user_id = $expanse_data->user_id;

$data = [];
$data['error'] = false;
if($from_date!='' && $to_date!="" && $days_count==""){
	$sql ="SELECT category.name as category, e_details.title, 
	e_details.amount, e_details.extra_expanse, e_details.date FROM expanse_details as e_details INNER JOIN category ON e_details.category= category.id WHERE e_details.date BETWEEN '$from_date' AND '$to_date' AND e_details.user_id = $user_id AND  e_details.category= '$category' 
AND e_details.extra_expanse= '$extra_expanse' ORDER BY e_details.date DESC";
	$result = $conn->query($sql);
	if($result->num_rows > 0){
		$row_data = [];
		while($row= $result->fetch_assoc()){
			
			$row_data[] = $row;
		}
		$data['message'] = "";
		$data['row'] = $row_data;
	} else {
		$data['message'] = NO_DATA;
		$data['row'] = [];
	}

} elseif($days_count!="" && $from_date=="" && $to_date==''){
	$current_date = date("Y-m-d");
	$days_previous = date('Y-m-d', strtotime("-".$days_count." days"));
	$sql ="SELECT category.name as category, e_details.title, e_details.amount, e_details.extra_expanse, e_details.date FROM expanse_details as e_details INNER JOIN category ON e_details.category= category.id WHERE e_details.date BETWEEN '$days_previous' AND '$current_date' AND e_details.user_id = $user_id AND  e_details.category= '$category' AND e_details.extra_expanse= '$extra_expanse' ORDER BY e_details.date DESC";
	
	$result = $conn->query($sql);
	if($result->num_rows > 0){
		$row_data = [];
		while($row= $result->fetch_assoc()){
			$row_data[] = $row;
		}
		$data['message'] = "";
		$data['row'] = $row_data;
	} else {
		$data['message'] = NO_DATA;
		$data['row'] = [];
	}
}

echo json_encode($data);
