<?php
namespace Models;

class MarkerModel extends AbstractModel
{

    private $name;
    private $d_start;
    private $d_end;
    private $position;
    private $description;
    private $category;
    private $visible;

    public function __construct($id, $name, $d_start, $d_end, $position,$description,$category,$visible)
    {
        parent::__construct($id);
        $this->name = $name;
        $this->d_start = $d_start;
        $this->d_end = $d_end;
        $this->position = $position;
        $this->description = $description;
        $this->category = $category;
        $this->visible = $visible;

    }

    public function getName()
    {
        return $this->name;
    }

    public function setName($name)
    {
        $this->name = $name;
    }

    public function getDStart()
    {
        return $this->d_start;
    }

    public function setDStart($d_start)
    {
        $this->d_start = $d_start;
    }

    /**
     * @return mixed
     */
    public function getDEnd()
    {
        return $this->d_end;
    }

    /**
     * @param mixed $d_end
     */
    public function setDEnd($d_end)
    {
        $this->d_end = $d_end;
    }

    /**
     * @return mixed
     */
    public function getPosition()
    {
        return $this->position;
    }

    /**
     * @param mixed $position
     */
    public function setPosition($position)
    {
        $this->position = $position;
    }

    /**
     * @return mixed
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @param mixed $description
     */
    public function setDescription($description)
    {
        $this->description = $description;
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

    /**
     * @return mixed
     */
    public function getVisible()
    {
        return $this->visible;
    }

    /**
     * @param mixed $visible
     */
    public function setVisible($visible)
    {
        $this->visible = $visible;
    }

    public function toArray() {
        return array(
            "id" => $this->id,
            "name" => $this->name,
            "d_start" => $this->d_start,
            "d_end" =>$this->d_end,
            "position" =>$this->position,
            "description" =>$this->description,
            "category" => $this->category,
            "visible" =>  $this->visible
        );
    }

}