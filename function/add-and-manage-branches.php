<?php
require_once("../config/db_con.php");

if(isset($_POST['branchName'])){
    $branchName = mysqli_real_escape_string($con, $_POST["branchName"]);
    $branchShortName = mysqli_real_escape_string($con, $_POST["branchShortName"]);
    $salesPerson = mysqli_real_escape_string($con, $_POST["salesPerson"]);
    $salesArea = mysqli_real_escape_string($con, $_POST["salesArea"]);
    $salesDiscountAccount = mysqli_real_escape_string($con, $_POST["salesDiscountAccount"]);
    $promptPaymentDiscountAccount = mysqli_real_escape_string($con, $_POST["promptPaymentDiscountAccount"]);
    $bankAccount = mysqli_real_escape_string($con, $_POST["bankAccount"]);
    $contactPerson = mysqli_real_escape_string($con, $_POST["contactPerson"]);
    $phoneNumber = mysqli_real_escape_string($con, $_POST["phoneNumber"]);
    $secondaryPhoneNumber = mysqli_real_escape_string($con, $_POST["secondaryPhoneNumber"]);
    $email = mysqli_real_escape_string($con, $_POST["email"]);
    $taxGroup = mysqli_real_escape_string($con, $_POST["taxGroup"]);
    $documentLanguage = mysqli_real_escape_string($con, $_POST["documentLanguage"]);
    $mailingAddress = mysqli_real_escape_string($con, $_POST["mailingAddress"]);
    $billingAddress = mysqli_real_escape_string($con, $_POST["billingAddress"]);
    $generalNotes = mysqli_real_escape_string($con, $_POST["generalNotes"]);

    $query = "INSERT INTO service_de_financea.branches (shortName, branchName, contact, salesPerson, area, phoneNo, email) VALUES ('$branchShortName','$branchName','$branchName', '$salesPerson', '$salesArea', '$phoneNumber', '$email ')";

    mysqli_query($con, $query) or die(mysqli_erro($con));
    echo json_encode("Data Added To Database");
}
