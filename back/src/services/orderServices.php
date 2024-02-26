<?php

include '../index.php';

function createOrder(Float $total, Float $tax, Int $code) {
    $createQuery = myPDO->prepare("insert into orders (total, tax, code) values ('{$total}',{$tax}, {$code})");
    $createQuery->execute();

    return "created with success";
};

function deleteOrder(Int $id){
    $deleteQuery = myPDO->prepare("delete from orders where code={$id}");
    $deleteQuery->execute();

    return "Deleted orders with id: {$id}, with success";
};

function readAllOrders(){
    $readAllOrders = myPDO->query("SELECT * FROM orders");
    $data = $readAllOrders->fetchAll(PDO::FETCH_ASSOC);
    return $data;
}
