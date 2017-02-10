<?php

namespace Tables;

use Database;
use Models\ReportModel;


class ReportTable
{
    public static function getAllReports() {

        $reports = array();
        foreach(Database::fetchAll("SELECT r.rid,m.mid,r.comment as report_comment,m.name,m.description,c.name as category FROM report as r, marker as m, category as c WHERE r.marker_id=m.mid and m.category=c.cid") as $report)
        {
            $tmp = new ReportModel($report["rid"],$report["mid"],$report["report_comment"],$report["name"],$report["description"],$report["category"]);
            $reports[]=$tmp->toArray();
        }
        return $reports;
    }
    /*
        public static function getMarker($id) {
            $hunt = Database::fetchOne("SELECT id, name, qr_code, clue1, clue2, clue3, comments, puzzle_id FROM hunts WHERE id=".$id);
            return (new MarkerModel($hunt["id"], $hunt["name"], $hunt["qrcode"], array($hunt["clue1"], $hunt["clue2"], $hunt["clue3"]), $hunt["comments"], PuzzlesTable::getPuzzle($hunt["puzzle_id"])))->toArray();
        }

    */
    public static function addReport(ReportModel $report)
    {
        $result = Database::execInser("INSERT INTO report (marker_id,comment) VALUES(".$report->getMarkerId().",'".$report->getComment()."')");

        if(strlen($result) > 0){
            return $result;
        }
        else{
            return false;
        }
        //return array("error" => "Not Implemented yet");
    }

    public static function updateReport(ReportModel $report)
    {
        $result = Database::exec("UPDATE report SET comment='".$report->getComment()."', marker_id=".$report->getMarkerId()." where rid=".$report->getId());
        return strlen($result) > 0;
        //return array("error" => "Not Implemented yet");
    }

    public static function deleteReport($id)
    {
        $result = Database::exec("DELETE FROM report WHERE rid=".$id);
        return strlen($result) > 0;
        //return array("error" => "Not Implemented yet");
    }

}
