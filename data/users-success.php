<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
//Creates a class called Message
class User
{
    public $isAdmin;
    public $username;
    public $id;
    public $email;
    public $firstName;
    public $lastName;
    public $password;
}

//Creates new message and sets properties
$newUser = new User();
$newUser->isAdmin = $_POST["false"];
$newUser->username = $_POST["username"];
$newUser->id = $_POST["id"];
$newUser->email = $_POST["email"];
$newUser->firstName = $_POST["firstName"];
$newUser->lastName = $_POST["lastName"];
$newUser->password = $_POST["password"];


//Adds object to array
$userList = file_get_contents('users.json');
$jsonInput = json_decode($userList, true);
array_push($jsonInput, $newUser);

//Writes array to JSON file
$jsonData = json_encode($jsonInput);
file_put_contents('users.json', $jsonData);
?>
