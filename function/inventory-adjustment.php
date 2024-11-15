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
                $location = mysqli_real_escape_string($con, $item['location']);
                $date = mysqli_real_escape_string($con, $item['date']);
                $itemCode = mysqli_real_escape_string($con, $item['itemCode']);
                $inventoryItem = mysqli_real_escape_string($con, $item['inventoryItem']);
                $QOH = mysqli_real_escape_string($con, $item['QOH']);
                $quantity = mysqli_real_escape_string($con, $item['quantity']);
                $unit = mysqli_real_escape_string($con, $item['unit']);
                $unitCost = mysqli_real_escape_string($con, $item['unitCost']);
                

                // Insert each item into the database
                $query = "INSERT INTO service_de_financea.inventory_adjustment (location, date, reference, itemCode, inventoryItem, QOH, quantity, unit, unitCost)  
                          VALUES ('$location', '$date', '$reference', '$itemCode', '$inventoryItem', '$QOH', '$quantity', '$unit', '$unitCost')";

                mysqli_query($con, $query) or die(mysqli_error($con));
            }
        }
    }

    echo json_encode("Data added to database");
} else {
    echo json_encode("Invalid data");
}
?>