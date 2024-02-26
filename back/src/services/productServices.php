<?php

include '../index.php';

function createProduct(String $name, Float $price, Int $category, Int $code, Int $amount) {
    $createQuery = myPDO->prepare("insert into products (name, price, category_code, code, amount) values ('{$name}',{$price}, {$category}, {$code}, {$amount})");
    $createQuery->execute();

    return "created with success";
};

function deleteProduct(Int $id){
    $deleteQuery = myPDO->prepare("delete from products where code={$id}");
    $deleteQuery->execute();

    return "Deleted product with id: {$id}, with success";
};

function readAllProducts(){
    $readAllProducts = myPDO->query("SELECT * FROM products");
    $data = $readAllProducts->fetchAll(PDO::FETCH_ASSOC);
    return $data;
};

function updateProductStock(Int $newStock, Int $codeProduct) {
    $newAmmount = 10; //fazer calculo dps
    $queryStock = myPDO->query("UPDATE product SET amount = {$newAmmount} WHERE code={$codeProduct}");
    $queryStock->execute();

    return "Updated stock";
}