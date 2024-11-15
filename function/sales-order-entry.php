<?php 
require_once("../config/db_con.php");

if(isset($_POST["referance"])){
    $referance = mysqli_real_escape_string($con, $_POST["referance"]);
    $itemCode = mysqli_real_escape_string($con, $_POST["itemCode"]);
    $description = mysqli_real_escape_string($con, $_POST["description"]);
    $quantity = mysqli_real_escape_string($con, $_POST["quantity"]);
    $unit = mysqli_real_escape_string($con, $_POST["unit"]);
    $priceAfterTax = mysqli_real_escape_string($con, $_POST["priceAfterTax"]);
    $discount = mysqli_real_escape_string($con, $_POST["discount"]);

    $query = "INSERT INTO service_de_financea.sales_order_entries (referance, itemCode, description, quantity, unit, priceAfterTax, discount) VALUES('$referance','$itemCode','$description','$quantity','$unit','$priceAfterTax','$discount')";
    mysqli_query($con, $query) or die(mysqli_error($con));
    echo json_encode("Data Added to Database");
}