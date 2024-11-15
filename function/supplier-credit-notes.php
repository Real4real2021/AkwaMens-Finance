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
                $supplier = mysqli_real_escape_string($con,$item['supplier']);
                $date = mysqli_real_escape_string($con,$item['date']);
                $supplierRef = mysqli_real_escape_string($con,$item['supplierRef']);
                $dueDate = mysqli_real_escape_string($con,$item['dueDate']);
                $paymentTerms = mysqli_real_escape_string($con,$item['paymentTerms']);
                $dimensions = mysqli_real_escape_string($con,$item['dimensions']);
                $supplierCurrency = mysqli_real_escape_string($con,$item['supplierCurrency']);
                $exchangeRate = mysqli_real_escape_string($con,$item['exchangeRate']);
                $taxGroup = mysqli_real_escape_string($con,$item['taxGroup']);
                $currentCredit = mysqli_real_escape_string($con,$item['currentCredit']);
                $account = mysqli_real_escape_string($con,$item['account']);
                $name = mysqli_real_escape_string($con,$item['name']);
                $dimension = mysqli_real_escape_string($con,$item['dimension']);
                $amount = mysqli_real_escape_string($con,$item['amount']);
                $memo = mysqli_real_escape_string($con,$item['memo']);

                // Insert each item into the database
                $query = "INSERT INTO service_de_financea.supplier_credit_notes (reference, supplier, date, supplierRef, dueDate, paymentTerms, dimensions, supplierCurrency, exchangeRate, taxGroup, currentCredit, account, name, dimension, amount, memo) 
                          VALUES ('$reference', '$supplier', '$date', '$supplierRef', '$dueDate', '$paymentTerms', '$dimensions', '$supplierCurrency', '$exchangeRate', '$taxGroup', '$currentCredit', '$account', '$name','$dimension' , '$amount', '$memo')";

                mysqli_query($con, $query) or die(mysqli_error($con));
            }
        }
    }

    echo json_encode("Data added to database");
} else {
    echo json_encode("Invalid data");
}
?>