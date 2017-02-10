<div class="col-sm-12" id="modifyPage">
    <div class="modifyPage-header">
        <!--info-->
        <div id="information">
            <a href="http://geosmartcity.dc.turkuamk.fi/?page=home&lang=en">
                <img src="images/infoicon.png" id="infoPic"
                     style="margin-right: 4vw" data-toggle="tooltip" title="Go to the GreenParking" data-toggle="tooltip" data-placement="right" href="javascript:void(0)" onmouseover="tootips();">
            </a>
        </div>
        <!--Logo Title-->
        <div id="page-name">Modify page</div>
        <!--comment-->
        <div id="routing">
            <!--Add routing page link here-->
            <a href="http://geosmartcity.dc.turkuamk.fi/?page=home&lang=en">
                <img src="images/infoicon.png" id="routingPic"
                     style="margin-left: 4vw" data-toggle="tooltip" title="Go to the Routing" data-toggle="tooltip" data-placement="left" href="javascript:void(0)" onmouseover="tootips();">
            </a>
        </div>
    </div>
    <div class="col-sm-12" id="modifyPage-body">
        <div class="col-sm-12" id="commentsContainer">
            <table class="table" id="commentsModeTitle">
                <tr>
                    <td class="col-sm-3" id="commentMode">Mode</td>
                    <td class="col-sm-6" id="commentTitle">Title</td>
                    <td class="col-sm-3" id="commentContent" onclick="openCommentList();"
                        style="cursor: pointer" data-toggle="tooltip" title="Click to view the comment" data-toggle="tooltip" data-placement="top" href="javascript:void(0)" onmouseover="tootips();">comment</td>
                </tr>
                <tr id="commentContentTab">
                    <td>
                        <div id="comment">sssss</div>
                    </td>
                </tr>
				<tr id="btnChange">
					<td class="col-sm-3" id="previousComment" onclick="previousComment();"
                        style="cursor: pointer" data-toggle="tooltip" title="Click to view the previous comment" data-toggle="tooltip" data-placement="top" href="javascript:void(0)" onmouseover="tootips();">Previous</td>
					<td class="col-sm-3" id="nextComment" onclick="nextComment();"
                        style="cursor: pointer" data-toggle="tooltip" title="Click to view the next comment" data-toggle="tooltip" data-placement="top" href="javascript:void(0)" onmouseover="tootips();">Next</td>
				</tr>
                <tr id="btnGroup">
                    <td class="col-sm-4" id="editComment">
                        <p data-toggle="tooltip" title="Edit this comment" data-toggle="tooltip" data-placement="top" href="javascript:void(0)" onmouseover="tootips();">Edit</p>
                    </td>
                    <td class="col-sm-4" id="deleteComment">
                        <p data-toggle="tooltip" title="Delete this comment" data-toggle="tooltip" data-placement="top" href="javascript:void(0)" onmouseover="tootips();">Delete</p>
                    </td>
                    <td class="col-sm-4" id="cancelComment">
                        <p data-toggle="tooltip" title="Go back to the comment page" data-toggle="tooltip" data-placement="top" href="javascript:void(0)" onmouseover="tootips();">Cancel</p>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</div>
</div>