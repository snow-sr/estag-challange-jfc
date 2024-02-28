<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

require_once "../services/orderItemServices.php";
require_once "../index.php";

$db = DatabaseConnection::getInstance();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    echo "Criar order item <br/>";

    $items = $_POST['items'];
    print_r($items);

    $OrderItem = new OrderItem();
    $result = $OrderItem->createOrderItem($db, $items);

    echo $result;
};

if ($_SERVER['REQUEST_METHOD'] === "GET") {
    echo "Buscar item <br />";

    if (empty($_GET["order_code"])) {
        echo "Negativo senhor, vc nao pode ver todos os itens";
        return "...";
    };

    $orderCode = $_GET['order_code'];
    $result = OrderItem::readAllOrderItemsFromOrder($db, $orderCode);

    print_r($result);
}

if ($_SERVER['REQUEST_METHOD'] === "DELETE") {
    echo "Deletar item <br />";

    $toBeDeleted = $_GET['id'];

    $result = OrderItem::deleteOrderItem($db, $toBeDeleted);

    return $result;
}
