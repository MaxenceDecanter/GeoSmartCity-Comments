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
// function problemDate() {
//     var problem_date = document.getElementById("problem-date");
//     if(problem_date.style.display === 'none') {
//         problem_date.style.display = 'block';
//     } else {
//         problem_date.style.display = 'none';
//     }
// }
// function eventDate() {
//     var event_date = document.getElementById("event-date");
//     if(event_date.style.display === 'none') {
//         event_date.style.display = 'block';
//     } else {
//         event_date.style.display = 'none';
//     }
// }
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
    $("#btnGroup").show();
    $("#arrowGroup").show();
	
}
//Edit comments part
function showEditPage() {
    $("#editPage").show();
    $("#comment-page").hide();
    $("#modifyPage").hide();
}
