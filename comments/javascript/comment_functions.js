/*
Licensed under the EUPL V.1.1 
by Benjamin D'HOOP & Guillaume KLEINPOORT & Maxence DECANTER
*/

/**
*	Places a marker with a comment attached
* @param {boolean} bool
*/
function validateComment(bool){
	
    comment = createComment();
	if(comment == undefined){                   //
		console.log("missing argument");		// Add by DECANTER Maxence
	}else{										//
		tmpMarker['comment']= comment;
		if(!bool){
			mymap.removeLayer(tmpMarker);
		}else{
			addServerMarker(tmpMarker);
			console.log(tmpMarker);
		}
		tmpMarker = "t";
		canPlaceMarker=true;
		actualTime = 0;
	}
}


/**
*	Modifies the marker currently selected
* @param {boolean} bool
*/
function modifyComment(bool){
    $('#comment-page').hide("slow");
	$('#modify-comment').hide("slow");
	if(!bool){
		mymap.removeLayer(selectedMarker);
        mymap.removeLayer(tmpMarker);
	}
    selectedMarker.dragging.disable();
	selectedMarker = "s";
}

var tmpComment;
/**
*   Creates a new comment with the given informations from the form
*
*	Modify by DECANTER Maxence
*
*   @return {Comment} The new Comment object.
*/
function createComment(){
	f = document.getElementsByClassName('iconContent');
	
	if(typeComment == 'information'){
		title= $(".form-control:eq(6)").val();
		description = $(".form-control:eq(7)").val();
		d = $(".form-control:eq(8)").val();
		start_time = $(".form-control:eq(9)").val();
		end_time = $(".form-control:eq(10)").val();
	}else if(typeComment == 'event'){
		title= $(".form-control:eq(1)").val();
		description = $(".form-control:eq(2)").val();
		d = $(".form-control:eq(3)").val();
		start_time = $(".form-control:eq(4)").val();
		end_time = $(".form-control:eq(5)").val();
	}else if(typeComment == 'problem'){
		title= $(".form-control:eq(13)").val();
		description = $(".form-control:eq(14)").val();
		d = $(".form-control:eq(15)").val();
		start_time = $(".form-control:eq(16)").val();
		end_time = $(".form-control:eq(17)").val();
	}else if(typeComment == 'other'){
		title= $(".form-control:eq(11)").val();
		description = $(".form-control:eq(12)").val();
		
	}
	
	if(actualTime ===1 || typeComment == 'other'){
		date_creation = todayDate();
		end = "1999-01-01 00:00:00";
	}else{
		date_creation = changeFormat(d, start_time);
		end = changeFormat(d,end_time);
	}
	if(title == '' || description == '' || date_creation.length != 19 || end.length != 19){
		alert("Something is missing in the form !");
	}else{
		type = this.typeComment;
		tmpComment = new Comment(title, description, type, date_creation, end);
		console.log(tmpComment);
	}
	
	return tmpComment;
}



/**
*   Creates an instance of Comment
*
*   @constructor
*   @this {Comment}
*   @param {string} title
*   @param {string} description
*   @param {string} type
*   @param {string} date_start
*   @param {string} time_start
*   @param {string} date_end
*   @param {string} time_end
*/
function Comment(title, description, type, date_creation, end){
    this.title = title;
    this.description = description;
    this.type = type;
    this.date_creation = date_creation;
    this.end = end;
}

var typeComment = "";

/**
*	Select which category is choose
*
*	Add by DECANTER Maxence
*
*	@param {event} evt
*	@param {string} iconName
*	@param {string} type
*/
function selectIcon(evt, iconName, type){
	this.typeComment = type;
	openIcon(event, iconName);
	tab_markers = [];
	markersArray.clearLayers();
	if(tmpMarker != "t")
		tmpMarker.addTo(mymap);
	if(type == 'viewall'){
		displayServerComments();
		stat();
		$("#stat").show();
	}else
		displayServerCommentsByCategory(type);
	change_icon(capitalize(type));
}

/**
*	Return the three last comment in the same addr
*
*	Add by DECANTER Maxence
*
*	@param {string} addr
*/
function getThreeLastComments(addr){
	var tab_sameAddr = [];
	for (var i = 0 ; i < tab_markers.length; i++){
		if(addr == getFormattedAddr(tab_markers[i][0].getPopup().getContent())){
			tab_sameAddr.push(tab_markers[i]);
		}
	} 
	if(tab_sameAddr.length > 3){
		tab_sameAddr = tab_sameAddr.slice(0,3);
	}
	return tab_sameAddr;
}

var tab_modify;
var commentNbr;

/**
*	Load the tab with the 3 last comments of the street selected
*
*	Add by DECANTER Maxence
*
*/
function loadTabModifyComment(){
	tab_modify = [];
	commentNbr = 0;
	tab_modify = getThreeLastComments($(".form-control:eq(0)").val());
	console.log(tab_modify);
}

/**
*	Display the next comment in the modify page
*
*	Add by DECANTER Maxence
*
*/
function nextComment(){
	if(commentNbr === 0)
		displayModifyComment(1);
	else if(commentNbr === 1)
		displayModifyComment(2);
	else if(commentNbr === 2)
		console.log("It's the last comment");
}

/**
*	Display the previous comment in the modify page
*
*	Add by DECANTER Maxence
*
*/
function previousComment(){
	if(commentNbr === 2)
		displayModifyComment(1);
	else if(commentNbr === 1)
		displayModifyComment(0);
	else if(commentNbr === 0)
		console.log("It's the first comment");
}