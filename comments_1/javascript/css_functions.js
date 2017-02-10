/*
Licensed under the EUPL V.1.1 
by Zhao HONGYU
*/
//Showing each icon's content
function openIcon(evt, iconName) {
    var i,iconcentent, icon;
    iconcentent = document.getElementsByClassName('iconContent');
    for (i = 0; i < iconcentent.length; i++){
        iconcentent[i].style.display= "none";
    }
    icon = document.getElementsByClassName("icon");
    for (i = 0; i < icon.length; i++) {
        icon[i].className = icon[i].className.replace("active", "");
    }
    document.getElementById(iconName).style.display = "block";
    evt.currentTarget.className += "active";
}
// //Open & close time tab
function openInfoDate(){
	$("#info-date").show();
}
function closeInfoDate(){
    $("#info-date").hide();
}
function multipleCloseInfoDateFuncs() {
    putActualTime();
    closeInfoDate();
}
function openEventDate(){
    $("#event-date").show();
}
function closeEventDate(){
    $("#event-date").hide();
}
function multipleCloseEventDateFuncs() {
    putActualTime();
    closeEventDate();
}
function openProblemDate(){
    $("#problem-date").show();
}
function closeProblemDate(){
    $("#problem-date").hide();
}
function multipleCloseProblemDateFuncs() {
    putActualTime();
    closeProblemDate();
}
function tootips() {
    $(document).ready(function(){
        $('[data-toggle="tooltip"]').tooltip();
    });
}
//Close mode contents
//    conbine several functions for each cancel btn
function CbtnInfo(){
    validateComment(false);
    cancelInfo();
}
function cancelInfo() {
    $("#mode-info").hide();
}
function CbtnOther(){
    validateComment(false);
    cancelOther();
}
function cancelOther() {
    $("#mode-other").hide();
}
function CbtnEvent(){
    validateComment(false);
    cancelEvent();
}
function cancelEvent() {
    $("#mode-event").hide();
}
function CbtnProblem(){
    validateComment(false);
    cancelProblem();
}
function cancelProblem() {
    $("#mode-problem").hide();
}
function showModifyPage() {
    $("#modifyPage").show();
    $("#comment-page").hide();
}
function multipleModifyFuns() {
    previewComment();
    showModifyPage();
	loadTabModifyComment();
	displayModifyComment(0);
}
//Modify page
	//open comments list
function openCommentList() {
    $("#commentContentTab").show();
    $("#arrowGroup").show();
}
//Replace Title and comment tab to the inputBox and textarea
function editComment(){
    var pageName = document.getElementById("page-name");
    var title = document.getElementById("modifyBtnGroup");
    var comment = document.getElementById("commentTitle");
    var save = document.getElementById("commentContent");
    var cancel = document.getElementById("commentContentTab");
    var titleNew = document.createElement("input");
    var commentNew = document.createElement("textarea");
    var saveBtn = document.createElement("input");
    var cancelBtn = document.createElement("input");
    pageName.innerHTML = "Edit page";
    titleNew.placeholder="Type new title here ..";
    titleNew.setAttribute("class", "titleNew form-control ");
    commentNew.setAttribute("class", "commentNew form-control col-sm-12");
    commentNew.placeholder="Type new comment here ..";
    saveBtn.type = "button";
    saveBtn.value = "Save";
    saveBtn.setAttribute("class", "btn col-sm-6 btn-default");
    cancelBtn.type = "button";
    cancelBtn.value = "Cancel";
    cancelBtn.setAttribute("class", "btn col-sm-6 btn-default");
    title.parentNode.replaceChild(titleNew, title);
    comment.parentNode.replaceChild(commentNew, comment);
    save.parentNode.replaceChild(saveBtn, save);
    cancel.parentNode.replaceChild(cancelBtn, cancel);
    cancelBtn.addEventListener("click", function(){
        $("#comment-page").show();
        $("#modifyPage").hide();
    });
    cancel.parentNode.replaceChild(cancelBtn, cancel);
}

// Showing/hiding languge buttons for mobile screen
$(".langButton").click(function () {
    if ($("#myNavbar").is(":hidden")) {
        $("#myNavbar").show("fast");
        $("#langArrow").addClass("arrow-down").removeClass("arrow-up");
    }
    else {
        $("#myNavbar").hide("fast");
        $("#langArrow").addClass("arrow-up").removeClass("arrow-down");
    }
});