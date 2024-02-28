<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE');
header("Access-Control-Allow-Headers: X-Requested-With");
require_once "../index.php";
require_once "../services/categoriesServices.php";

$db = DatabaseConnection::getInstance();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = filter_var($_POST["name"], FILTER_SANITIZE_SPECIAL_CHARS);
    $tax = $_POST["tax"];
    $code = filter_var($_POST["code"], FILTER_SANITIZE_NUMBER_INT);

    $result = Category::createCategory($db, $name, $tax, $code);
    echo $result;
};

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $data = Category::readCategories($db);
    echo json_encode($data);
}

if ($_SERVER['REQUEST_METHOD'] == "DELETE") {
    $toBeDeleted = $_GET['id'];
    $data = Category::deleteCategory($db, $toBeDeleted);
    echo "Apagado com sucesso, {$data}";
};
