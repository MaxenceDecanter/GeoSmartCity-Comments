/*
Licensed under the EUPL V.1.1 
by Benjamin D'HOOP & Guillaume KLEINPOORT
*/

var mymap = L.map('mapid',{
	center:[60.4500, 22.2667],
	zoom:14,
	zoomControl:true,	
	scaleControl:false,
	minZoom:4
});
	
mymap.zoomControl.setPosition('bottomright');  // Add by DECANTER Maxence
mymap.locate({setView: true, maxZoom: 14});
	
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);
	
var popup = L.popup();
var idx_m = 0;
var tab_markers = [];
var markersArray = new L.layerGroup();
var canPlaceMarker = true;
var DEBUG = true;
                  
//displayServerComments();
$('#comment-page').show();

var LeafIcon = L.Icon.extend({
    options: {
        shadowUrl: 'images/problem.png',
        iconSize:     [60, 58],
        shadowSize:   [60, 58],
        iconAnchor:   [30, 47],
        shadowAnchor: [30, 47],
        popupAnchor:  [0, -37]
    }
});

var problemIcon = new LeafIcon({iconUrl: 'images/problem.png'});
var infoIcon = new LeafIcon({iconUrl: 'images/info.png'});
var eventIcon = new LeafIcon({iconUrl: 'images/event.png'});
var otherIcon = new LeafIcon({iconUrl: 'images/other.png'});



var tmpMarker = "t";
/**
*	[Event] Places a marker at the click position on the Map
* @param {eventObject} e - The event you get from clicking on the map
*/
function onMapClick(e) {
    removeTmpMarkers();
	tmpMarker = addMarker(e.latlng.lat, e.latlng.lng);
	$('#comment-page').show();
	//$('.iconContent').show();
	//$('#add-comment').show("slow");
    //$('#modify-comment').hide("slow");		
}

/**
*	Places a marker at the click position on the Map
* @param {number} lat
* @param {number} lon
* @param {string} addr
*/
function onSearchClick(lat, lon, addr) {
    goTo(lat, lon);
    removeTmpMarkers();
	//if(canPutMarker(lat, lon) === 1){
		tmpMarker = addMarker(lat, lon, addr, capitalize(typeComment));
		$('#comment-page').show();
		//$('#add-comment').show("slow");
		//$('#modify-comment').hide("slow");
	//}else{
	//	alert("There is already a comment at this place. Please, update it.");
	//}		
}

var selectedMarker = "s";
/**
*	[Event] Displays the popup attached to the marker
*    + Displays the modify comment box
* @param {eventObject} e - The event you get from clicking on the marker
*/
function onMarkerClick(e){
	console.log(e);    //e.target gives the Object on which the event is called
    goTo(e.target._latlng.lat, e.target._latlng.lng);
	$('.iconContent').hide();
    removeTmpMarkers();
	selectedMarker = e.target;
    selectedMarker.dragging.disable();
    //displayComment(selectedMarker);
	if(selectedMarker != tmpMarker){
		//$('#comment-page').hide();
		//$('#modify-comment').show("slow");
        //$('#add-comment').hide("slow");
		//mymap.removeLayer(marker);
		selectedMarker.getPopup().togglePopup();
		lat = e.target._latlng.lat;
		lng = e.target._latlng.lng;										 
		$(".form-control:eq(0)").val(getFormattedAddr(selectedMarker.getPopup().getContent()));			 // Add by DECANTER Maxence
	}
	
	//console.log(lat, lng);
	//goTo(lat, lng);
}

/**
*	Place a marker on the location of the user and stores it in tmpMarker
* @param {eventObject} e
*/
function locationOfUserMarker(e){
	console.log(e);
	lat = e.latitude;
	lng = e.longitude;
	tmpMarker = addMarker(lat, lng);
}

/********************** EVENTS ***************************/

mymap.on('click', onMapClick);
mymap.on('locationfound', locationOfUserMarker);

/*
document.getElementById('addr').addEventListener('input', function (e) {
    addr_search();
}, false);*/

/*var radios = document.forms["add_comment_form"].elements["radio_button"];
for(var i = 0, max = radios.length; i < max; i++) {
    radios[i].onclick = function() {
       change_icon(this.value);
    }
}*/


/*********************************************************/

/**
*	Change the current view of the map to go to the 
* 	wanted coordinates
* @param {number} lat
* @param {number} lon
*/
function goTo(lat, lng){
	mymap.setView([lat, lng], 17);
}

/**
*   Removes the temporary markers of the map
*/
function removeTmpMarkers(){
	//$('#comment-page').hide();
    $('#modify-comment').hide();
	$('#add-comment').hide();
    if(tmpMarker != "t")
        mymap.removeLayer(tmpMarker);
    //if(selectedMarker != "s")
    //    mymap.removeLayer(selectedMarker);
    canPlaceMarker=true;
}

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

/**
*	Add a marker on my map + event
* @param {number} lat
* @param {number} lon
* @param {string} addr
* @param {string} iconChosen
*/
function addMarker(lat, lng, addr, iconChosen, title, d_start, description){
    var marker;
    switch(iconChosen) {
        case "Problem":
            marker = L.marker(L.latLng(lat, lng), {icon: problemIcon}).addTo(markersArray);
            break;
        case "Information":
            marker = L.marker(L.latLng(lat, lng), {icon: infoIcon}).addTo(markersArray);
            break;
        case "Event":
            marker = L.marker(L.latLng(lat, lng), {icon: eventIcon}).addTo(markersArray);
            break;
        case "Other":
            marker = L.marker(L.latLng(lat, lng), {icon: otherIcon}).addTo(markersArray);
            break;
        default:
            marker = L.marker(L.latLng(lat, lng), {icon: eventIcon}).addTo(markersArray);
    }
	var latlng = L.latLng(lat, lng);
	tab_markers.push([marker,title, iconChosen, d_start, description]);    // Modify by DECANTER Maxence
    console.log(tab_markers[0][0]);
	if(addr != undefined){
        marker.bindPopup(addr+"<input type='button' class='btn btn-success' onclick='multipleModifyFuns();'>Modify</input>"); // Modify by DECANTER Maxence
    }else{
        var geocoder = new google.maps.Geocoder();																				//
		var latlng = new google.maps.LatLng(lat, lng);																			//
		geocoder.geocode({'latLng': latlng}, function(results, status) {														//
		/* Si le géocodage inversé a réussi */																					// Add by DECANTER Maxence
		if (status == google.maps.GeocoderStatus.OK) {																			//																		//
			marker.bindPopup(results[0].formatted_address+"<button onclick='previewComment();'>Modify</button>").openPopup();	//
			$(".form-control:eq(0)").val(results[0].formatted_address);															//
		}																														//
		});    
    }
	markersArray.addTo(mymap);
	marker.on("click", onMarkerClick);
	return marker;
}
/**
Similar to addMarker, but adds it to the server database
*/
function addServerMarker(marker){
    com = marker.comment;
    lat = marker._latlng.lat;
    lng = marker._latlng.lng;
	pop = marker.getPopup().getContent(); //
	var address = '';					  // Add by DECANTER Maxence
	var i =0;							  //
	while(pop.substring(i,i+1) != '<'){   //
		address += pop.substring(i,i+1);  //
		i++;							  //
	}
    r = $.post( "http://localhost/comments/baguette/marker.php", { name: com.title, 
                          d_start: com.date_creation, 
                          d_end: com.end, 
                          position: '{"type":"Feature","geometry":{"type":"Point","coordinates":['+lat+','+lng+']},"properties":{"name":"'+address+'"}}',
                          description: com.description,
                          category: com.type.toLowerCase(),
                          visible: true}
           ).done(function( data ) {
                console.log(r);
            });;
   alert("Comment successfully add !");
}

/*
function postProcessing(data){
    var myArray = data;
       console.log(myArray);
}

function getValues(url){
     $.ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        cache: false,
        success: postProcessing,
        async:true,
        });
};
*/

function displayServerComments(){
    var arrayComments;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange=function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            arrayComments = jQuery.parseJSON(xhttp.responseText);
            console.log(arrayComments);
            arrayComments.forEach(function(obj){
                console.log(obj);
                if(!obj.position){
                    console.log("Problem with this marker:");
                    console.log(obj);
                }
                else{
					if(obj.visible == "1"){        // Add by DECANTER Maxence
						//updateMarkerDatabase();
						coord = obj.position.geometry.coordinates;
						lat = coord[0];
						lon = coord[1];
						addr = obj.position.properties.name;
						addMarker(lat, lon, addr, capitalize(obj.category), obj.name, obj.d_start, obj.description);
					}
                }
            });
        }
    };
    xhttp.open("GET", 'http://localhost/comments/baguette/marker.php', true);
    xhttp.send();
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
*	Removes the marker from the map
*   @param {L.marker} marker
*/
function removeMarker(marker){
	mymap.removeLayer(marker);
}

/**
*	Removes the selectedMarker from the map
*/
function removeCurrentMarker(){
	mymap.removeLayer(selectedMarker);	
}

function change_icon(name){
    switch(name) {
        case "Problem":
            tmpMarker.setIcon(problemIcon);
            break;
        case "Information":
             tmpMarker.setIcon(infoIcon);
            break;
        case "Event":
             tmpMarker.setIcon(eventIcon);
            break;
        case "Other":
            tmpMarker.setIcon(otherIcon);
            break;
        default:
    }
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
*   Displays the comment on preview-comment div
*
*	Modify by DECANTER Maxence
*/
function previewComment(){
	$('#comment-page').hide();
	$('#preview-comment').show();
	var isFind = 0;
	var i = 0;
	while(isFind !=1){
		console.log(tab_markers[i][0]._latlng);
		if(selectedMarker === tab_markers[i][0]){
			title = tab_markers[i][1];
			type = tab_markers[i][2];
			date = tab_markers[i][3];
			description = tab_markers[i][4];
			isFind = 1;
		}
		i++;
	}
	var d = $('#preview-comment');
	d.empty();
	d.append('<p><strong>Title:</strong> '+title+'</p>');
	d.append('<p><strong>Type:</strong> '+type+'</p>');
	d.append('<p><strong>Created on:</strong> '+date+'</p>');
	d.append('<p><strong>Description:</strong> '+description+'</p>');
	
    /*f = document.getElementById('add-comment-form');
    title= f['title'].value;
    description = f['description'].value;
    type=$('#add-comment-form input:checked')[0].value;
    //if(type=="Other")
    //    type=f['other'].value;
    f.reset();
    tmpComment = new Comment(title, description, type, date_creation, end);
    console.log(tmpComment);
    return tmpComment;*/
}

/**
*   Displays the comment contained in the marker
*   @param {L.marker} marker
*/
function displayComment(marker){
    var c= marker.comment;
    d=$('#display');
    d.empty();
    d.append('<p>Title: '+c.title+'</p>');
    d.append('<p>Type: '+c.type+'</p>');
    d.append('<p>Created on: '+c.date_creation+'</p>');
    d.append('<p>Description:'+'<br/>'+c.description+'</p>');
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

/****************** Function add by DECANTER Maxence *****************/

/**
* Find the address the user input
*
* Add by DECANTER Maxence
*/
function addr_search() {
	
	var addressInput = document.getElementById('addr').value;
	var geocoder = new google.maps.Geocoder();

	geocoder.geocode({address: addressInput}, function(results, status) {

	if (status == google.maps.GeocoderStatus.OK) {

		var lat = results[0].geometry.location.lat();
	    var lng = results[0].geometry.location.lng();
	    var ad = results[0].formatted_address;
		goTo(lat, lng);
		removeTmpMarkers();
		tmpMarker = addMarker(lat, lng, ad, capitalize(typeComment));
		$(".form-control:eq(0)").val(ad);	
		$('#comment-page').show();
	}
	});
}

/**
*	Give the right format to put date in the database
*
*	Add by DECANTER Maxence
*
*	@param {string} date
*	@param {string} time
*/
function changeFormat(date, time){
	return date+" "+time+":00";
}

/**
*	Give the date of today in the right format
*
*	Add by DECANTER Maxence
*/
function todayDate(){
	var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
		hour = d.getHours(),
		min = d.getMinutes();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
	if (hour.length < 2) hour = '0' + hour;
	if (min.length < 2) min = '0' + min;

    return [year, month, day].join('-')+" "+[hour,min].join(':')+":00";
}

/**
*	Update the database, change the visibility to 0 if the end date is past
*
*	Add by DECANTER Maxence
*
*/
function updateMarkerDatabase(){
	var arrayComments;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange=function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            arrayComments = jQuery.parseJSON(xhttp.responseText);
            arrayComments.forEach(function(obj){
                //console.log(obj);
				if(!obj.position){
                    console.log("Problem with this marker:");
                    console.log(obj);
                }
                else if(obj.d_end == "1999-01-01 00:00:00"){
					console.log("No end for this marker");
				}else{
					if(obj.visible == "1" && compareDate(todayDate(), obj.d_end) === 1)
						changeVisibility(obj, 0);
				}
            });
        }
    };
    xhttp.open("GET", 'http://localhost/comments/baguette/marker.php', true);
    xhttp.send();
}

/**
*	Change the visibility of a marker (1 = display, 0 = not display)
*
*	Add by DECANTER Maxence
*
*	@param {object} obj
*	@param {int} newVisible
*/
function changeVisibility(obj, newVisible){
	lat = obj.position.geometry.coordinates[0];
	lng = obj.position.geometry.coordinates[1];
	n = obj.position.properties.name
	$.ajax({
		url: 'http://localhost/comments/baguette/marker.php',
		type: 'PUT',
		dataType: 'json',
		data: "id="+obj.id+"&name="+obj.name+"&d_start="+obj.d_start+"&d_end="+obj.d_end+"&description="+obj.description+"&category="+obj.category+"&visible="+newVisible+"",
		success: function(data) {
				console.log('Update was performed.');
		}
	});
	
}
//position='{'type':'Feature','geometry':{'type':'Point','coordinates':["+lat+","+lng+"]},'properties':{'name':'"+n+"'}}'&
/**
*	Display comments by category (event, problem, info, other)
*
*	Add by DECANTER Maxence
*
*	@param {string} cat
*/
function displayServerCommentsByCategory(cat){
	console.log(this.typeComment);
    var arrayComments;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange=function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            arrayComments = jQuery.parseJSON(xhttp.responseText);
            console.log(arrayComments);
            arrayComments.forEach(function(obj){
                //console.log(obj);
                if(!obj.position){
                    console.log("Problem with this marker:");
                    console.log(obj);
                }
                else{
					if(obj.visible == "1"){
						if(obj.category == cat){
							//updateMarkerDatabase();
							coord = obj.position.geometry.coordinates;
							lat = coord[0];
							lon = coord[1];
							addr = obj.position.properties.name;
						addMarker(lat, lon, addr, capitalize(obj.category), obj.name, obj.d_start, obj.description);
						}
					}
                }
            });
        }
    };
    xhttp.open("GET", 'http://localhost/comments/baguette/marker.php', true);
    xhttp.send();
}

/**
*	Compare two date (2 if date1 older, 1 if date2 older, 0 if same date)
*
*	Add by DECANTER Maxence
*
*	@param {string} date1
*	@param {string} date2
*/
function compareDate(date1, date2){
	//Compare year
	if(date1.substring(0,4) < date2.substring(0,4))
		return 2;
	else if(date1.substring(0,4) > date2.substring(0,4))
		return 1;
	else if(date1.substring(0,4) == date2.substring(0,4)){
		//Compare month
		if(date1.substring(5,7) < date2.substring(5,7))
			return 2;
		else if(date1.substring(5,7) > date2.substring(5,7))
			return 1;
		else if(date1.substring(5,7) == date2.substring(5,7)){
			//Compare day
			console.log(date1 , date2);
			if(date1.substring(8,10) < date2.substring(8,10))
				return 2;
			else if(date1.substring(8,10) > date2.substring(8,10))
				return 1;
			else if(date1.substring(8,10) == date2.substring(8,10)){
				//Compare hours
				if(date1.substring(11,13) < date2.substring(11,13))
					return 2;
				else if(date1.substring(11,13) > date2.substring(11,13))
					return 1;
				else if(date1.substring(11,13) == date2.substring(11,13)){
					//Compare minutes
					if(date1.substring(14,16) < date2.substring(14,16))
						return 2;
					if(date1.substring(14,16) > date2.substring(14,16))
						return 1;
					if(date1.substring(14,16) == date2.substring(14,16))
						return 0;
				}
			}
		}
	}
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
	if(type == 'viewall')
		displayServerComments();
	else
		displayServerCommentsByCategory(type);
	change_icon(capitalize(type));
}

var actualTime = 0;

/**
*	Put actualTime to 1 if you want to use the actual time for the database
*
*	Add by DECANTER Maxence
*
*/
function putActualTime(){
	this.actualTime = 1;
}


/**
*	Make statistics of number of comments in database and display in a div
*
*	Add by DECANTER Maxence
*
*/
function stat(){
	var total = 0;
	var ev = 0;
	var info = 0;
	var other = 0;
	var problem =0;
    var arrayComments;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange=function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
			
            arrayComments = jQuery.parseJSON(xhttp.responseText);
            console.log(arrayComments);
            arrayComments.forEach(function(obj){
                //console.log(obj);
                if(!obj.position){
                    console.log("Problem with this marker:");
                    console.log(obj);
                }
                else{
					total += 1;
					if(obj.category === 'event')
						ev += 1;
					else if(obj.category === 'information')
						info += 1;
					else if(obj.category === 'other')
						other += 1;
					else if(obj.category === 'problem')
						problem += 1;
                }
            });
			var d = $('#stat');
			d.empty();
			d.append('<p><strong>Total:</strong> '+total+'</p>');
			d.append('<p><strong>Event:</strong> '+ev+'</p>');
			d.append('<p><strong>Information:</strong> '+info+'</p>');
			d.append('<p><strong>Other:</strong> '+other+'</p>');
			d.append('<p><strong>Problem:</strong> '+problem+'</p>');
        }
    };
	
    xhttp.open("GET", 'http://localhost/comments/baguette/marker.php', true);
    xhttp.send();
}

/**
*	Return the address without modify button htlm code
*
*	Add by DECANTER Maxence
*
*	@param {string} content
*/
function getFormattedAddr(content){
	var aux ='';								 
	var i =0;									
	while (content.substring(i, i+1) != '<'){		 
		aux += content.substring(i, i+1);			 
		i++;									 
	}	
	return aux;
}

/**
*	Return the three last comment in the same street that addr
*
*	Add by DECANTER Maxence
*
*	@param {string} addr
*/
function getThreeLastComments(addr){
	var tab_sameAddr = [];
	for (var i = 0 ; i < tab_markers.length; i++){
		if(getAddrWithoutNumber(addr) == getAddrWithoutNumber(getFormattedAddr(tab_markers[i][0].getPopup().getContent()))){
			tab_sameAddr.push(tab_markers[i]);
		}
	} 
	if(tab_sameAddr.length > 3){
		tab_sameAddr = tab_sameAddr.slice(0,3);
	}
	return tab_sameAddr;
}

/**
*	Return the address without the number, only the street, the postal code, the city and the country
*
*	Add by DECANTER Maxence
*
*	@param {string} addr
*/
function getAddrWithoutNumber(addr){
	var aux = '';
	var i =0;
	while(addr.substring(i,i+1) != ','){
		if(isNaN(addr.substring(i,i+1))){
			if(!isNaN(addr.substring(i-1,i)) && addr.substring(i+1,i+2) == ','){
			aux += '';
			}else{
			aux += addr.substring(i,i+1);
			}
		}
		i++;
	}
	for(i; i<addr.length;i++){
		aux += addr.substring(i,i+1);
	}
	return aux;
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

/**
*	Insert the HTML code in the right div to display the comment
*
*	Add by DECANTER Maxence
*
*	@param (int) i
*/
function displayModifyComment(i){
	var b = $('#commentMode');
	b.empty();
	b.append('<h5>Mode</h5>')
	b.append('<p>'+tab_modify[i][2]+'</p>')
	var c = $('#commentTitle');
	c.empty();
	c.append('<h5>Title</h5>')
	c.append('<p>'+tab_modify[i][1]+'</p>')
	var d = $('#comment');
	d.empty();
	d.append('<p>'+tab_modify[i][4]+'</p>');
	d.append('<p>Created on: '+tab_modify[i][3]+'</p>');
	commentNbr = i;
	console.log(commentNbr);
}

/**
*	Check if there is no comment on the same coordinates
*
*	Add by DECANTER Maxence
*
*	@param {float} lat
*	@param {float} lng
*/
function canPutMarker(lat, lng){
	var aux;
	for(var i = 0; i<tab_markers.length; i++){
		if(tab_markers[i][0]._latlng.lat === lat && tab_markers[i][0]._latlng.lng === lng )
			aux = 0;
		else
			aux =1;
	}
	
	return aux;
}

/****************** Function add by Hongyu Zhao *****************/

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
