<?php
session_start();
require_once 'config.php';
require_once 'functions.php';

// Redirect user to login page if not logged in
if (!isset($_SESSION['username'])) {
    header('Location: login.php');
    exit;
}

// Get the currently logged in user's string
$username = $_SESSION['username'];
$string = isset($_POST['string']) ? $_POST['string'] : getString($username);

// Save the user's string if form is submitted
if (isset($_POST['submit'])) {
    $string = $_POST['string'];
    saveString($username, $string);
}

?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Welcome <?php echo $_SESSION['username']; ?></title>
    <link rel="stylesheet" href="style.css">
    <script src="https://www.desmos.com/api/v1.7/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6"></script>
    <script src="script.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  </head>
  <body onload="updateGraph()">
    <div class="container">
      <h1>Welcome, <?php echo $_SESSION['username']; ?></h1>
      <p>Your equation: <?php echo $string; ?></p>
      <form method="post">
          <label for="string">Enter your equation:</label>
          <input type="text" name="string" placeholder="<?php echo htmlspecialchars($string); ?>">
          <button type="submit" name="submit" value="Save">Submit</button>
      </form>
      <form action="logout.php" method="post">
        <button type="submit" name="logout">Logout</button>
      </form>
    </div>
    <div id="bernard" style="width: 500px; height: 500px;"></div>
    <script src="script.js"></script>
  </body>
</html>




    
