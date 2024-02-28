<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

require_once "../services/orderServices.php";
require_once "../index.php";

$db = DatabaseConnection::getInstance();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $total = $_POST["total"];
    $tax = $_POST["tax"];
    $code = filter_var($_POST["code"], FILTER_SANITIZE_NUMBER_INT);

    $result = Order::createOrder($db, $total, $tax, $code);
    echo json_encode($result);
};

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (empty($_GET['code'])) {
        $data = Order::readAllOrders($db);
        echo json_encode($data);
        return;
    };

    $search = filter_var($_GET['code'], FILTER_SANITIZE_NUMBER_INT);
    $result = Order::readSpecificOrder($db, $search);
    echo json_encode($result);
}

if ($_SERVER['REQUEST_METHOD'] == "DELETE") {
    $toBeDeleted = $_GET['id'];
    $data = Order::deleteOrder($db, $toBeDeleted);
    echo "Apagado com sucesso, {$data}";
};
