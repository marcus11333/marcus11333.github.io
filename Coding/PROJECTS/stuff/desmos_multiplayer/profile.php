<?php
  require_once('config.php');

  // Check if user is logged in
  session_start();
  if (!isset($_SESSION['username'])) {
    header('Location: index.php');
    exit();
  }

  // Get the string for the current user
  $filename = 'users.txt';
  $content = file_get_contents($filename);
  $users = explode("\n", $content);
  foreach ($users as $user) {
    $user_data = explode(',', $user);
    if ($user_data[0] === $_SESSION['username']) {
      $string = $user_data[2];
      break;
    }
  }
?>
