<?php
    header('Access-Control-Allow-Origin: *');
    $userList = file_get_contents('users.json');
    header('Content-Type: application/json');
    echo ($userList);
?>