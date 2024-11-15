<?php require_once("../config/db_con.php") ?>
<?php

$associativeArray = array();
$selectForm = "SELECT * FROM service_de_financea.purchase_order_entries";
$result = mysqli_query($con, $selectForm) or die (mysqli_query($con));
while ($row = mysqli_fetch_assoc($result)){
    $id = $row["id"];
    $reference = $row["reference"];
    $supplierReference = $row["supplierReference"];
    $dimensions = $row["dimensions"];
    $receiveInto = $row["receiveInto"];
    $deliverTo = $row["deliverTo"];
    $itemCode = $row["itemCode"];
    $description = $row["description"];
    $quantity = $row["quantity"];
    $unit = $row["unit"];
    $requiredDeliveryDate = $row["requiredDeliveryDate"];
    $priceBeforeTax = $row["priceBeforeTax"];
    $supplier = $row["supplier"];
    $exchangeRate = $row["exchangeRate"];
    $date = $row["date"];
    $currency = $row["currency"];
    $associativeArray[]=[
        'id' => $id,
        'reference' => $reference,
        'supplierReference' => $supplierReference,
        'dimensions' => $dimensions,
        'receiveInto' => $receiveInto,
        'deliverTo' => $deliverTo,
        'itemCode' => $itemCode,
        'description' => $description,
        'quantity' => $quantity,
        'unit' => $unit,
        'requiredDeliveryDate' => $requiredDeliveryDate,
        'priceBeforeTax' => $priceBeforeTax,
        'supplier' => $supplier,
        'exchangeRate' => $exchangeRate,
        'date' => $date,
        'currency' => $currency,
    ];
};
echo json_encode($associativeArray);