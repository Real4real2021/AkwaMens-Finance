<?php require_once("../config/db_con.php");

if(isset($_POST['customer'])) {
    $customer = mysqli_real_escape_string($con, $_POST["customer"]);
    $branch = mysqli_real_escape_string($con, $_POST["branch"]);
    $bankAccount = mysqli_real_escape_string($con, $_POST["bankAccount"]);
    $date = mysqli_real_escape_string($con, $_POST["date"]);
    $referance = mysqli_real_escape_string($con, $_POST["referance"]);
    $bankCharge = mysqli_real_escape_string($con, $_POST["referance"]);
    $bankAccount = mysqli_real_escape_string($con, $_POST["bankCharge"]);
    $dimensions = mysqli_real_escape_string($con, $_POST["dimensions"]);
    $amountOfDiscount = mysqli_real_escape_string($con, $_POST["amountOfDiscount"]);
    $amount = mysqli_real_escape_string($con, $_POST["amount"]);
    $memo = mysqli_real_escape_string($con, $_POST["memo"]);

    $query = "INSERT INTO service_de_financea.customer_payments(customer, branch, bankAccount, transactionDate, referance, bankCharge, dimensions, paymentDiscount, discountAmount, memo) VALUES ('$customer','$branch','$bankAccount','$date','$referance','$bankCharge','$dimensions','$amountOfDiscount','$amount','$memo')";
    mysqli_query($con, $query) or die(mysqli_error($con));
    echo json_encode("Data Added to Database");
}