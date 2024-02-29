<?php

require_once '../index.php';

class Order
{
    public static function createOrder(PDO $db, Float $total, Float $tax, Int $code, Int $userCode)
    {
        $createQuery = $db->prepare("insert into orders (total, tax, code, user_code) values ('{$total}',{$tax}, {$code}, {$userCode})");
        $createQuery->execute();

        return json_encode(array("msg" => "created with success", "status" => "ok", "code" => $code));
    }

    public static function deleteOrder(PDO $db, Int $id)
    {
        $deleteQuery = $db->prepare("delete from orders where code={$id}");
        $deleteQuery->execute();

        return "Deleted orders with id: {$id}, with success";
    }

    public static function readAllOrders(PDO $db)
    {
        $readAllOrders = $db->query("SELECT * FROM orders");
        $data = $readAllOrders->fetchAll(PDO::FETCH_ASSOC);
        return $data;
    }

    public static function readSpecificOrder(PDO $db, Int $id)
    {
        $query = $db->query("SELECT orders.code as code, orders.total as orders_total, orders.tax as order_tax,
        p.name as product_name, p.price as product_price, 
        p.amount as product_amount, oi.price as order_item_price, 
        oi.amount as order_item_amount FROM orders 
        JOIN order_item oi ON orders.code = oi.order_code 
        JOIN products p ON oi.product_code = p.code
        where orders.code = {$id}");

        $data = $query->fetchAll();
        return $data;
    }
}

// function createOrder(Float $total, Float $tax, Int $code)
// {
//     $createQuery = myPDO->prepare("insert into orders (total, tax, code) values ('{$total}',{$tax}, {$code})");
//     $createQuery->execute();

//     return json_encode(array("msg" => "created with success", "status" => "ok", "code" => $code));
// };

// function deleteOrder(Int $id)
// {
//     $deleteQuery = myPDO->prepare("delete from orders where code={$id}");
//     $deleteQuery->execute();

//     return "Deleted orders with id: {$id}, with success";
// };

// function readAllOrders()
// {
//     $readAllOrders = myPDO->query("SELECT * FROM orders");
//     $data = $readAllOrders->fetchAll(PDO::FETCH_ASSOC);
//     return $data;
// }

// function readSpecificOrder(int $code)
// {
//     $query = myPDO->query("SELECT orders.code as code, orders.total as orders_total, orders.tax as order_tax,
//     p.name as product_name, p.price as product_price, 
//     p.amount as product_amount, oi.price as order_item_price, 
//     oi.amount as order_item_amount FROM orders 
//     JOIN order_item oi ON orders.code = oi.order_code 
//     JOIN products p ON oi.product_code = p.code
//     where orders.code = {$code}");
//     $data = $query->fetchAll();

//     return $data;
// };
