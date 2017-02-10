/*
Licensed under the EUPL V.1.1 
by Benjamin D'HOOP & Guillaume KLEINPOORT & Maxence DECANTER
*/

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
    r = $.post( "http://gis.dc.turkuamk.fi/maxence.decanter/comments/baguette/marker.php", { name: com.title, 
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
    xhttp.open("GET", 'http://gis.dc.turkuamk.fi/maxence.decanter/comments/baguette/marker.php', true);
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
		url: 'http://gis.dc.turkuamk.fi/maxence.decanter/comments/baguette/marker.php',
		type: 'PUT',
		dataType: 'json',
		data: "id="+obj.id+"&name="+obj.name+"&d_start="+obj.d_start+"&d_end="+obj.d_end+"&description="+obj.description+"&category="+obj.category+"&visible="+newVisible+"",
		success: function(data) {
				console.log('Update was performed.');
		}
	});
	
}

/**
*	Modify the comment data in the database
*
*	Add by DECANTER Maxence
*
*	@param {string} if
*	@param {string} category
*/
function putModifyComment(id, category){
	f = document.getElementsByClassName('modifyContent');
	
	title= $(".form-control:eq(1)").val();
	description = $(".form-control:eq(2)").val();
	start = $(".form-control:eq(3)").val();
	end = $(".form-control:eq(4)").val();
	
	$.ajax({
		url: 'http://gis.dc.turkuamk.fi/maxence.decanter/comments/baguette/marker.php',
		type: 'PUT',
		dataType: 'json',
		data: "id="+id+"&name="+title+"&d_start="+start+"&d_end="+end+"&description="+description+"&category="+category+"&visible=1",
		success: function(data) {
				console.log('Update was performed.');
		}
	});
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
	
    xhttp.open("GET", 'http://gis.dc.turkuamk.fi/maxence.decanter/comments/baguette/marker.php', true);
    xhttp.send();
}