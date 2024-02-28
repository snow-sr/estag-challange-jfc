<?php

require_once("../index.php");
require_once("../services/productServices.php");

class OrderItem extends Product
{
    public function createOrderItem(PDO $db, String $items)
    {
        $decoded = json_decode($items, true);
        foreach ($decoded as $item) {
            $createQuery = $db->prepare("insert into order_item (code, order_code, product_code, amount, price, tax)
            values ({$item['code']}, {$item['order_code']}, {$item['product_code']}, {$item['amount']}, {$item['price']}, {$item['tax']})");
            $createQuery->execute();


            Product::updateProduct($db, $item['amount'], $item['product_code']);
        }
        return "Created item(s) with success";
    }

    public static function deleteOrderItem(PDO $db, Int $id)
    {
        $deleteQuery = $db->prepare("delete from order_item where code={$id}");
        $deleteQuery->execute();
        return "Deleted order_item with id: {$id}, with success";
    }

    public static function readAllOrderItemsFromOrder(PDO $db, Int $orderCode)
    {
        $readAllOrderItems = $db->query("SELECT * FROM order_item WHERE order_code={$orderCode}");
        $data = $readAllOrderItems->fetchAll(PDO::FETCH_ASSOC);
        return $data;
    }
}

// function createOrderItems(String $items)
// {
//     // @param Items items will be the array of object
//     $decoded = json_decode($items, true);
//     print_r($decoded);
//     foreach ($decoded as $item) {
//         $createQuery = myPDO->prepare("insert into order_item (code, order_code, product_code, amount, price, tax)
//          values ({$item['code']}, {$item['order_code']}, {$item['product_code']}, {$item['amount']}, {$item['price']}, {$item['tax']})");
//         $createQuery->execute();

//         updateProductStock($item['amount'], $item['product_code']);
//     }

//     return "Created item(s) with success";
// };

// function deleteOrderItem(Int $id)
// {
//     $deleteQuery = myPDO->prepare("delete from order_item where code={$id}");
//     $deleteQuery->execute();

//     return "Deleted order_item with id: {$id}, with success";
// };

// function readAllOrderItemsFromOrder(Int $orderCode)
// {
//     // Procurar pelo order associado
//     $readAllOrderItems = myPDO->query("SELECT * FROM order_item WHERE order_code={$orderCode}");
//     $data = $readAllOrderItems->fetchAll(PDO::FETCH_ASSOC);
//     return $data;
// }
