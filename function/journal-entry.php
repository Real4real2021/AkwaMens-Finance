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
                $currency = mysqli_real_escape_string($con, $item['currency']);
                $documentDate = mysqli_real_escape_string($con, $item['documentDate']);
                $eventDate = mysqli_real_escape_string($con, $item['eventDate']);
                $sourceRef = mysqli_real_escape_string($con, $item['sourceRef']);
                $includeInTaxRegister = mysqli_real_escape_string($con, $item['includeInTaxRegister']); 
                $accountCode = mysqli_real_escape_string($con, $item['accountCode']); 
                $accountDescription = mysqli_real_escape_string($con, $item['accountDescription']);
                $dimension = mysqli_real_escape_string($con, $item['dimension']);
                $debit = mysqli_real_escape_string($con, $item['debit']);
                $credit = mysqli_real_escape_string($con, $item['credit']);
                $memo = mysqli_real_escape_string($con, $item['memo']);

                // Insert each item into the database
                $query = "INSERT INTO service_de_financea.journal_entries (currency, documentDate, eventDate, sourceRef, includeInTaxRegister, accountCode, accountDescription, dimension, debit, credit, memo)
                          VALUES ('$currency', '$documentDate', '$eventDate', '$sourceRef', '$includeInTaxRegister', '$accountCode', '$accountDescription', '$dimension', '$debit', '$credit', '$memo')";

                mysqli_query($con, $query) or die(mysqli_error($con));
            }
        }
    }

    echo json_encode("Data added to database");
} else {
    echo json_encode("Invalid data");
}
?>