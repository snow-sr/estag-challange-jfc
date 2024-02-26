<?php

include '../index.php';

function createProduct(String $name, Float $price, Int $category, Int $code, Int $amount)
{
    $createQuery = myPDO->prepare("insert into products (name, price, category_code, code, amount) values ('{$name}',{$price}, {$category}, {$code}, {$amount})");
    $createQuery->execute();

    return "created with success";
};

function deleteProduct(Int $id)
{
    $deleteQuery = myPDO->prepare("delete from products where code={$id}");
    $deleteQuery->execute();

    return "Deleted product with id: {$id}, with success";
};

function readAllProducts()
{
    $readAllProducts = myPDO->query("SELECT
            products.code,
            products.name,
            products.price,
            products.amount,
            categories.tax,
            categories.name as category_name
            from
                products
            JOIN
                categories 
            ON
            products.category_code = categories.code");
    $data = $readAllProducts->fetchAll(PDO::FETCH_ASSOC);
    return $data;
};

function updateProductStock(Int $newStock, Int $codeProduct)
{
    // ? calculo no front ou no back? Por enquanto, frontend.
    $queryStock = myPDO->query("UPDATE product SET amount = {$newStock} WHERE code={$codeProduct}");
    $queryStock->execute();

    return "Updated stock";
}
