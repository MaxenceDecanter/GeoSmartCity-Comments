<?php include 'header.php';?>
<!--    language btns-->
<?php include 'widgets/languageButtom.php';?>
<!--Include the modify page here-->
<?php include_once ('modify.php');?>
<?php include_once ('editComment.php');?>
<div id="mapid">
    <!-- Empty div for the map-->
</div>

<div id="comment-page">
    <div class="comment-header">
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
            <a href="http://geosmartcity.dc.turkuamk.fi/?page=home&lang=en">
                <img src="images/infoicon.png" id="routingPic">
            </a>
        </div>
    </div>
    <div id="modeList">
        <div id="event" data-toggle="tooltip" title="Event" data-toggle="tooltip" data-placement="top" href="javascript:void(0)" alt="/" onclick="selectIcon(event, 'mode-event','event');" onmouseover="tootips()"><div></div></div>
        <div id="info" data-toggle="tooltip" title="Information" data-toggle="tooltip" data-placement="top" href="javascript:void(0)" alt="/" onclick="selectIcon(event, 'mode-info','information');" onmouseover="tootips()"><div></div></div>
        <div id="other" data-toggle="tooltip" title="Other" data-toggle="tooltip" data-placement="top" href="javascript:void(0)" alt="/" onclick="selectIcon(event, 'mode-other','other')" onmouseover="tootips()"></div>
        <div id="problem" data-toggle="tooltip" title="Problem" data-toggle="tooltip" data-placement="top" href="javascript:void(0)" alt="/" onclick="selectIcon(event, 'mode-problem','problem')" onmouseover="tootips()"></div>
        <div id="problem" data-toggle="tooltip" title="View All" data-toggle="tooltip" data-placement="top" href="javascript:void(0)" alt="/" onclick="selectIcon(event, 'mode-problem','viewall')" onmouseover="tootips()"></div>
    </div>
    <!--address bar-->
    <div>
        <input type="text" class="form-control" id="addr" placeholder="Address.." onKeyPress="if(event.keyCode == 13) addr_search();">
    </div>
    <!--Event mode-->
    <div id="mode-event" class="iconContent">
        <input type="text" class="form-control" id="title" placeholder="Title..">
        <textarea name="commentsForInfoMode" cols="30" rows="5" class="form-control" placeholder="Comments.."></textarea>
        <div class="col-sm-12">
            <button class="btn btn-default col-sm-6" onclick="multipleCloseEventDateFuncs()">Now</button>
            <button class="btn btn-default col-sm-6" onclick="openEventDate()">Choose Date</button>
        </div>
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
        <div class="col-sm-12">
            <button class="btn btn-default col-sm-6" onclick="multipleCloseInfoDateFuncs()">Now</button>
            <button class="btn btn-default col-sm-6" onclick="openInfoDate()">Choose Date</button>
        </div>
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
        <input type="text" class="form-control" id="title" placeholder="Title..">
        <textarea name="commentsForInfoMode" cols="30" rows="5" class="form-control" placeholder="Comments.."></textarea>
        <!--Save & previous & cancel button set-->
        <button class="btn btn-default" style="width: 45%" onclick="validateComment(true);">Save</button>
        <button class="btn btn-default" style="width: 45%; float: right" onclick="CbtnOther();">Cancel</button>
    </div>

    <!--Problem mode-->
    <div id="mode-problem" class="iconContent">
        <input type="text" class="form-control" id="title" placeholder="Title..">
        <textarea name="commentsForInfoMode" cols="30" rows="5" class="form-control" placeholder="Comments.."></textarea>
        <div class="col-sm-12">
            <button class="btn btn-default col-sm-6" onclick="multipleCloseProblemDateFuncs()">Now</button>
            <button class="btn btn-default col-sm-6" onclick="openProblemDate()">Choose Date</button>
        </div>
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
	
	<div id="preview-comment"></div>
	
	<div id="stat"></div>

</div>
<?php include 'footer.php';?>