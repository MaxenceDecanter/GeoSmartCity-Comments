<?php
namespace Pages;

use Models\MarkerModel;
use Tables\MarkerTable;


class Marker extends Page

{
    public function GET($parameters)
    {
        return MarkerTable::getAllMarkers();
    }

    public function POST($parameters)
    {

        if (!empty($parameters)) {
            if ($this->isJSON($parameters["position"])) {
                $pos = serialize(json_decode($parameters["position"]));
                return MarkerTable::addMarker(new MarkerModel(null, $parameters["name"], $parameters["d_start"], $parameters["d_end"], $pos, $parameters["description"], $parameters["category"], $parameters["visible"]));
            }
            else{
                return array("error" => "Position is not JSON",$parameters["position"]);
            }
        }
        else {
            return array("error" => "Invalid parameters", "parameters");
        }
    }

    public function PUT($parameters)
    {
        if (!empty($parameters)) {
				$pos = serialize(json_decode($parameters["position"]));
				return MarkerTable::updateMarker(new MarkerModel($parameters["id"], $parameters["name"], $parameters["d_start"], $parameters["d_end"], $pos, $parameters["description"], $parameters["category"], $parameters["visible"]));
        }
        return array("error" => "Invalid parameters");
    }

    public function DELETE($parameters)
    {
        if (!empty($parameters) && isset($parameters["id"])) {
            return MarkerTable::deleteMarker($parameters["id"]);
        } else {
            return array("error" => "Invalid parameters");
        }
    }

    public function OTHER()
    {
        return array("error" => "Incorrect method");
    }

    public function isJSON($string){
        if(is_array(json_decode($string, true)) && (json_last_error() == JSON_ERROR_NONE)) {
            return true;
        }
        else{
            return false;
        }
    }
}
