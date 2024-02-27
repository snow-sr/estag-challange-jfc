<?php

require_once('../index.php');

function createProduct(String $name, Float $price, Int $category, Int $code, Int $amount)
{
    $createQuery = myPDO->prepare("
    insert into products (name, price, category_code, code, amount)
    values ('{$name}',{$price}, {$category}, {$code}, {$amount})");
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
            categories.name as category_name,
            trunc((categories.tax / 100 * products.price), 2) as tax_value,
            trunc((categories.tax / 100 * products.price + products.price), 2) as products_without_tax
            from
                products
            JOIN
                categories 
            ON
            products.category_code = categories.code");
    $data = $readAllProducts->fetchAll(PDO::FETCH_ASSOC);
    return $data;
};

function getSingleProduct($id)
{
    $readProduct = myPDO->query("select * from products where products.code = {$id}");
    $data = $readProduct->fetch();

    return $data;
};

function updateProductStock(Int $newStock, Int $codeProduct)
{
    // ? calculo no front ou no back?

    $readProduct = getSingleProduct($codeProduct);
    $calc = $readProduct['amount'] - $newStock;
    $queryStock = myPDO->query("UPDATE products SET amount = {$calc} WHERE code={$codeProduct}");
    $queryStock->execute();

    return "Updated stock";
}
