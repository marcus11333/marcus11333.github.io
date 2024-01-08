<?php
session_start();

// Check if the user is already logged in, if yes then redirect them to welcome page
if (isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true) {
    header("location: welcome.php");
    exit;
}

// Include config file
require_once "config.php";

// Define variables and initialize with empty values
$username = $password = "";
$username_err = $password_err = "";

// Processing form data when form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Check if username is empty
    if (empty(trim($_POST["username"]))) {
        $username_err = "Please enter username.";
    } else {
        $username = trim($_POST["username"]);
    }

    // Check if password is empty
    if (empty(trim($_POST["password"]))) {
        $password_err = "Please enter your password.";
    } else {
        $password = trim($_POST["password"]);
    }

    // Validate credentials
    if (empty($username_err) && empty($password_err)) {
        // Prepare a select statement
        $users_file = file_get_contents("users.txt");
        $users = explode("\n", $users_file);

        foreach ($users as $user) {
            $credentials = explode(":", $user);
            if ($credentials[0] === $username && password_verify($password, $credentials[1])) {
                // Password is correct, so start a new session
                session_start();

                // Store data in session variables
                $_SESSION["loggedin"] = true;
                $_SESSION["username"] = $username;

                // Redirect user to welcome page
                header("location: welcome.php");
            }
        }
        // Username/password doesn't match, show an error message
        $password_err = "The username or password you entered is incorrect.";
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Login</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="form-box">
        <h1>Login</h1>
        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
            <div class="input-group <?php echo (!empty($username_err)) ? 'has-error' : ''; ?>">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" value="<?php echo $username; ?>">
                <span class="help-block"><?php echo $username_err; ?></span>
            </div>
            <div class="input-group <?php echo (!empty($password_err)) ? 'has-error' : ''; ?>">
                <label for="password">Password:</label>
                <input type="password" id="password" name="password">
                <span class="help-block"><?php echo $password_err; ?></span>
            </div>
            <div class="input-group">
                <button type="submit">Login</button>
            </div>
        </form>
        <p>Don't have an account? <a href="register.php">Sign up now</a>.</p>
    </div>
</body>
</html>
