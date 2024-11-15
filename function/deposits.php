<?php 
require_once("../config/db_con.php");

if (isset($_POST["items"]) && isset($_POST["reference"])) {
    $references = $_POST["reference"]; // Array of references
    $items = $_POST["items"]; // Grouped items

    // Loop through each reference
    foreach ($references as $reference) {
        if (isset($items[$reference])) {
            foreach ($items[$reference] as $item) {
                // Escape each item value
                $date = mysqli_real_escape_string($con, $item['date']);
                $from = mysqli_real_escape_string($con, $item['from']);
                $name = mysqli_real_escape_string($con, $item['name']);
                $into = mysqli_real_escape_string($con, $item['into']);
                $accountCode = mysqli_real_escape_string($con, $item['accountCode']); 
                $accountDescription = mysqli_real_escape_string($con, $item['accountDescription']); 
                $dimension = mysqli_real_escape_string($con, $item['dimension']);
                $amount = mysqli_real_escape_string($con, $item['amount']);
                $memo = mysqli_real_escape_string($con, $item['memo']);

                // Insert each item into the database
                $query = "INSERT INTO service_de_financea.deposits (depositDate, payFrom, name, payInto, accountCode, accountDescription, dimension, amount, memo)
                          VALUES ('$date', '$from', '$name', '$into', '$accountCode', '$accountDescription', '$dimension', '$amount', '$memo')";

                mysqli_query($con, $query) or die(mysqli_error($con));
            }
        }
    }

    echo json_encode("Data added to database");
} else {
    echo json_encode("Invalid data");
}
?>