<?php require_once("../config/db_con.php"); 

$associativeArray = array();
$selectForm = "SELECT * FROM service_de_financea.supplier_credit_notes";
$result = mysqli_query($con, $selectForm) or die (mysqli_query($con));
while ($row = mysqli_fetch_assoc($result)){
    $id = $row["id"];
    $reference = $row["reference"];
    $supplier = $row["supplier"];
    $date = $row["date"];
    $supplierRef = $row["supplierRef"];
    $dueDate = $row["dueDate"];
    $paymentTerms = $row["paymentTerms"];
    $dimensions = $row["dimensions"];
    $supplierCurrency = $row["supplierCurrency"];
    $exchangeRate = $row["exchangeRate"];
    $taxGroup = $row["taxGroup"];
    $currentCredit = $row["currentCredit"];
    $account = $row["account"];
    $name = $row["name"];
    $dimension = $row["dimension"];
    $amount = $row["amount"];
    $memo = $row["memo"];
    $associativeArray[]=[
        'id' => $id,
        'reference' => $reference,
        'supplier' => $supplier,
        'date' => $date,
        'supplierRef' => $supplierRef,
        'dueDate' => $dueDate,
        'paymentTerms' => $paymentTerms,
        'dimensions' => $dimensions,
        'supplierCurrency' => $supplierCurrency,
        'exchangeRate' => $exchangeRate,
        'taxGroup' => $taxGroup,
        'currentCredit' => $currentCredit,
        'account' => $account,
        'name' => $name,
        'dimension' => $dimension,
        'amount' => $amount,
        'memo' => $memo,
    ];
};
echo json_encode($associativeArray);
?>