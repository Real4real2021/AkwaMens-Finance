<?php require_once("../config/db_con.php"); 

$associativeArray = array();
$selectForm = "SELECT * FROM service_de_financea.payment_to_supplier";
$result = mysqli_query($con, $selectForm) or die (mysqli_query($con));
while ($row = mysqli_fetch_assoc($result)){
    $id = $row["id"];
    $reference = $row["reference"];
    $paymentTo = $row["paymentTo"];
    $fromBankAccount = $row["fromBankAccount"];
    $bankBalance = $row["bankBalance"];
    $datePaid = $row["datePaid"];
    $bankCharge = $row["bankCharge"]; 
    $dimensions = $row["dimensions"];
    $discountAmount = $row["discountAmount"];
    $paymentAmount = $row["paymentAmount"];
    $associativeArray[]=[
        'id' => $id,
        'reference' => $reference,
        'paymentTo' => $paymentTo,
        'fromBankAccount' => $fromBankAccount,
        'bankBalance' => $bankBalance,
        'datePaid' => $datePaid,
        'bankCharge' => $bankCharge,
        'dimensions' => $dimensions,
        'discountAmount' => $discountAmount,
        'paymentAmount' => $paymentAmount,
    ];
};
echo json_encode($associativeArray);
?>