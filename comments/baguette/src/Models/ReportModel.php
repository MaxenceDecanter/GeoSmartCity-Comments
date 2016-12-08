<?php
namespace Models;

class ReportModel extends AbstractModel
{

    private $comment;
    private $marker_id;
    private $marker_name;
    private $marker_description;
    private $category;


    public function __construct($id, $marker_id,$comment,$marker_name,$marker_description,$category)
    {
        parent::__construct($id);
        $this->comment = $comment;
        $this->marker_id=$marker_id;
        $this->marker_name=$marker_name;
        $this->marker_description=$marker_description;
        $this->category=$category;

    }

    /**
     * @return mixed
     */
    public function getComment()
    {
        return $this->comment;
    }

    /**
     * @param mixed $comment
     */
    public function setComment($comment)
    {
        $this->comment = $comment;
    }

    /**
     * @return mixed
     */
    public function getMarkerId()
    {
        return $this->marker_id;
    }

    /**
     * @param mixed $comment
     */
    public function setMarkerId($mid)
    {
        $this->marker_id = $mid;
    }

    /**
     * @return mixed
     */
    public function getMarkerName()
    {
        return $this->marker_name;
    }

    /**
     * @param mixed $marker_name
     */
    public function setMarkerName($marker_name)
    {
        $this->marker_name = $marker_name;
    }

    /**
     * @return mixed
     */
    public function getMarkerDescription()
    {
        return $this->marker_description;
    }

    /**
     * @param mixed $marker_description
     */
    public function setMarkerDescription($marker_description)
    {
        $this->marker_description = $marker_description;
    }

    /**
     * @return mixed
     */
    public function getCategory()
    {
        return $this->category;
    }

    /**
     * @param mixed $category
     */
    public function setCategory($category)
    {
        $this->category = $category;
    }


    public function toArray() {
        return array(
            "id" => $this->id,
            "comment" => $this->comment,
            "marker_id" => $this->marker_id,
            "marker_name" => $this->marker_name,
            "marker_description" => $this->marker_description,
            "category" => $this->category
        );
    }

}