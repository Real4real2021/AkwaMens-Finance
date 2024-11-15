<?php
require_once("../config/db_con.php");

if(isset($_POST['itemName'])){
    $itemName = mysqli_real_escape_string($con, $_POST["itemName"]);
    $itemDescription = mysqli_real_escape_string($con, $_POST["itemDescription"]);
    $itemCategory = mysqli_real_escape_string($con, $_POST["itemCategory"]);
    $itemTaxType = mysqli_real_escape_string($con, $_POST["itemTaxType"]);
    $itemType = mysqli_real_escape_string($con, $_POST["itemType"]);
    $unitOfMeasure = mysqli_real_escape_string($con, $_POST["unitOfMeasure"]);
    $editableDescription = mysqli_real_escape_string($con, $_POST["editableDescription"]);
    $excludeFromSales = mysqli_real_escape_string($con, $_POST["excludeFromSales"]);
    $excludeFromPurchases = mysqli_real_escape_string($con, $_POST["excludeFromPurchases"]);
    $dimensions = mysqli_real_escape_string($con, $_POST["dimensions"]);
    $salesAccounts = mysqli_real_escape_string($con, $_POST["salesAccounts"]);
    $inventoryAccounts = mysqli_real_escape_string($con, $_POST["inventoryAccounts"]);
    $cogsAccounts = mysqli_real_escape_string($con, $_POST["cogsAccounts"]);
    $inventoryAdjustmentAccount = mysqli_real_escape_string($con, $_POST["inventoryAdjustmentAccount"]);
    $itemCode = mysqli_real_escape_string($con, $_POST["itemCode"]);

    $insertQuery = "INSERT INTO service_de_financea.item_inventory (item_code, name, description, category, item_tax_type, item_type, unit_of_measure, editable_description, exclude_from_sales, exclude_from_purchases, dimensions, sales_account, inventory_account, cogs_account, inventory_adjustment_account) VALUES ('$itemCode','$itemName', '$itemDescription', '$itemCategory', '$itemTaxType', '$itemType', '$unitOfMeasure', '$editableDescription', '$excludeFromSales', '$excludeFromPurchases', '$dimensions', '$salesAccounts', '$inventoryAccounts', '$cogsAccounts', '$inventoryAdjustmentAccount')";

    mysqli_query($con, $insertQuery) or die(mysqli_error($con));
    echo json_encode("Data entry added to database");
}
?>