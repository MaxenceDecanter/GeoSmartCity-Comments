<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__."/vendor/autoload.php";
$method = $_SERVER["REQUEST_METHOD"];
use Pages\Report;

$report=new Report();

switch($method) {
    case "GET":
        echo json_encode($report->GET($_GET));
        break;

    case "POST":
        echo json_encode($report->POST($_POST));
        break;

    case "PUT":
        parse_str(file_get_contents("php://input"), $parameters);
        echo json_encode($report->PUT($parameters));
        break;

    case "DELETE":
        parse_str(file_get_contents("php://input"), $parameters);
        echo json_encode($report->DELETE($parameters));
        break;

    default:
        echo json_encode($report->OTHER());
}