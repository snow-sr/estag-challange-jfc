<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
include "../services/orderItemServices.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    echo "Criar order item <br/>";

    $items = $_POST['items'];
    print_r($items);

    $result = createOrderItems($items);

    echo $result;
};

if ($_SERVER['REQUEST_METHOD'] === "GET") {
    echo "Buscar item <br />";

    if (empty($_GET["order_code"])) {
        echo "Negativo senhor, vc nao pode ver todos os itens";
        return "...";
    };

    $orderCode = $_GET['order_code'];
    $result = readAllOrderItemsFromOrder($orderCode);

    print_r($result);
}

if ($_SERVER['REQUEST_METHOD'] === "DELETE") {
    echo "Deletar item <br />";

    $toBeDeleted = $_GET['id'];

    $result = deleteOrderItem($toBeDeleted);

    return $result;
}
