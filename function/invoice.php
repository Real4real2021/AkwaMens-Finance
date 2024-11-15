<?php
// require_once("../config/db_con.php");

$servername = "12.34.56.78";
$username = "root";
$password = "";
$dbname = "service_de_financea";

$conn = new mysqli($servername, $username, $password, $dbname);

if($conn -> connect_error){
    die("Connection failed:".$conn->connect_error);
}

$data = json-decode(file_get_contents('php://input'), true);

$invoiceNumber = $data["invoiceNumber"];
$invoiceDate = $data["invoiceDate"];
$dueDate = $data["dueDate"];
$clientName = $data["clientName"];
$clientAddress = $data["clientAddress"];
$clientContact = $data["clientContact"];
$notes = $data["notes"];
$itemDescription = $data["itemDescription"];
$quantity = $data["quantity"];
$unitPrice = $data["unitPrice"];

$invoiceQuery = "INSERT INTO service_de_financea.invoices (invoiceNumber, invoiceDate, dueDate, clientName, clientAddress, clientContact, notes, itemDescription, quantity, unitPrice) VALUES ('$invoiceNumber', '$invoiceDate', '$dueDate', '$clientName', '$clientAddress', '$clientContact', '$notes', '$itemDescip', '$quantity', '$unitPrice')";

if ($conn ->query($sql)===TRUE){
    $response =array('success' => true );
}else{
    $response = array('success' => false, 'error' => $conn->error);
}

echo json_encode($response);