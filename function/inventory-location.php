<?php require_once("../config/db_con.php");

if(isset($_POST['locationCode'])){
    $locationCode = mysqli_real_escape_string($con, $_POST['locationCode']);
    $locationName = mysqli_real_escape_string($con, $_POST['locationName']);
    $contactForDeliveris = mysqli_real_escape_string($con, $_POST['locationName']);
    $address = mysqli_real_escape_string($con, $_POST['address']);
    $telephone = mysqli_real_escape_string($con, $_POST['telephone']);
    $secondaryTelephone = mysqli_real_escape_string($con, $_POST['secondaryTelephone']);
    $email = mysqli_real_escape_string($con, $_POST['email']);

    $sql = "INSERT INTO inventory_location (locationCode, locationName, contactForDeliveries, address, telephone, secondaryTelephone, email) VALUES ('$locationCode', '$locationName', '$contactForDeliveris', '$address', '$telephone', '$secondaryTelephone', '$email')";

    mysqli_query($con, $sql) or die(mysqli_error($con));

    echo json_encode("Data added to database");
    }
