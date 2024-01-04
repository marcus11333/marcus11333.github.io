<?php

// Define the path to the file containing user data
define('USER_DATA_FILE', 'users.txt');

// Attempt to open the user data file
$user_data = @file_get_contents(USER_DATA_FILE);

// Check if the user data file exists and is readable
if ($user_data === false) {
    die("ERROR: Could not read user data file.");
}

// Convert the user data from a string to an array
$user_data = explode("\n", $user_data);

// Remove any empty elements from the array
$user_data = array_filter($user_data);

// Convert each element of the array to an associative array containing the username, password, and string
$user_data = array_map(function($line) {
    $data = explode(':', $line);
    return array('username' => $data[0], 'password' => $data[1], 'string' => $data[2]);
}, $user_data);




function read_users_file() {
    $users_data = file_get_contents("users.json");
    $users = json_decode($users_data, true);
    if (!$users) {
        return array();
    }
    return $users;
}

function write_users_file($users) {
    $users_data = json_encode($users);
    file_put_contents("users.json", $users_data);
}

function getstring($username) {
  // Get the contents of the strings.json file
  $json = file_get_contents("strings.json");
  // Convert the JSON string to an associative array
  $strings = json_decode($json, true);
  // Check if the username exists in the array
  if (array_key_exists($username, $strings)) {
    // Return the string associated with the username
    return $strings[$username];
  } else {
    // Return an empty string if the username is not found
    return "";
  }
}

function savestring($username, $string) {
  // Get the contents of the strings.json file
  $json = file_get_contents("strings.json");
  // Convert the JSON string to an associative array
  $strings = json_decode($json, true);
  // Update the string associated with the username
  $strings[$username] = $string;
  // Convert the associative array back to a JSON string
  $json = json_encode($strings);
  // Write the JSON string back to the strings.json file
  file_put_contents("strings.json", $json);
}



?>