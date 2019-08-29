<?php 
include('includes/database_connection.php');
include('includes/constants.php');
?>

<?php

$expanse_data = json_decode(file_get_contents('php://input'));

$user_id = $expanse_data->user_id;

$data = [];
$data['error'] = false;
if($user_id!=''){
$current_date = date("Y-m-d");

//------------------- For 1 month----

$days_previous = date('Y-m-d', strtotime("-7 days"));
$sql ="SELECT amount FROM expanse_details WHERE `date` BETWEEN '$days_previous' AND '$current_date' AND user_id = $user_id";

$result = $conn->query($sql);
$total_expanse= 0;
if($result->num_rows > 0){

while($row= $result->fetch_assoc()){
$total_expanse += $row['amount'];
}

}
$data['one_week_expanse'] = $total_expanse;
//------------------ For 3 month--------------------------------

$days_previous = date('Y-m-d', strtotime("-15 days"));
$sql ="SELECT amount FROM expanse_details WHERE `date` BETWEEN '$days_previous' AND '$current_date' AND user_id = $user_id";

$result = $conn->query($sql);
$total_expanse= 0;
if($result->num_rows > 0){

while($row= $result->fetch_assoc()){
$total_expanse += $row['amount'];
}

}
$data['fifteen_days_expanse'] = $total_expanse;

//----------------- For 6  month----------------

$days_previous = date('Y-m-d', strtotime("-1 months"));
$sql ="SELECT amount FROM expanse_details WHERE `date` BETWEEN '$days_previous' AND '$current_date' AND user_id = $user_id";

$result = $conn->query($sql);
$total_expanse= 0;
if($result->num_rows > 0){

while($row= $result->fetch_assoc()){
$total_expanse += $row['amount'];
}

}
$data['one_month_expanse'] = $total_expanse;

//-------------------- For 9 month--------------------------------

$days_previous = date('Y-m-d', strtotime("-6 months"));


$sql ="SELECT amount FROM expanse_details WHERE `date` BETWEEN '$days_previous' AND '$current_date' AND user_id = $user_id";

$result = $conn->query($sql);
$total_expanse= 0;
if($result->num_rows > 0){

while($row= $result->fetch_assoc()){
$total_expanse += $row['amount'];
}

}
$data['six_month_expanse'] = $total_expanse;

//----------- For 1 year---------------

$days_previous = date('Y-m-d', strtotime("-12 months"));

$sql ="SELECT amount FROM expanse_details WHERE `date` BETWEEN '$days_previous' AND '$current_date' AND user_id = $user_id";

$result = $conn->query($sql);
$total_expanse= 0;
if($result->num_rows > 0){

while($row= $result->fetch_assoc()){
$total_expanse += $row['amount'];
}

}
$data['yearly_expanse'] = $total_expanse;
}

echo json_encode($data);
