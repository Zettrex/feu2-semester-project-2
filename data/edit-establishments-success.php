<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
//Creates a class called Contact
ini_set('display_startup_errors', 1);
ini_set('display_errors', 1);
error_reporting(E_ALL);
class Establishment
{
  //To add more variables create the variable name here and set below
    public $establishmentName;
    public $establishmentEmail;
    public $imageUrl;
    public $price;
    public $rating;
    public $maxGuests;
    public $googleLat;
    public $googleLong;
    public $description;
    public $selfCatering;
    public $establishmentID;
}


//Creates the new edited establishment and sets properties
$newEstablishment = new Establishment();
$newEstablishment->establishmentName = $_POST["establishmentName"];
$newEstablishment->establishmentEmail = $_POST["establishmentEmail"];
$newEstablishment->imageUrl = $_POST["imageUrl"];
$newEstablishment->rating = $_POST["rating"];
$newEstablishment->price = $_POST["price"];
$newEstablishment->maxGuests = $_POST["maxGuests"];
$newEstablishment->googleLat = $_POST["googleLat"];
$newEstablishment->googleLong = $_POST["googleLong"];
$newEstablishment->description = $_POST["description"];
$newEstablishment->selfCatering = $_POST["selfCatering"];
$newEstablishment->establishmentID = $_POST["establishmentID"];

//Loops trough and sees if any establishment with requested id to edit.
$establishmentsList = file_get_contents('establishments.json');
$jsonInput = json_decode($establishmentsList, true);
for ($i = 0; $i < sizeof($jsonInput); $i++) {
    if ($jsonInput[$i]["establishmentID"] == $_POST["establishmentID"]) {
        $jsonInput[$i] = $newEstablishment;
        break;
    }
}

//Writes array to JSON file
$jsonData = json_encode($jsonInput);
file_put_contents('establishments.json', $jsonData);
?>
