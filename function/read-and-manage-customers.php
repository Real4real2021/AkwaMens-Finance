<?php require_once("../config/db_con.php") ?>
<?php

$associativeArray = array();
$selectForm = "SELECT * FROM service_de_financea.customers";
$result = mysqli_query($con, $selectForm) or die (mysqli_query($con));
while ($row = mysqli_fetch_assoc($result)){
    $primaryId = $row["primaryId"];
    $name = $row["customerName"];
    $customerShortName = $row["customerShortName"];
    $customerAddress = $row["customerAddress"];
    $GSTNo = $row["GSTNo"];
    $customerCurrency = $row["customerCurrency"];
    $salesType = $row["salesType"];
    $phone = $row["phone"];
    $secondaryPhoneNumber = $row["secondaryPhoneNumber"];
    $email = $row["email"];
    $bankAccountNumber = $row["bankAccountNumber"];
    $salesPerson = $row["salesPerson"];
    $discountPercent = $row["discountPercent"];
    $promptPaymentDiscountPercent = $row["promptPaymentDiscountPercent"];
    $creditLimit = $row["creditLimit"];
    $paymentTerms = $row["paymentTerms"];
    $generalNotes = $row["generalNotes"];
    $defaultInventoryLocation = $row["defaultInventoryLocation"];
    $defaultShippingCompany = $row["defaultShippingCompany"] ;
    $taxGroup = $row["taxGroup"];
    $associativeArray[]=[
        'primaryId' => $primaryId,
        'name' => $name,
        'customerShortName' => $customerShortName,
        'customerAddress' => $customerAddress,
        'GSTNo' => $GSTNo,
        'customerCurrency' => $customerCurrency,
        'salesType' => $salesType,
        'phone' => $phone,
        'secondaryPhoneNumber' => $secondaryPhoneNumber,
        'email' => $email,
        'bankAccountNumber' => $bankAccountNumber,
        'salesPerson' => $salesPerson,
        'discountPercent' => $discountPercent,
        'promptPaymentDiscountPercent' => $promptPaymentDiscountPercent,
        'creditLimit' => $creditLimit,
        'paymentTerms' => $paymentTerms,
        'generalNotes' => $generalNotes,
        'defaultInventoryLocation' => $defaultInventoryLocation,
        'defaultShippingCompany' => $defaultShippingCompany,
        'taxGroup' => $taxGroup
    ];
};
echo json_encode($associativeArray);