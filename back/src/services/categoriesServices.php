<?php

include '../index.php';

function createCategory(String $name, Float $tax, Int $code) {
    $createQuery = myPDO->prepare("insert into categories (name, tax, code) values ('{$name}',{$tax}, {$code})");
    $createQuery->execute();

    return "created with success";
};

function deleteCategory(Int $id){
    $deleteQuery = myPDO->prepare("delete from categories where code={$id}");
    $deleteQuery->execute();

    return "Deleted category with id: {$id}, with success";
};

function readCategories(){
    $readAllCategories = myPDO->query("SELECT * FROM categories");
    $data = $readAllCategories->fetchAll(PDO::FETCH_ASSOC);
    return $data;
}
