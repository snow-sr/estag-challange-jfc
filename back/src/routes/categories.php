<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE');
header("Access-Control-Allow-Headers: X-Requested-With");
include "../services/categoriesServices.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    echo "Criar categoria  <br/>";

    $name = filter_var($_POST["name"], FILTER_SANITIZE_SPECIAL_CHARS);
    $tax = filter_var($_POST["tax"], FILTER_SANITIZE_NUMBER_FLOAT);
    $code = filter_var($_POST["code"], FILTER_SANITIZE_NUMBER_INT);

    $result = createCategory($name, $tax, $code);
    echo $result;
};

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $data = readCategories();
    echo json_encode($data);
}

if ($_SERVER['REQUEST_METHOD'] == "DELETE") {
    $toBeDeleted = $_GET['id'];
    $data = deleteCategory($toBeDeleted);
    echo "Apagado com sucesso, {$data}";
};
