<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
//Creates a class called Message
class Message
{
    public $caseID;
    public $clientName;
    public $clientRegistered;
    public $clientID;
    public $clientEmail;
    public $subject;
    public $message;
}

//Creates new message and sets properties
$newMessage = new Message();
$newMessage->caseID = $_POST["caseID"];
$newMessage->clientName = $_POST["clientName"];
$newMessage->clientRegistered = $_POST["clientRegistered"];
$newMessage->clientID = $_POST["clientID"];
$newMessage->clientEmail = $_POST["clientEmail"];
$newMessage->subject = $_POST["subject"];
$newMessage->message = $_POST["message"];

//Adds object to array
$messagesList = file_get_contents('contact.json');
$jsonInput = json_decode($messagesList, true);
array_push($jsonInput, $newMessage);

//Writes array to JSON file
$jsonData = json_encode($jsonInput);
file_put_contents('contact.json', $jsonData);
?>
