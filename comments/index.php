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
		<!--
		<div id="testing-comment">
			<input type="button" value="Toggle comments" onclick="$('#comment-page').css('display','block');$('#testing-comment').css('display','none');"/>
		</div>
		-->

        <div id="comment-page">
            <h2 class="text-center">Comments page</h2>
            <!--<div id="add-comment">-->
            <!--<h3>Add comment</h3>-->
            <!--<form name="add_comment_form" id="add-comment-form-id">-->
            <!--Title: <input type="text" name="title"/>-->
            <!--<br/>-->
            <!--Type:-->
            <!--</br>-->
            <!--<input type="radio" name="radio_button" value="Event" checked> Event<br/>-->
            <!--<input type="radio" name="radio_button" value="Problem"/> Problem<br/>-->
            <!--<input type="radio" name="radio_button" value="Information"/> Information<br/>-->
            <!--<input type="radio" name="radio_button" value="Other"/> Other<br/>-->
            <!--<input type="text" name="other"/>-->
            <!--<br/>-->
            <!--Description:-->
            <!--<br/>-->
            <!--<textarea name="description" rows="4" cols="50"></textarea>-->
            <!--<br/>-->
            <!--<input type="button" value="Validate" onclick="validateComment(true);"/>-->
            <!--<input type="button" value="Preview?" onclick="previewComment();"/>-->
            <!--<input type="button" value="Cancel" onclick="validateComment(false);"/>-->
            <!--</form>-->
            <!--</div>-->
            <!--<div id="modify-comment">-->
            <!--<h3>Modify Comment</h3>-->
            <!--<div id="display"></div>-->
            <!--<input type="button" value="Modify" onclick="modifyComment(true);"/>-->
            <!--<input type="button" value="Delete" onclick="modifyComment(false);"/>-->
            <!--</div>-->

            <!--Mode list box-->
            <div class="col-sm-12" id="modeList">
                <ul class="col-sm-12">
                    <li class="col-sm-3 icon" id="info" >
                        <img data-toggle="tooltip" title="Information" data-toggle="tooltip" data-placement="top" href="javascript:void(0)" src="images/info.png" alt="/" onclick="selectIcon(event, 'mode-info','information')" onmouseover="tootips()">
                    </li>
                    <li class="col-sm-3 icon" id="other">
                        <img data-toggle="tooltip" title="Other" data-toggle="tooltip" data-placement="top" href="javascript:void(0)" src="images/other.png" alt="/" onclick="selectIcon(event, 'mode-other','other')" onmouseover="tootips()">
                    </li>
                    <li class="col-sm-3 icon" id="event">
                        <img data-toggle="tooltip" title="Event" data-toggle="tooltip" data-placement="top" href="javascript:void(0)"  src="images/event.png" alt="/" onclick="selectIcon(event, 'mode-event','event')" onmouseover="tootips()">
                    </li>
                    <li class="col-sm-3 icon" id="problem">
                        <img data-toggle="tooltip" title="Problem" data-toggle="tooltip" data-placement="top" href="javascript:void(0)" src="images/problem.png" alt="/" onclick="selectIcon(event, 'mode-problem','problem')" onmouseover="tootips()">
                    </li>
                    <li class="col-sm-12"><input type="text" class="form-control" id="addr" placeholder="Address.."></li>
                </ul>
                <ul id="search_answers"></ul>
            </div>

            <!--Information mode-->
            <div id="mode-info" class="iconContent">
                <h5>info</h5>
				<input type="text" class="form-control" name="title" placeholder="Title..">
                <textarea name="commentsForInfoMode" cols="30" rows="5" class="form-control" placeholder="Comments.."></textarea>
                <button class="btn btn-default" style="width: 45%" onclick="putActualTime();">Now</button>
                <button class="btn btn-default opentimeTab" style="width: 45%; float: right" onclick="opentimeTab()">Choose Date</button>
                <!--choose time tab-->
                <div class="col-sm-12">
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
                        <button class="btn btn-default" style="width: 100%" onclick="validateComment(false);">Cancel</button>
                    </div>
                </div>
            </div>

            <!--Other mode-->
            <div id="mode-other" class="iconContent">
                <h5>other</h5>
                <div class="col-sm-12">
                    <input type="text" class="form-control" placeholder="Type title here..">
                </div>
                <textarea name="commentsForInfoMode" cols="30" rows="5" class="form-control" placeholder="Comments.."></textarea>
                <!--Save & previous & cancel button set-->
                <button class="btn btn-default" style="width: 45%" onclick="validateComment(true);">Save</button>
                <button class="btn btn-default" style="width: 45%; float: right" onclick="validateComment(false);">Cancel</button>
            </div>

            <!--Event mode-->
            <div id="mode-event" class="iconContent">
                <h5>event</h5>
				<input type="text" class="form-control" id="title" placeholder="Title..">
                <textarea name="commentsForInfoMode" cols="30" rows="5" class="form-control" placeholder="Comments.."></textarea>
                <button class="btn btn-default" style="width: 45%">Now</button>
                <button class="btn btn-default opentimeTab" style="width: 45%; float: right" onclick="opentimeTab()">Choose Date</button>
                <!--choose time tab-->
                <div class="col-sm-12">
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
                        <button class="btn btn-default" style="width: 100%" onclick="validateComment(false);">Cancel</button>
                    </div>
                </div>
            </div>

            <!--Problem mode-->
            <div id="mode-problem" class="iconContent">
                <h5>problem</h5>
				<input type="text" class="form-control" id="title" placeholder="Title..">
                <textarea name="commentsForInfoMode" cols="30" rows="5" class="form-control" placeholder="Comments.."></textarea>
                <button class="btn btn-default" style="width: 45%">Now</button>
                <button class="btn btn-default opentimeTab" style="width: 45%; float: right" onclick="opentimeTab()">Choose Date</button>
                <!--choose time tab-->
                <div class="col-sm-12">
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
                        <button class="btn btn-default" style="width: 100%" onclick="validateComment(false);">Cancel</button>
                    </div>
                </div>
            </div>

        </div>

		<div id="mapid"></div>

		<!--<div id="map-form">-->
			<!-- Latitude: <input type="text" id="lat"/>
			Longitude: <input type="text" id="long"/>
			<input type="button" id="validation_but" value="Validation" onclick="goTo($('#lat').val(), $('#long').val())"/>
			<br/>-->
			<!--Address: <input type="text" id="addr"/>-->
            <!--<input type="button" id="val_addr" value="Search" onclick="addr_search()"/>-->
            <!--<input type="button" id="val_addr_clear" value="Clear" onclick="$('#search_answers').empty()"/>-->
        <!--</div>-->

		<!-- Loading local js --> 
			<script src="leaflet.js"></script>
        <!--Loading bootstrap js-->
        <script src="doc/scripts/bootstrap.js"></script>

		<!-- Testing scripts -->
            <script>        
            
            </script>
	</body>
</html>