<?php
namespace Pages;

use Models\ReportModel;
use Tables\ReportTable;


class Report extends Page

{
    public function GET($parameters)
    {
        return ReportTable::getAllReports();
    }

    public function POST($parameters)
    {

        if (!empty($parameters)) {
            if (isset($parameters["marker_id"])) {
                return ReportTable::addReport(new ReportModel(null, $parameters["marker_id"], $parameters["comment"],null,null,null));
                //$id, $marker_id,$comment,$marker_name,$marker_description,$category
            }
            else{
                return array("error" => "Missing Marker Id",$parameters["marker_id"]);
            }
        }
        else {
            return array("error" => "Invalid parameters", "parameters");
        }
    }

    public function PUT($parameters)
    {
        if (!empty($parameters)) {
            return ReportTable::updateReport(new ReportModel($parameters["id"], $parameters["marker_id"], $parameters["comment"],null,null,null));
        }
        return array("error" => "Invalid parameters");
    }

    public function DELETE($parameters)
    {
        if (!empty($parameters) && isset($parameters["id"])) {
            return ReportTable::deleteReport($parameters["id"]);
        } else {
            return array("error" => "Invalid parameters");
        }
    }

    public function OTHER()
    {
        return array("error" => "Incorrect method");
    }
}
