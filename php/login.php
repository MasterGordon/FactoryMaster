<?php
error_reporting(E_ERROR | E_WARNING | E_PARSE);
include "mysqldata.php"
?>

<?php
session_start();
$username = $_GET['username'];
$passwort = $_GET['password'];
if( isset($_GET['username']) && isset($_GET['password']) ){
  $conn = new mysqli($GLOBALS["sqlservername"], $GLOBALS["sqlusername"], $GLOBALS["sqlpassword"], $GLOBALS["sqldatabase"]);
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }
  $sql = "SELECT password FROM users WHERE username='".$_GET['username']."'";
  $result = $conn->query($sql);
  if ($result->num_rows > 0) {
			// output data of each row
			while($row = $result->fetch_assoc()) {
				if(password_verify($_GET['password'],$row["password"])){
					$_SESSION["login"] = "true";
					$_SESSION["username"] = $_GET['username'];
      		echo '{"status": "succes"}';
				}else{
					//Wrong PW
      		echo '{"status": "error"}';
				}
			}
	} else {
		//Wrong Username
		echo '{"status": "error"}';
	}
} else {
  echo '{"status": "error"}';
}
?>
