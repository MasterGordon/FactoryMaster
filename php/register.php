<?php
session_start();
error_reporting(E_ERROR | E_WARNING | E_PARSE);
include "mysqldata.php";

$pdo = new PDO('mysql:host=' . $GLOBALS["sqlservername"] . ';dbname=' . $GLOBALS["sqldatabase"], $GLOBALS["sqlusername"], $GLOBALS["sqlpassword"]);
$error = false;
$username = $_GET['username'];
$passwort = $_GET['password1'];
$passwort2 = $_GET['password2'];

if(strlen($username) == 0 || strlen($username) > 15) {
  echo '{"status":"username"}';
  $error = true;
}
if(strlen($passwort) == 0 && !$error) {
  echo '{"status":"password1"}';
  $error = true;
}
if($passwort != $passwort2 && !$error) {
  echo '{"status":"password2"}';
  $error = true;
}

if(!$error) {
  $statement = $pdo->prepare("SELECT * FROM users WHERE username = :username");
  $result = $statement->execute(array('username' => $username));
  $user = $statement->fetch();
  if($user !== false) {
    echo '{"status":"username"}';
    $error = true;
  }
}
if(!$error) {
  $passwort_hash = password_hash($passwort, PASSWORD_DEFAULT);

  $statement = $pdo->prepare("INSERT INTO users (username, password) VALUES (:username, :password)");
  $result = $statement->execute(array('username' => $username, 'password' => $passwort_hash));

  if($result) {
    $_SESSION["login"] = "true";
    $_SESSION["username"] = $_GET['username'];
    echo '{"status":"succes"}';
  } else {
    echo '{"status":"error"}';
  }
}
?>
