<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Welcome</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="form-box">
    <h1>Welcome<?php if (isset($_SESSION['username'])) { echo ", {$_SESSION['username']}!"; } ?></h1>
    <?php if (isset($_SESSION['username'])) { ?>
      <form method="post">
        <label for="string">Enter a string to save:</label>
        <input type="text" id="string" name="string">
        <button type="submit">Save</button>
      </form>
      <p><a href="logout.php">Logout</a></p>
    <?php } else { ?>
      <p>Please <a class="bold" href="login.php">login</a> or <a class="bold" href="register.php">register</a> to continue</p>
    <?php } ?>

    <p><br><br>This program functions as a multiplayer version of Desmos, the graphing calculator.<br><br>Each account may create only one equation written in LaTeX.<br><br>This is based off of an idea where many people each add one small thing to create one big thing.<br><br>I shared this program with a community of people who use Desmos and many people added their own equations to the program.</p>
    
  </div>
</body>
</html>
