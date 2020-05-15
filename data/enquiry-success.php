<?php
header('Access-Control-Allow-Origin: *'); 
//Creates a class called Enquiry
class Enquiry
{
    public $orderID;
    public $orderDate;
    public $establishment;
    public $establishmentEmail;
    public $clientName;
    public $clientRegistered;
    public $clientID;
    public $clientEmail;
    public $checkin;
    public $checkout;
    public $adults;
    public $children;
    public $rooms;
    public $payMethod;
    public $price;
    public $notes;
}

//Creates new enquiry and sets properties
$newEnquiry = new Enquiry();
$newEnquiry->orderID = $_POST["orderID"];
$newEnquiry->orderDate = $_POST["orderDate"];
$newEnquiry->establishment = $_POST["establishment"];
$newEnquiry->establishmentEmail = $_POST["establishmentEmail"];
$newEnquiry->clientName = $_POST["clientName"];
$newEnquiry->clientRegistered = $_POST["registered"];
$newEnquiry->clientID = $_POST["clientID"];
$newEnquiry->clientEmail = $_POST["clientEmail"];
$newEnquiry->checkin = $_POST["checkin"];
$newEnquiry->checkout = $_POST["checkout"];
$newEnquiry->adults = $_POST["adults"];
$newEnquiry->children = $_POST["children"];
$newEnquiry->rooms = $_POST["rooms"];
$newEnquiry->payMethod = $_POST["payMethod"];
$newEnquiry->price = $_POST["price"];
$newEnquiry->notes = $_POST["notes"];

//Adds object to array
$enquiriesList = file_get_contents('enquiries.json');
$jsonInput = json_decode($enquiriesList, true);
array_push($jsonInput, $newEnquiry);

//Writes array to JSON file
$jsonData = json_encode($jsonInput);
file_put_contents('enquiries.json', $jsonData);
?>
