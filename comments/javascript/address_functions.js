/*
Licensed under the EUPL V.1.1 
by Maxence DECANTER
*/

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