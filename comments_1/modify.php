<div id="modifyPage">
    <div class="col-sm-12 comment-header">
        <!--info-->
        <div id="information">
            <a href="http://geosmartcity.dc.turkuamk.fi/?page=home&lang=en">
                <img class="pull-left" src="images/infoicon.png" id="infoPic">
            </a>
        </div>
        <!--Logo Title-->
        <div id="page-name">Modify page</div>
        <!--comment-->
        <div class="pull-right" id="routing">
            <!--Add routing page link here-->
            <a href="http://gis.dc.turkuamk.fi/">
                <img src="images/routicon.png" id="routingPic">
            </a>
        </div>
    </div>
    <div class="col-sm-12" id="modifyBtnGroup">
        <div id="prevBtn" data-toggle="tooltip" title="previous" data-toggle="tooltip" data-placement="top" href="javascript:void(0)" alt="/" onclick="previousComment();"></div>
        <div id="editBtn" data-toggle="tooltip" title="edit comment" data-toggle="tooltip" data-placement="top" href="javascript:void(0)" alt="/" onclick="editComment();"></div>
        <div id="removeBtn" data-toggle="tooltip" title="remove comment" data-toggle="tooltip" data-placement="top" href="javascript:void(0)" alt="/" onmouseover="tootips()"></div>
        <a href="index.php">
            <div id="cancelBtn" data-toggle="tooltip" title="cancel" data-toggle="tooltip" data-placement="top" href="javascript:void(0)" alt="/" onmouseover="tootips()"></div>
        </a>
        <div id="nextBtn" data-toggle="tooltip" title="next" data-toggle="tooltip" data-placement="top" href="javascript:void(0)" alt="/" onmouseover="tootips()" onclick="nextComment();"></div>
    </div>
    <div class="col-sm-12" id="commentInfo">
        <div class="col-sm-7" id="commentTitle" style="color: white; font-size: 1vw;">Title</div>
        <div class="col-sm-4 pull-right" id="commentContent" onclick="openCommentList();"
             style="cursor: pointer; color: white; font-size: 1vw;" data-toggle="tooltip" title="Click to view the comment" data-toggle="tooltip" data-placement="top" href="javascript:void(0)" onmouseover="tootips();">Comment</div>
        <div id="commentContentTab"></div>
    </div>
</div>


