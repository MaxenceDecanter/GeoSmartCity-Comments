/*
Licensed under the EUPL V.1.1 
by Benjamin D'HOOP & Guillaume KLEINPOORT & Maxence DECANTER
*/

/**
*	Add a marker on my map + event
* @param {number} lat
* @param {number} lon
* @param {string} addr
* @param {string} iconChosen
*/
function addMarker(lat, lng, addr, iconChosen, title, d_start, description,id){
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
	tab_markers.push([marker,title, iconChosen, d_start, description,id]);    // Modify by DECANTER Maxence
	if(addr != undefined){
        marker.bindPopup(addr+"<a href='#' onclick='multipleModifyFuns();'> <strong>View</strong></a>"); // Modify by DECANTER Maxence
    }else{
        var geocoder = new google.maps.Geocoder();																				//
		var latlng = new google.maps.LatLng(lat, lng);																			//
		geocoder.geocode({'latLng': latlng}, function(results, status) {														//
		/* Si le géocodage inversé a réussi */																					// Add by DECANTER Maxence
		if (status == google.maps.GeocoderStatus.OK) {																			//																		//
			marker.bindPopup(results[0].formatted_address+"<a href='#' onclick='previewComment();'> <strong>View</strong></a>").openPopup();	//
			$(".form-control:eq(0)").val(results[0].formatted_address);															//
		}																														//
		});    
    }
	markersArray.addTo(mymap);
	marker.on("click", onMarkerClick);
	return marker;
}

 /**
 *	Display all comments on the map
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
						addMarker(lat, lon, addr, capitalize(obj.category), obj.name, obj.d_start, obj.description,obj.id);
					}
                }
            });
        }
    };
    xhttp.open("GET", 'http://localhost/comments/baguette/marker.php', true);
    xhttp.send();
}

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
            arrayComments.forEach(function(obj){
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
						addMarker(lat, lon, addr, capitalize(obj.category), obj.name, obj.d_start, obj.description,obj.id);
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
*   Displays the comment on main page
*
*	Modify by DECANTER Maxence
*/
function commentMainPage(addr){
	console.log(addr);
	tab = tab_markers;
	var d = $('#commentMainPage');
	d.empty();
	for (var i = 0 ; i < tab_markers.length; i++){
		if(addr == getFormattedAddr(tab[i][0].getPopup().getContent())){
			console.log(tab[i]);
			d.append('<p><strong>Title:</strong> '+tab[i][1]+'</p>');
			d.append('<p><strong>Mode:</strong> '+tab[i][2]+'</p>');
			d.append('<p><strong>Created on:</strong> '+tab[i][3]+'</p>');
			d.append('<p><strong>Description:</strong> '+tab[i][4]+'</p>');
			d.append('</br>');
		}
	} 
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
	b.append('<h5>'+tab_modify[i][2]+'</h5>')
	var c = $('#commentTitle');
	c.empty();
	c.append('<h5>Title</h5>')
	c.append('<h5>'+tab_modify[i][1]+'</h5>')
	var d = $('#comment');
	d.empty();
	d.append('<p>'+tab_modify[i][4]+'</p>');
	d.append('<p>Created on: '+tab_modify[i][3]+'</p>');
	commentNbr = i;
	console.log(commentNbr);
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
*   Removes the temporary markers of the map
*/
function removeTmpMarkers(){
    $('#modify-comment').hide();
	$('#add-comment').hide();
    if(tmpMarker != "t")
        mymap.removeLayer(tmpMarker);
    canPlaceMarker=true;
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

/**
*	Change the icon image
*	@param (string) name
*/
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