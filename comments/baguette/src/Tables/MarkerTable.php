<?php

namespace Tables;

use Database;
use Models\MarkerModel;


class MarkerTable
{
    public static function getAllMarkers() {

        $markers = array();
        foreach(Database::fetchAll("SELECT m.mid, m.name, m.d_start, m.d_end, m.position, m.description, c.name as category, m.visible FROM marker as m, category as c where m.category=c.cid") as $marker)
        {
            $pos=unserialize($marker["position"]);
            $tmp = new MarkerModel($marker["mid"], $marker["name"], $marker["d_start"],$marker["d_end"] , $pos, $marker["description"],$marker["category"],$marker["visible"]);
            $markers[]=$tmp->toArray();
        }
        return $markers;
    }
    /*
        public static function getMarker($id) {
            $hunt = Database::fetchOne("SELECT id, name, qr_code, clue1, clue2, clue3, comments, puzzle_id FROM hunts WHERE id=".$id);
            return (new MarkerModel($hunt["id"], $hunt["name"], $hunt["qrcode"], array($hunt["clue1"], $hunt["clue2"], $hunt["clue3"]), $hunt["comments"], PuzzlesTable::getPuzzle($hunt["puzzle_id"])))->toArray();
        }

    */
    public static function addMarker(MarkerModel $mark)
    {
        $result = Database::execInser("INSERT INTO marker(name, d_start, d_end, position, description, category, visible) select '".$mark->getName()."','".$mark->getDStart()."','".$mark->getDEnd()."','".$mark->getPosition()."','".$mark->getDescription()."',c.cid,".$mark->getVisible()." from category as c where c.name='".$mark->getCategory()."'");

        if(strlen($result) > 0){
            return $result;
        }
        else{
            return false;
        }

        //return array("error" => "Not Implemented yet");
    }

    public static function updateMarker(MarkerModel $marker)
    {
        $result = Database::exec("UPDATE marker SET name='".$marker->getName()."', d_start='".$marker->getDStart()."', d_end='".$marker->getDEnd()."', description='".$marker->getDescription()."', category=(select c.cid from category as c where c.name='".$marker->getCategory()."'), visible='".$marker->getVisible()."' where mid='".$marker->getId()."';");
        return strlen($result) > 0;
        //return array("error" => "Not Implemented yet");
    }
	//Modification by DECANTER Maxence, disable the right of change the position of markers
    //, position='".$marker->getPosition()."'
	
    public static function deleteMarker($id)
    {
        $result = Database::exec("DELETE FROM marker WHERE mid=".$id);
        return strlen($result) > 0;
        //return array("error" => "Not Implemented yet");
    }

}
