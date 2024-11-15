<?php require_once("../config/db_con.php"); 

$associativeArray = array();
$selectForm = "SELECT * FROM service_de_financea.grn_entries";
$result = mysqli_query($con, $selectForm) or die (mysqli_query($con));
while ($row = mysqli_fetch_assoc($result)){
    $id = $row["id"];
    $reference = $row["reference"];
    $supplier = $row["supplier"];
    $orderDate = $row["orderDate"];
    $currency = $row["currency"];
    $exchangeRate = $row["exchangeRate"];
    $supplierReference = $row["supplierReference"]; 
    $dimensions = $row["dimensions"];
    $receiveInto = $row["receiveInto"];
    $delvierTo = $row["deliverTo"];
    $itemCode = $row["itemCode"];
    $description = $row["description"];
    $quantity = $row["quantity"];
    $unit = $row["unit"];
    $requiredDeliveryDate = $row["requiredDeliveryDate"];
    $priceBeforeTax = $row["priceBeforeTax"];
    $associativeArray[]=[
        'id' => $id,
        'reference' => $reference,
        'supplier' => $supplier,
        'orderDate' => $orderDate,
        'currency' => $currency,
        'exchangeRate' => $exchangeRate,
        'supplierReference' => $supplierReference,
        'dimensions' => $dimensions,
        'receiveInto' => $receiveInto,
        'delvierTo' => $delvierTo,
        'itemCode' => $itemCode,
        'description' => $description,
        'quantity' => $quantity,
        'unit' => $unit,
        'requiredDeliveryDate' => $requiredDeliveryDate,
        'priceBeforeTax' => $priceBeforeTax,
    ];
    
};
echo json_encode($associativeArray);
?>