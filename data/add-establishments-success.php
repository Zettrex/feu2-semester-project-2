<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
//Creates a class called Contact
class Establishment
{
  //To add more variables create the variable name here and set below
    public $establishmentName;
    public $establishmentEmail;
    public $imageUrl;
    public $price;
    public $maxGuests;
    public $googleLat;
    public $googleLong;
    public $description;
    public $selfCatering;
    public $establishmentID;
}

//Creates new establishment and sets properties
$newEstablishment = new Establishment();
$newEstablishment->establishmentName = $_POST["establishmentName"];
$newEstablishment->establishmentEmail = $_POST["establishmentEmail"];
$newEstablishment->imageUrl = $_POST["imageUrl"];
$newEstablishment->price = $_POST["price"];
$newEstablishment->maxGuests = $_POST["maxGuests"];
$newEstablishment->googleLat = $_POST["googleLat"];
$newEstablishment->googleLong = $_POST["googleLong"];
$newEstablishment->description = $_POST["description"];
$newEstablishment->selfCatering = $_POST["selfCatering"];
$newEstablishment->establishmentID = $_POST["establishmentID"];

//Adds object to array
$establishmentsList = file_get_contents('establishments.json');
$jsonInput = json_decode($establishmentsList, true);
array_push($jsonInput, $newEstablishment);

//Writes array to JSON file
$jsonData = json_encode($jsonInput);
file_put_contents('establishments.json', $jsonData);
?>
