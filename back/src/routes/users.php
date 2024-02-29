<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE');
header("Access-Control-Allow-Headers: X-Requested-With");
require_once "../index.php";
require_once "../services/usersService.php";

$db = DatabaseConnection::getInstance();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST["register"])) {
        $name = filter_var($_POST["username"], FILTER_SANITIZE_SPECIAL_CHARS);
        $pass = filter_var($_POST["pass"], FILTER_SANITIZE_SPECIAL_CHARS);

        $data = User::createUser($db, $name, $pass);

        echo $data;
    } else {

        $name = filter_var($_POST["username"], FILTER_SANITIZE_SPECIAL_CHARS);
        $pass = filter_var($_POST["pass"], FILTER_SANITIZE_SPECIAL_CHARS);

        $data = User::login($db, $name, $pass);

        echo $data;
    }
};
