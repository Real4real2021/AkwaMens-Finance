<?php require_once("../config/db_con.php") ?>
<?php

$associativeArray = array();
$selectForm = "SELECT * FROM service_de_financea.branches";
$result = mysqli_query($con, $selectForm) or die (mysqli_query($con));
while ($row = mysqli_fetch_assoc($result)){
    $shortName = $row["shortName"];
    $branchName = $row["branchName"];
    $contact = $row["contact"];
    $salesPerson = $row["salesPerson"];
    $area = $row["area"];
    $phoneNo = $row["phoneNo"];
    $email = $row["email"];
    $taxGroup = $row["taxGroup"];
    $associativeArray[]=[
        'shortName' => $shortName,
        'branchName' => $branchName,
        'contact' => $contact,
        'salesPerson' => $salesPerson,
        'area' => $area,
        'phoneNo' => $phoneNo,
        'email' => $email,
        'taxGroup' => $taxGroup,
        'associativeArray' => $associativeArray,
    ];
};
echo json_encode($associativeArray);