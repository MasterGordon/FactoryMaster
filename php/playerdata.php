<?php
//error_reporting(E_ERROR | E_WARNING | E_PARSE);
session_start();
include "mysqldata.php";
if(isset($_SESSION["login"])){
  if($_SESSION["login"]=="true"){
    $conn = new mysqli($GLOBALS["sqlservername"], $GLOBALS["sqlusername"], $GLOBALS["sqlpassword"], $GLOBALS["sqldatabase"]);
    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
    }
    $sql = "SELECT gamedata FROM users WHERE username='".$_SESSION["username"]."'";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
  		// output data of each row
  		while($row = $result->fetch_assoc()) {
        echo $row["gamedata"];
      }
    }else{
      echo '{}';
    }
  }
}else{
  echo '{"status": "nologin"}';
}

?>
