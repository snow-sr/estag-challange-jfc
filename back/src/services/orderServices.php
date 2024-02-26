<?php

include '../index.php';

function createOrder(Float $total, Float $tax, Int $code)
{
    $createQuery = myPDO->prepare("insert into orders (total, tax, code) values ('{$total}',{$tax}, {$code})");
    $createQuery->execute();

    return "created with success";
};

function deleteOrder(Int $id)
{
    $deleteQuery = myPDO->prepare("delete from orders where code={$id}");
    $deleteQuery->execute();

    return "Deleted orders with id: {$id}, with success";
};

function readAllOrders()
{
    $readAllOrders = myPDO->query("SELECT * FROM orders");
    $data = $readAllOrders->fetchAll(PDO::FETCH_ASSOC);
    return $data;
}

function readSpecificOrder(int $code)
{
    $query = myPDO->query("SELECT orders.code as code, orders.total as orders_total, orders.tax as order_tax,
    p.name as product_name, p.price as product_price, 
    p.amount as product_amount, oi.price as order_item_price, 
    oi.amount as order_item_amount FROM orders 
    JOIN order_item oi ON orders.code = oi.order_code 
    JOIN products p ON oi.product_code = p.code
    where orders.code = {$code}");
    $data = $query->fetchAll();

    return $data;
};
