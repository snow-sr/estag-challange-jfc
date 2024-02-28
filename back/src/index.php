
<?php
class DatabaseConnection
{

    private static $instance = null;

    private function __construct()
    {
    } // Construtor privado para evitar instanciação direta

    public static function getInstance()
    {
        if (self::$instance === null) {
            self::$instance = new PDO("pgsql:host=pgsql_desafio;dbname=applicationphp", "root", "root");
            self::$instance->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        }
        return self::$instance;
    }
}
