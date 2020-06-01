<?php
header('Access-Control-Allow-Origin: *');
// header('Content-Type: application/json');

$establishmentsList = file_get_contents('establishments.json');

$json = json_decode($establishmentsList);

if(!isset($_GET['establishmentID'])) {
    echo null;
    die();
}

$id = $_GET['establishmentID'];

foreach($json as $item) {
    if($item->establishmentID == $id)
    {
        echo json_encode($item);
    }
}

?>