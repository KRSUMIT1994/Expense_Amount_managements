<?php 
include('includes/database_connection.php');
include('includes/constants.php');
?>
<?php
// Getting the received JSON into $json variable.
 $json = file_get_contents('php://input');
 
 // decoding the received JSON and store into $obj variable.
 $obj = json_decode($json,true);
 
// Populate User email from JSON $obj array and store into $email.
$email = $obj['email'];
 
// Populate Password from JSON $obj array and store into $password.
$password = MD5($obj['password']);
//Applying User Login query with email and password match.
$sql = "select * from accountmanager where email = '$email' and password = '$password'";
$data = [];
$result = $conn->query($sql);
if($result->num_rows > 0){
    $data['error']=false;
    $data['message']= "";
    while($row= $result->fetch_assoc()){
        $data["user_data"]["user_id"]= $row['id'];
        $data["user_data"]["name"]= $row['name'];
        $data["user_data"]["email"]= $row['email'];
        $data["user_data"]["mobile"]= $row['mobile']; 
    }
} else{
    $data['error']= true;
    $data['message']= LOGIN_FEILD;
}
echo json_encode($data);
?>