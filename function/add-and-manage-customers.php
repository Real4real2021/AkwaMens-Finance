<?php
require_once("../config/db_con.php");

if (isset($_POST["customerName"])) {
    $customerName = mysqli_real_escape_string($con, $_POST["customerName"]);
    $customerShortName = mysqli_real_escape_string($con, $_POST["customerShortName"]);
    $customerAddress = mysqli_real_escape_string($con, $_POST["customerAddress"]);
    $GSTNo = mysqli_real_escape_string($con, $_POST["GSTNo"]);
    $customerCurrency = mysqli_real_escape_string($con, $_POST["customerCurrency"]);
    $salesType = mysqli_real_escape_string($con, $_POST["salesType"]);
    $phoneNumber = mysqli_real_escape_string($con, $_POST["phoneNumber"]);
    $secondaryPhoneNumber = mysqli_real_escape_string($con, $_POST["secondaryPhoneNumber"]);
    $email = mysqli_real_escape_string($con, $_POST["email"]);
    $bankAccountNumber = mysqli_real_escape_string($con, $_POST["bankAccountNumber"]);
    $salesPerson = mysqli_real_escape_string($con, $_POST["salesPerson"]);
    $discountPercent = mysqli_real_escape_string($con, $_POST["discountPercent"]);
    $paymentDiscountPercent = mysqli_real_escape_string($con, $_POST["paymentDiscountPercent"]);
    $creditLimit = mysqli_real_escape_string($con, $_POST["creditLimit"]);
    $generalNotes = mysqli_real_escape_string($con, $_POST["generalNotes"]);
    $paymentTerms = mysqli_real_escape_string($con, $_POST["paymentTerms"]);
    $defaultInventory = mysqli_real_escape_string($con, $_POST["defaultInventory"]);
    $defaultShippingCompany = mysqli_real_escape_string($con, $_POST["defaultShippingCompany"]);
    $salesArea = mysqli_real_escape_string($con, $_POST["salesArea"]);
    $taxGroup = mysqli_real_escape_string($con, $_POST["taxGroup"]);

    $invoiceQuery = "INSERT INTO service_de_financea.customers (customerName, customerShortName, customerAddress, GSTNo, customerCurrency, salesType, phone, secondaryPhoneNumber, email, bankAccountNumber, salesPerson, discountPercent, promptPaymentDiscountPercent, creditLimit, generalNotes, paymentTerms, defaultInventoryLocation, defaultShippingCompany, salesArea, taxGroup) VALUES ('$customerName', '$customerShortName', '$customerAddress', '$GSTNo', '$customerCurrency', '$salesType', '$phoneNumber', '$secondaryPhoneNumber', '$email', '$bankAccountNumber', '$salesPerson', '$discountPercent', '$paymentDiscountPercent', '$creditLimit', '$generalNotes', '$paymentTerms', '$defaultInventory', '$defaultShippingCompany', '$salesArea', '$taxGroup')";

    mysqli_query($con, $invoiceQuery) or die(mysqli_error($con));
    echo json_encode("Data entry added to database!");
}