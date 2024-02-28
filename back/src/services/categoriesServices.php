<?php

class Category
{
    public static function createCategory(PDO $db, String $name, Float $tax, Int $code)
    {
        $query = $db->prepare("insert into categories (name, tax, code) values (:name, :tax, :code)");
        $query->bindParam(":name", $name);
        $query->bindParam(":tax", $tax);
        $query->bindParam(":code", $code);
        $query->execute();
        return "created with success";
    }

    public static function deleteCategory(PDO $db, $id)
    {
        $query = $db->prepare("delete from categories where code=:id");
        $query->bindParam(":id", $id);
        $query->execute();
        return "Deleted category with id: {$id}, with success";
    }

    public static function readCategories(PDO $db)
    {
        $query = $db->query("SELECT * FROM categories");
        $data = $query->fetchAll(PDO::FETCH_ASSOC);
        return $data;
    }
}
