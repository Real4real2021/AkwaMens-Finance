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
                $supplier = mysqli_real_escape_string($con, $item['supplier']);
                $orderDate = mysqli_real_escape_string($con, $item['orderDate']);
                $currency = mysqli_real_escape_string($con, $item['currency']);
                $exchangeRate = mysqli_real_escape_string($con, $item['exchangeRate']); // Assuming you have a unit field
                $supplierReference = mysqli_real_escape_string($con, $item['supplierReference']);
                $dimensions = mysqli_real_escape_string($con, $item['dimensions']);
                $receiveInto = mysqli_real_escape_string($con, $item['receiveInto']);
                $deliverTo = mysqli_real_escape_string($con, $item['deliverTo']);
                $itemCode = mysqli_real_escape_string($con, $item['itemCode']);
                $desctiption = mysqli_real_escape_string($con, $item['description']);
                $quantity = mysqli_real_escape_string($con, $item['quantity']);
                $unit = mysqli_real_escape_string($con, $item['unit']);
                $requiredDeliveryDate = mysqli_real_escape_string($con, $item['requiredDeliveryDate']);
                $priceBeforeTax = mysqli_real_escape_string($con, $item['priceBeforeTax']);

                // Insert each item into the database
                $query = "INSERT INTO service_de_financea.direct_supplier_invoice_entries (supplier, reference, orderDate, currency, exchangeRate, supplierReference, dimensions, receiveInto, deliverTo, itemCode, desctiption, quantity, unit, requiredDeliveryDate, priceBeforeTax) 
                          VALUES ('$supplier', '$reference', '$orderDate', '$currency', '$exchangeRate', '$supplierReference', '$dimensions', '$receiveInto', '$deliverTo', '$itemCode', '$desctiption', '$quantity', '$unit', '$requiredDeliveryDate', '$priceBeforeTax')";

                mysqli_query($con, $query) or die(mysqli_error($con));
            }
        }
    }

    echo json_encode("Data added to database");
} else {
    echo json_encode("Invalid data");
}
?>