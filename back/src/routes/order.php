<?php

include "../services/orderServices.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    echo "Criar order <br/>";

    $total = filter_var($_POST["total"], FILTER_SANITIZE_NUMBER_FLOAT);
    $tax = filter_var($_POST["tax"], FILTER_SANITIZE_NUMBER_FLOAT);
    $code = filter_var($_POST["code"], FILTER_SANITIZE_NUMBER_INT);

    $result = createOrder($total, $tax, $code);
    echo $result;
};

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $data = readAllOrders();
    echo json_encode($data);
}

if($_SERVER['REQUEST_METHOD'] == "DELETE") {
    $toBeDeleted = $_GET['id'];
    $data = deleteOrder($toBeDeleted);
    echo "Apagado com sucesso, {$data}";
};



echo "<br>Categorias<br>";