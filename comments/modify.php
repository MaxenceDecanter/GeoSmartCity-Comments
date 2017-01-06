<div class="col-sm-12" id="modifyPage">
   <div class="col-sm-12" id="modifyPage-header">
       <!--page Title-->
       <div id="page-name">Modify page</div>
       <!--Back to the comment page-->
       <div class="" id="backToComment">
           <a href="index.php">
               <img src="images/comment.png" id="backToCommentpic">
           </a>
       </div>
   </div>
    <div class="col-sm-12" id="modifyPage-body">
<!--        The first modify list-->
        <div class="col-sm-12" id="commentsContainer">
            <table class="col-sm-12" id="commentsModeTitle">
                <tr>
                    <td class="col-sm-4" id="commentMode">Mode 1</td>
                    <td class="col-sm-8" id="commentTitle">Title 1</td>
                </tr>
            </table>
            <button class="col-sm-12 btn btn-default" style="margin: 5px 0" onclick="openCommentList()">Show comments</button>
            <div class="col-sm-12 comments" id="commentsList">
<!--                TODO import the 3 latest comments into here from the DB-->
                <div class="col-sm-12 commentsContent" id="comment-1" style="display: block">
                    comentscomentscoments 1
                    comentscomentscoments1
                    comentscomentscoments1
                    comentscomentscoments1
                    comentscomentscoments1
                    comentscomentscoments1
                    comentscomentscoments1
                    comentscomentscoments1
                    <!--TODO give the stylesheet for comment's date-->
                    <div class="col-sm-12">Show the comment's date</div>
                </div>
                <div class="col-sm-12 commentsContent" id="comment-2">
                    comentscomentscoments2
                    comentscomentscoments2
                    comentscomentscoments2
                    comentscomentscoments2
                    comentscomentscoments2
                    comentscomentscoments2
                    comentscomentscoments2
                    comentscomentscoments2
                    <!--TODO give the stylesheet for comment's date-->
                    <div class="col-sm-12">Show the comment's date</div>
                </div>
                <div class="col-sm-12 commentsContent" id="comment-3">
                    comentscomentscoments3
                    comentscomentscoments3
                    comentscomentscoments3
                    comentscomentscoments3
                    comentscomentscoments3
                    comentscomentscoments3
                    comentscomentscoments3
                    comentscomentscoments3
                    <!--TODO give the stylesheet for comment's date-->
                    <div class="col-sm-12">Show the comment's date</div>
                </div>
                <div class="col-sm-12" id="arrowGroup">
                    <button class="btn btn-default col-sm-5 commentsNum" onclick="openComment1()" id="prev"><</button>
                    <button class="btn btn-default col-sm-5 commentsNum" onclick="openComment2()"  id="next">> </button>
                </div>
                <br>

            </div>
        </div>

            <div class="col-sm-12" id="btnGroup">
                <button class="btn btn-default col-sm-4" onclick="showEditPage();">Edit</button>
                <button class="btn btn-default col-sm-4">Delete</button>
                <button class="btn btn-default col-sm-4">
                    <a href="index.php" style="color: black">Cancel</a>
                </button>
            </div>
        </div>
    </div>
</div>