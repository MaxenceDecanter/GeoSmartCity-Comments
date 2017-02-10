<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Access-Control-Allow-Origin: http://amanda.dc.turkuamk.fi');
error_reporting(E_ERROR | E_PARSE);

require_once __DIR__."/vendor/autoload.php";
$method = $_SERVER["REQUEST_METHOD"];
use Pages\Marker;

$mark=new Marker();

switch($method) {
    case "GET":
        echo json_encode($mark->GET($_GET));
        break;

    case "POST":
        echo json_encode($mark->POST($_POST));
        break;

    case "PUT":
        parse_str(file_get_contents("php://input"), $parameters);
        echo json_encode($mark->PUT($parameters));
        break;

    case "DELETE":
        parse_str(file_get_contents("php://input"), $parameters);
        echo json_encode($mark->DELETE($parameters));
        break;

    default:
        echo json_encode($mark->OTHER());
}