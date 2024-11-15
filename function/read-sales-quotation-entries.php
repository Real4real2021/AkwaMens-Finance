<?php require_once("../config/db_con.php") ?>
<?php

$associativeArray = array();
$selectForm = "SELECT * FROM service_de_financea.sales_quotation_entries WHERE ";
$result = mysqli_query($con, $selectForm) or die (mysqli_query($con));
while ($row = mysqli_fetch_assoc($result)){
    $reference = $row["referance"];
    $itemCode = $row["itemCode"];
    $itemDescription = $row["description"];
    $quantity = $row["quantity"];
    $unit = $row["unit"];
    $priceAfterTax =  $row["priceAfterTax"];
    $discount = $row["discount"];
    $customer = $row["customer"];
    $branch = $row["branch"];
    $payment = $row["payment"];
    $priceList = $row["priceList"];
    $date = $row["date"];
    $associativeArray[]=[
        'reference' => $reference,
        'itemCode' => $itemCode,
        'itemDescription' => $itemDescription,
        'quantity' => $quantity,
        'unit' => $unit,
        'priceAfterTax' => $priceAfterTax,
        'discount' => $discount,
        'customer' => $customer,
        'branch' => $branch,
        'payment' => $payment,
        'priceList' => $priceList,
        'date' => $date,
        'associativeArray' => $associativeArray
    ];
};
echo json_encode($associativeArray);