<?php

include "../index.php";


function createOrderItems(String $items) {
    // @param Items items will be the array of object
    $decoded = json_decode($items, true);

    foreach ($decoded as $item) {
        $createQuery = myPDO->prepare("insert into order_item (code, order_code, product_code, amount, price, tax)
         values ({$item['code']}, {$item['order_code']}, {$item['product_code']}, {$item['amount']}, {$item['price']}, {$item['tax']})");
        $createQuery->execute();
    }

    return "Created item(s) with success";

};

function deleteOrderItem(Int $id){
    $deleteQuery = myPDO->prepare("delete from order_item where code={$id}");
    $deleteQuery->execute();

    return "Deleted order_item with id: {$id}, with success";
};

function readAllOrderItemsFromOrder(Int $orderCode){
    // Procurar pelo order associado
    $readAllOrderItems = myPDO->query("SELECT * FROM order_item WHERE order_code={$orderCode}");
    $data = $readAllOrderItems->fetchAll(PDO::FETCH_ASSOC);
    return $data;
}
