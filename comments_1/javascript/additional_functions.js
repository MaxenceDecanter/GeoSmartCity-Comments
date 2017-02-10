/*
Licensed under the EUPL V.1.1 
by Maxence DECANTER & Benjamin D'HOOP & Guillaume KLEINPOORT
*/

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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