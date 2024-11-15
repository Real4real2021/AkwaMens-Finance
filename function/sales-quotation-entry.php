<?php 
require_once("../config/db_con.php");

if (isset($_POST["items"]) && isset($_POST["referance"])) {
    $referances = $_POST["referance"]; // Array of referances
    $items = $_POST["items"]; // Grouped items

    // Loop through each referance
    foreach ($referances as $referance) {
        if (isset($items[$referance])) {
            foreach ($items[$referance] as $item) {
                // Escape each item value
                $itemCode = mysqli_real_escape_string($con, $item['itemCode']);
                $description = mysqli_real_escape_string($con, $item['description']);
                $quantity = mysqli_real_escape_string($con, $item['quantity']);
                $unit = mysqli_real_escape_string($con, $item['unit']); // Assuming you have a unit field
                $priceAfterTax = mysqli_real_escape_string($con, $item['priceAfterTax']);
                $discount = mysqli_real_escape_string($con, $item['discount']);
                $customer = mysqli_real_escape_string($con, $item['customer']);
                $branch = mysqli_real_escape_string($con, $item['branch']);
                $payment = mysqli_real_escape_string($con, $item['payment']);
                $priceList = mysqli_real_escape_string($con, $item['priceList']);
                $date = mysqli_real_escape_string($con, $item['date']);

                // Insert each item into the database
                $query = "INSERT INTO service_de_financea.sales_quotation_entries (referance, itemCode, description, quantity, unit, priceAfterTax, discount, customer, branch, payment, priceList, date) 
                          VALUES ('$referance', '$itemCode', '$description', '$quantity', '$unit', '$priceAfterTax', '$discount', '$customer', '$branch', '$payment', '$priceList', '$date')";

                mysqli_query($con, $query) or die(mysqli_error($con));
            }
        }
    }

    echo json_encode("Data added to database");
} else {
    echo json_encode("Invalid data");
}
?>