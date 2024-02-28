<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE');
header("Access-Control-Allow-Headers: X-Requested-With");
require_once "../index.php";
require_once "../services/productServices.php";

$db = DatabaseConnection::getInstance();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    echo "Criar Produto  <br/>";

    $name = filter_var($_POST["name"], FILTER_SANITIZE_SPECIAL_CHARS);
    $categoryCode = filter_var($_POST["category_code"], FILTER_SANITIZE_SPECIAL_CHARS);
    $price = $_POST["price"];
    $code = filter_var($_POST["code"], FILTER_SANITIZE_NUMBER_INT);
    $amount = filter_var($_POST["amount"], FILTER_SANITIZE_NUMBER_INT);

    $data = Product::createProduct($db, $name, $price, $categoryCode, $code, $amount);

    echo $data;
};

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $data = array_values(Product::readAllProducts($db));
    echo json_encode($data);
};

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $toBeDeleted = $_GET['id'];
    $data = Product::deleteProduct($db, $toBeDeleted);

    echo $data;
};
