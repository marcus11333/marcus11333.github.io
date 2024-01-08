<?php
session_start();

// if user is already logged in, redirect to welcome page
if (isset($_SESSION['username'])) {
  header('Location: welcome.php');
  exit;
}

// if the form was submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  // get user data from file
  $users = file('users.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
  $found_user = false;
  foreach ($users as $user) {
    list($username, $password) = explode(':', $user);
    if ($_POST['username'] == $username) {
      $found_user = true;
      break;
    }
  }
  
  // if the user was not found, add them to the file
  if (!$found_user) {
    $username = $_POST['username'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    file_put_contents('users.txt', "$username:$password" . PHP_EOL, FILE_APPEND | LOCK_EX);
    $_SESSION['username'] = $username;
    header('Location: welcome.php');
    exit;
  } else {
    $error = 'Username already taken';
  }
}
?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Register</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="form-box">
    <h1>Register</h1>
    <?php if (isset($error)) { echo "<p class='error'>$error</p>"; } ?>
    <form method="post">
      <label for="username">Username:</label>
      <input type="text" id="username" name="username">
      <label for="password">Password:</label>
      <input type="password" id="password" name="password">
      <button type="submit">Register</button>
    </form>
    <p>Already have an account? <a href="login.php">Login</a></p>
  </div>
</body>
</html>
