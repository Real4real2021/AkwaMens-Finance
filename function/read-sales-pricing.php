<?php require_once("../config/db_con.php");

$associativeArray = array();

$query = "SELECT * FROM service_de_financea.sales_pricing";

$result = mysqli_query($con, $query) or die(mysqli_error($con));

while ($row = mysqli_fetch_assoc($result)) {
    $id = $row['id'];
    $currency = $row['currency'];
    $salesType = $row['salesType'];
    $price = $row['price'];
    $associativeArray[] = [
        'id' => $id,
        'currency' => $currency,
        'salesType' => $salesType,
        'price' => $price
    ];
}
echo json_encode($associativeArray);
?>