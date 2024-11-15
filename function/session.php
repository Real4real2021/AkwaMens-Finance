<?php require_once('../config/db_con.php');

$uname = "admin";
$pwd = "admin";

session_start();

if(isset($_SESSION['uname'])){
    echo("Welcome".$_SESSION['uname']);
}else{
    if($_POST['uname'] ==$uname && $_POST['pwd']==$pwd){
        $_SESSION['uname'] = $uname;
        echo("Certain Data");
    }else{
        echo("Username or password is incorrect");
    }
}