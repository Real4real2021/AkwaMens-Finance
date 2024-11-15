<?php require_once ('../config/db_con.php');

$associativeArray = array();
$selectForm = "SELECT * FROM service_de_financea.customer_payments";
$result = mysqli_query($con, $selectForm) or die (mysqli_query($con));
while ($row = mysqli_fetch_assoc($result)){
    $customer = $row["customer"];
    $branch = $row["branch"];
    $bankAccount = $row["bankAccount"];
    $transactionDate = $row["transactionDate"];
    $referance = $row["referance"];
    $bankCharge = $row["bankCharge"];
    $dimensions = $row["dimensions"];
    $paymentDiscount = $row["paymentDiscount"];
    $discountAmount = $row["discountAmount"];
    $memo = $row["memo"];
    $associativeArray[]=[
        'customer' => $customer,
        'branch' => $branch,
        'bankAccount' => $bankAccount,
        'transactionDate' => $transactionDate,
        'referance' => $referance,
        'bankCharge' => $bankCharge,
        'dimensions' => $dimensions,
        'paymentDiscount' => $paymentDiscount,
        'discountAmount' => $discountAmount,
        'memo' => $memo
    ];
};
echo json_encode($associativeArray);