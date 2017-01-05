<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8"/>
		<title>GeosmartCity Comments</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
		<link rel="stylesheet" href="leaflet.css"/>
        <!--Loading bootstrap.css-->
        <link rel="stylesheet" href="doc/styles/bootstrap.css">
		<!-- Loading JQuery -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>

        <!-- Load Leaflet from CDN-->
        <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet/v1.0.0-rc.1/leaflet.css" />
        <script src="http://cdn.leafletjs.com/leaflet/v1.0.0-rc.1/leaflet.js"></script>
		<!-- Load Google Geocoder-->
		<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?sensor=false&key=AIzaSyBXIxKmHz3QFTynyL8AMUBqQNxgS2sy8d8"></script>
		
	</head>
	<body>
<!--    language btns-->
			<button class="btn btn-block" id="FI">FI</button>
			<button class="btn btn-block" id="EN">EN</button>
		
		<div id="preview-comment"></div>
        <!--Include the modify page here-->
        <?php include_once ('modify.php')?>
<div id="mapid"></div>
<div class="col-sm-12" id="comment-page">
    <div class="col-sm-12 comment-header">
        <!--info-->
        <div id="information">
            <a href="http://geosmartcity.dc.turkuamk.fi/?page=home&lang=en">
                <img src="images/infoicon.png" id="infoPic">
            </a>
        </div>
        <!--Logo Title-->
        <div id="page-name">Southwest Finland Routing</div>
        <!--comment-->
        <div id="routing">
            <!--Add routing page link here-->
            <a href="#">
                <span id="commentPic"><strong>R</strong></span>
            </a>
        </div>
    </div>
    <ul class="col-sm-12" id="modeList">
        <li class="col-sm-3 icon" id="event">
            <img data-toggle="tooltip" title="Event" data-toggle="tooltip" data-placement="top" href="javascript:void(0)"  src="images/event.png" alt="/" onclick="selectIcon(event, 'mode-event','event');" onmouseover="tootips()">
        </li>
        <li class="col-sm-3 icon" id="info" >
            <img data-toggle="tooltip" title="Information" data-toggle="tooltip" data-placement="top" href="javascript:void(0)" src="images/info.png" alt="/" onclick="selectIcon(event, 'mode-info','information');" onmouseover="tootips()">
        </li>
        <li class="col-sm-3 icon" id="other">
            <img data-toggle="tooltip" title="Other" data-toggle="tooltip" data-placement="top" href="javascript:void(0)" src="images/other.png" alt="/" onclick="selectIcon(event, 'mode-other','other')" onmouseover="tootips()">
        </li>

        <li class="col-sm-3 icon" id="problem">
            <img data-toggle="tooltip" title="Problem" data-toggle="tooltip" data-placement="top" href="javascript:void(0)" src="images/problem.png" alt="/" onclick="selectIcon(event, 'mode-problem','problem')" onmouseover="tootips()">
        </li>
        <li class="col-sm-2" id="viewAll" data-toggle="tooltip" title="Problem" data-toggle="tooltip" data-placement="top" href="javascript:void(0)" alt="/" onclick="selectIcon(event, 'mode-viewAll','/')" onmouseover="tootips()">
            <div><span>V</span></div>
        </li>
    </ul>
    <!--            address bar-->
    <div class="col-sm-12">
        <input type="text" class="form-control" id="addr" placeholder="Address.." onKeyPress="if(event.keyCode == 13) addr_search();">
    </div>

    <!--Event mode-->
    <div id="mode-event" class="iconContent">
        <input type="text" class="form-control" id="title" placeholder="Title..">
        <textarea name="commentsForInfoMode" cols="30" rows="5" class="form-control" placeholder="Comments.."></textarea>
        <button class="btn btn-default" style="width: 45%" onclick="multipleCloseEventDateFuncs()">Now</button>
        <button class="btn btn-default" style="width: 45%; float: right" onclick="openEventDate()">Choose Date</button>
        <!--choose time tab-->
        <div class="col-sm-12 date-tab" id="event-date">
            <input type="date" class="form-control">
            <div class="col-sm-6">
                <h5 class="text-center">Start Time</h5>
                <input type="time" class="form-control">
            </div>
            <div class="col-sm-6">
                <h5 class="text-center">End Time</h5>
                <input type="time" class="form-control">
            </div>
        </div>
        <!--Save & previous & cancel button set-->
        <div class="col-sm-12">
            <div class="col-sm-6">
                <button class="btn btn-default" style="width: 100%" onclick="validateComment(true);">Save</button>
            </div>
            <div class="col-sm-6">
                <button class="btn btn-default" style="width: 100%" onclick="CbtnEvent();">Cancel</button>
            </div>
        </div>
    </div>

    <!--Information mode-->
    <div id="mode-info" class="iconContent">
        <input type="text" class="form-control" name="title" placeholder="Title..">
        <textarea name="commentsForInfoMode" cols="30" rows="5" class="form-control" placeholder="Comments.."></textarea>
        <button class="btn btn-default" style="width: 45%" onclick="multipleCloseInfoDateFuncs();">Now</button>
        <button class="btn btn-default opentimeTab" style="width: 45%; float: right" onclick="openInfoDate();">Choose Date</button>
        <!--choose time tab-->
        <div class="col-sm-12 date-tab" id="info-date">
            <input type="date" class="form-control" name="date">
            <div class="col-sm-6">
                <h5 class="text-center">Start Time</h5>
                <input type="time" class="form-control" name="start_time">
            </div>
            <div class="col-sm-6">
                <h5 class="text-center">End Time</h5>
                <input type="time" class="form-control" name="end_time">
            </div>
        </div>
        <!--Save & previous & cancel button set-->
        <div class="col-sm-12">
            <div class="col-sm-6">
                <button class="btn btn-default" style="width: 100%" onclick="validateComment(true);">Save</button>
            </div>
            <div class="col-sm-6">
                <button class="btn btn-default" style="width: 100%" onclick="CbtnInfo();">Cancel</button>
            </div>
        </div>
    </div>

    <!--Other mode-->
    <div id="mode-other" class="iconContent">
        <div class="col-sm-12">
            <input type="text" class="form-control" placeholder="Type title here..">
        </div>
        <textarea name="commentsForInfoMode" cols="30" rows="5" class="form-control" placeholder="Comments.."></textarea>
        <!--Save & previous & cancel button set-->
        <button class="btn btn-default" style="width: 45%" onclick="validateComment(true);">Save</button>
        <button class="btn btn-default" style="width: 45%; float: right" onclick="CbtnOther();">Cancel</button>
    </div>

    <!--Problem mode-->
    <div id="mode-problem" class="iconContent">
        <input type="text" class="form-control" id="title" placeholder="Title..">
        <textarea name="commentsForInfoMode" cols="30" rows="5" class="form-control" placeholder="Comments.."></textarea>
        <button class="btn btn-default" style="width: 45%" onclick="multipleCloseProblemDateFuncs();">Now</button>
        <button class="btn btn-default" style="width: 45%; float: right" onclick="openProblemDate();">Choose Date</button>
        <!--choose date tab-->
        <div class="col-sm-12 date-tab" id="problem-date">
            <input type="date" class="form-control">
            <div class="col-sm-6">
                <h5 class="text-center">Start Time</h5>
                <input type="time" class="form-control">
            </div>
            <div class="col-sm-6">
                <h5 class="text-center">End Time</h5>
                <input type="time" class="form-control">
            </div>
        </div>
        <!--Save & previous & cancel button set-->
        <div class="col-sm-12">
            <div class="col-sm-6">
                <button class="btn btn-default" style="width: 100%" onclick="validateComment(true);">Save</button>
            </div>
            <div class="col-sm-6">
                <button class="btn btn-default" style="width: 100%" onclick="CbtnProblem();">Cancel</button>
            </div>
        </div>
    </div>

</div>
<!-- Loading local js -->
			<script src="leaflet.js"></script>
        <!--Loading bootstrap js-->
        <script src="doc/scripts/bootstrap.js"></script>
	</body>
</html>