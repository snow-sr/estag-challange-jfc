<?php

class User
{
    public static function createUser(PDO $db, String $username, String $pass)
    {
        $exists = $db->query("select * from users where username='$username'");
        $data = $exists->fetch();

        if ($data) {
            return json_encode(array("msg" => "There is already a user with this username", "status" => "error"));
        } else {
            $crypto = password_hash($pass, PASSWORD_BCRYPT);
            $query = $db->prepare("insert into users (username, pass) values (:username, :pass)");
            $query->bindParam(":username", $username);
            $query->bindParam(":pass", $crypto);
            $query->execute();
            return json_encode(array("msg" => "register Succeded", "status" => "ok"));
        }
    }

    public static function login(PDO $db, String $username, String $pass)
    {
        $query = $db->query("select * from users where users.username = '$username'");
        $data = $query->fetch();
        if (password_verify($pass, $data['pass'])) {
            return json_encode(array("msg" => "login Succeded", "status" => "ok", "profile" => $data));
        } else {
            return json_encode(array("msg" => "password or username wrong", "status" => "error"));
        }
    }
}
