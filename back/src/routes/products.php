<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE');
header("Access-Control-Allow-Headers: X-Requested-With");
include "../services/productServices.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    echo "Criar Produto  <br/>";

    $name = filter_var($_POST["name"], FILTER_SANITIZE_SPECIAL_CHARS);
    $categoryCode = filter_var($_POST["category_code"], FILTER_SANITIZE_SPECIAL_CHARS);
    $price = filter_var($_POST["price"], FILTER_SANITIZE_NUMBER_FLOAT);
    $code = filter_var($_POST["code"], FILTER_SANITIZE_NUMBER_INT);
    $amount = filter_var($_POST["amount"], FILTER_SANITIZE_NUMBER_INT);

    $data = createProduct($name, $price, $categoryCode, $code, $amount);

    echo $data;
};

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $data = array_values(readAllProducts());
    echo json_encode($data);
};

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $toBeDeleted = $_GET['id'];
    $data = deleteProduct($toBeDeleted);

    echo $data;
};
