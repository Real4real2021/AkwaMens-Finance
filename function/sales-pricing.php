<?php require_once("../config/db_con.php");

if(isset($_POST['currency'])){
    $currency = mysqli_real_escape_string($con, $_POST['currency']);
    $salesType = mysqli_real_escape_string($con, $_POST['salesType']);
    $price = mysqli_real_escape_string($con, $_POST['price']);

    $query = "INSERT INTO service_de_financea.sales_pricing (currency, salesType, price) VALUES ('$currency', '$salesType', '$price')";

    mysqli_query($con, $query) or die(mysqli_error($con));

echo json_encode("Data added to database");
}