<?php
namespace Pages;

abstract class Page
{

    public abstract function GET($parameters);

    public abstract function POST($parameters);

    public abstract function PUT($parameters);

    public abstract function DELETE($parameters);

    public abstract function OTHER();

}