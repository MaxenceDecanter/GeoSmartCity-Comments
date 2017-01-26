<div id="editPage">
    <div class="col-sm-12 comment-header">
        <!--info-->
        <div id="information">
            <a href="http://geosmartcity.dc.turkuamk.fi/?page=home&lang=en">
                <img class="pull-left" src="images/infoicon.png" id="infoPic">
            </a>
        </div>
        <!--Logo Title-->
        <div id="page-name">Edit page</div>
        <!--comment-->
        <div class="pull-right" id="routing">
            <!--Add routing page link here-->
            <a href="http://geosmartcity.dc.turkuamk.fi/?page=home&lang=en">
                <img src="images/infoicon.png" id="routingPic">
            </a>
        </div>
    </div>
    <!--btns for switch comments to previous/next & edit/delete/cancel-->
    <div class="col-sm-12" id="btnGroup">
        <button class="col-sm-2 btn btn-default btn-sm" id="prevComment" onclick="previousComment();" data-toggle="tooltip" title="Click to view the previous comment" data-toggle="tooltip" data-placement="top" href="javascript:void(0)" onmouseover="tootips();">&#x3c;</button>
        <button class="col-sm-2 btn btn-default btn-sm" id="edit" data-toggle="tooltip" title="Edit this comment" data-toggle="tooltip" data-placement="top" href="javascript:void(0)" onmouseover="tootips();" onclick="editPageMulti();">
            <strong>E</strong></button>
        <button class="col-sm-2 btn btn-default btn-sm" id="remove" data-toggle="tooltip" title="Delete this comment" data-toggle="tooltip" data-placement="top" href="javascript:void(0)" onmouseover="tootips();"><strong>R</strong></button>
        <button class="col-sm-2 btn btn-default btn-sm" id="cancel" data-toggle="tooltip" title="Go back to the comment page" data-toggle="tooltip" data-placement="top" href="javascript:void(0)" onmouseover="tootips();" onclick="cancelComment();"><strong>C</strong></button>
        <button class="col-sm-2 btn btn-default btn-sm" id="nextComment"onclick="nextComment();" data-toggle="tooltip" title="Click to view the next comment" data-toggle="tooltip" data-placement="top" href="javascript:void(0)" onmouseover="tootips();">&#x3e;</button>
    </div>
    <div class="col-sm-12" id="commentInfo">
        <div class="col-sm-8" id="commentTitle">Title</div>
        <div class="col-sm-4" id="commentContent" onclick="openCommentList();"
             style="cursor: pointer" data-toggle="tooltip" title="Click to view the comment" data-toggle="tooltip" data-placement="top" href="javascript:void(0)" onmouseover="tootips();">Comment</div>
        <div id="commentContentTab"></div>
    </div>
</div>


