<?php

// Check if the user is logged in
function isLoggedIn() {
  if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true) {
      return true;
  } else {
      return false;
  }
}

// Redirect the user to the login page if they are not logged in
function checkLoggedIn() {
  if (!isLoggedIn()) {
    header("location: index.php");
    exit;
  }
}

?>
