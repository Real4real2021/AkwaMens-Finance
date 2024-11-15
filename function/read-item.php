<?php require_once('../config/db_con.php')?>
<?php
$associativeArray = array();
$query = "SELECT * FROM service_de_financea.item_inventory";
$result = mysqli_query($con, $query) or die(mysqli_query($con));
while($row = mysqli_fetch_assoc($result)){
    $itemCode = $row["item_code"];
    $name = $row["name"];
    $description = $row["description"];
    $category = $row["category"];
    $itemTaxType = $row["item_tax_type"];
    $itemType = $row["item_type"];
    $unitOfMeasure = $row["unit_of_measure"];
    $editableDescription = $row["editable_description"];
    $excludeFromSales = $row["exclude_from_sales"];
    $excludeFromPurchases = $row["exclude_from_purchases"];
    $dimensions = $row["dimensions"];
    $salesAccount = $row["sales_account"];
    $inventoryAccount = $row["inventory_account"];
    $cogsAccounts = $row["cogs_account"];
    $inventoryAdjustmentAccount = $row["inventory_adjustment_account"];
    $associativeArray[]=[
        'itemCode' => $itemCode,
        'name' => $name,
        'description' => $description,
        'category' => $category,
        'itemTaxType' => $itemTaxType,
        'itemType' => $itemType,
        'unitOfMeasure' => $unitOfMeasure,
        'editableDescription' => $editableDescription,
        'excludeFromSales' => $excludeFromSales,
        'excludeFromPurchases' => $excludeFromPurchases,
        'dimensions' => $dimensions,
        'salesAccount' => $salesAccount,
        'inventoryAccount' => $inventoryAccount,
        'cogsAccounts' => $cogsAccounts,
        'inventoryAdjustmentAccount' => $inventoryAdjustmentAccount,
        'associativeArray' => $associativeArray,
    ];
};
echo json_encode($associativeArray);