<?php

class Database
{

    public static function getConnection()
    {
        if (!isset($connection))
        {
            $connection = new PDO(
                'mysql:host=localhost;
                dbname=geoguillaume;
                charset=utf8mb4',
                'root',
                ''
            );
            $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }
        return $connection;
    }
    
    public static function fetchAll($sql,$params)
    {
        $db = Database::getConnection();
        $stmt = $db->query($sql);
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $rows;

    }
    
    public static function fetchOne($sql,$params)
    {
        $db = Database::getConnection();
        $stmt = $db->query($sql);
        $tmp=$stmt->fetchAll(PDO::FETCH_ASSOC);
        $row = $tmp[0];
        return $row;
    }
    
    public static function execInser($sql,$params)
    {
        $db = Database::getConnection();
        $db->exec($sql);
        return $db->lastInsertId();
    }

    public static function exec($sql)
    {
        $db = Database::getConnection();
        $affected = $db->exec($sql);
        return $affected;
    }
}
