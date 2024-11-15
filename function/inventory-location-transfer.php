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
                $from = mysqli_real_escape_string($con, $item['from']);
                $to = mysqli_real_escape_string($con, $item['to']);
                $date = mysqli_real_escape_string($con, $item['date']);
                $itemCode = mysqli_real_escape_string($con, $item['itemCode']);
                $inventoryItem = mysqli_real_escape_string($con, $item['inventoryItem']);
                $quantity = mysqli_real_escape_string($con, $item['quantity']);
                $unit = mysqli_real_escape_string($con, $item['unit']);
                

                // Insert each item into the database
                $query = "INSERT INTO service_de_financea.inventory_location_transfer (reference, fromLocation, toLocation, transferDate, itemCode, inventoryItem, quantity, unit)  
                          VALUES ('$reference', '$from', '$to', '$date', '$itemCode', '$inventoryItem', '$quantity', '$unit')";

                mysqli_query($con, $query) or die(mysqli_error($con));
            }
        }
    }

    echo json_encode("Data added to database");
} else {
    echo json_encode("Invalid data");
}
?>