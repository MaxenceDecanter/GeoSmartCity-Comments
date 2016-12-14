<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8"/>
		<title>GeosmartCity Comments</title>
		<meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />
		<link rel="stylesheet" href="leaflet.css"/>
        <!--Loading bootstrap.css-->
        <link rel="stylesheet" href="doc/styles/bootstrap.css">
		<!-- Loading JQuery -->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
		 <!-- Load Leaflet from CDN-->
        <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet/v1.0.0-rc.1/leaflet.css" />
        <script src="http://cdn.leafletjs.com/leaflet/v1.0.0-rc.1/leaflet.js"></script>
	</head>
	<body>
<!--    language btns-->
        <button class="btn btn-block" id="FI">FI</button>
        <button class="btn btn-block" id="EN">EN</button>

		<div id="preview-comment"></div>
		
        <div class="col-sm-12" id="comment-page">
            <div class="col-sm-12 comment-header">
                <div class="col-sm-2">
                    <img src="images/infoicon.png" alt="/" id="Infopic">
                </div>
                <div class="col-sm-8">
                    <p id="page-name">Southwest Finland Routing</p>
                </div>
                <div class="col-sm-2">
                    <img src="images/comment.png" alt="/" id="Commentpic">
                </div>
            </div>
            <!--Mode list box-->
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
                </ul>
            <div class="col-sm-12">
                <input type="text" class="form-control" id="addr" placeholder="Address..">
                <ul id="search_answers"></ul>
            </div>

            <!--Information mode-->
            <div id="mode-info" class="iconContent">
				<input type="text" class="form-control" name="title" placeholder="Title..">
                <textarea name="commentsForInfoMode" cols="30" rows="5" class="form-control" placeholder="Comments.."></textarea>
                <button class="btn btn-default" style="width: 45%" onclick="putActualTime();">Now</button>
                <button class="btn btn-default opentimeTab" style="width: 45%; float: right" onclick="infoDate()">Choose Date</button>
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

            <!--Event mode-->
            <div id="mode-event" class="iconContent">
				<input type="text" class="form-control" id="title" placeholder="Title..">
                <textarea name="commentsForInfoMode" cols="30" rows="5" class="form-control" placeholder="Comments.."></textarea>
                <button class="btn btn-default" style="width: 45%">Now</button>
                <button class="btn btn-default" style="width: 45%; float: right" onclick="eventDate()">Choose Date</button>
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

            <!--Problem mode-->
            <div id="mode-problem" class="iconContent">
				<input type="text" class="form-control" id="title" placeholder="Title..">
                <textarea name="commentsForInfoMode" cols="30" rows="5" class="form-control" placeholder="Comments.."></textarea>
                <button class="btn btn-default" style="width: 45%">Now</button>
                <button class="btn btn-default" style="width: 45%; float: right" onclick="problemDate()">Choose Date</button>
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
		<div id="mapid"></div>
		<!-- Loading local js -->
			<script src="leaflet.js"></script>
        <!--Loading bootstrap js-->
        <script src="doc/scripts/bootstrap.js"></script>
	</body>
</html>