<?php require_once("../config/db_con.php");

if(isset($_POST['fromAccount'])){
    $fromAccount = mysqli_real_escape_string($con, $_POST['fromAccount']);
    $amount = mysqli_real_escape_string($con, $_POST['amount']);
    $bankBalance = mysqli_real_escape_string($con, $_POST['bankBalance']);
    $bankCharge = mysqli_real_escape_string($con, $_POST['bankCharge']);
    $toAccount = mysqli_real_escape_string($con, $_POST['toAccount']);
    $memo = mysqli_real_escape_string($con, $_POST['memo']);
    $reference = mysqli_real_escape_string($con, $_POST['reference']);
    $dimension = mysqli_real_escape_string($con, $_POST['dimension']);

    $query = "INSERT INTO service_de_financea.bank_account_transfer (fromAccount, amount, bankBalance, bankCharge, toAccount, memo, reference, dimension)  
              VALUES ('$fromAccount', '$amount', '$bankBalance', '$bankCharge', '$toAccount', '$memo', '$reference', '$dimension')";

    mysqli_query($con, $query) or die(mysqli_error($con));

    echo json_encode("Data added to database");
}