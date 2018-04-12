<?php
error_reporting(E_ERROR | E_WARNING | E_PARSE);
session_start();
include "mysqldata.php";
$gamedata = $_POST["gamedata"];
$gametime = $_POST["gametime"];
if(isset($_SESSION["login"])){
  if($_SESSION["login"]=="true"){
    $conn = new mysqli($GLOBALS["sqlservername"], $GLOBALS["sqlusername"], $GLOBALS["sqlpassword"], $GLOBALS["sqldatabase"]);
    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
    }
    $sql = "SELECT gametime FROM users WHERE username='".$_SESSION["username"]."'";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
  			// output data of each row
  			while($row = $result->fetch_assoc()) {
          if( intval($row["gametime"]) < intval($gametime) ){
            $sql = "UPDATE users SET gamedata = '". $gamedata ."' WHERE username = '".$_SESSION["username"]."'";
            $result = $conn->query($sql);
            $sql = "UPDATE users SET gametime = '". $gametime ."' WHERE username = '".$_SESSION["username"]."'";
            $result = $conn->query($sql);
            echo '{"status": "succes"}';
            die();
          } else {
            echo '{"status": "old"}';
          }
  			}
  	} else {
  		//Wrong Username
  		echo '{"status": "error"}';
  	}
  }
}
?>
