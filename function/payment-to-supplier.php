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
                $paymentTo = mysqli_real_escape_string($con, $item['paymentTo']);
                $fromBankAccount = mysqli_real_escape_string($con, $item['fromBankAccount']);
                $bankBalance = mysqli_real_escape_string($con, $item['bankBalance']);
                $datePaid = mysqli_real_escape_string($con, $item['datePaid']);
                $bankAmount = mysqli_real_escape_string($con, $item['bankAmount']); 
                $bankCharge = mysqli_real_escape_string($con, $item['bankCharge']); 
                $dimensions = mysqli_real_escape_string($con, $item['dimensions']);
                $discountAmount = mysqli_real_escape_string($con, $item['discountAmount']);
                $paymentAmount = mysqli_real_escape_string($con, $item['paymentAmount']);

                // Insert each item into the database
                $query = "INSERT INTO service_de_financea.payment_to_supplier (paymentTo, fromBankAccount, bankBalance, datePaid, reference, bankCharge, dimensions, discountAmount, paymentAmount)  
                          VALUES ('$paymentTo', '$fromBankAccount', '$bankBalance', '$datePaid', '$reference', '$bankCharge', '$dimensions', '$discountAmount', '$paymentAmount')";

                mysqli_query($con, $query) or die(mysqli_error($con));
            }
        }
    }

    echo json_encode("Data added to database");
} else {
    echo json_encode("Invalid data");
}
?>