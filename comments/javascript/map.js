/*
Licensed under the EUPL V.1.1 
by Benjamin D'HOOP & Guillaume KLEINPOORT & Maxence DECANTER
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
*
*/
function onMapClick(e) {
    removeTmpMarkers();
	tmpMarker = addMarker(e.latlng.lat, e.latlng.lng);
	$('#comment-page').show();	
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
	tmpMarker = addMarker(lat, lon, addr, capitalize(typeComment));
	$('#comment-page').show();		
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
	if(selectedMarker != tmpMarker){
		selectedMarker.getPopup().togglePopup();
		lat = e.target._latlng.lat;
		lng = e.target._latlng.lng;										 
		$(".form-control:eq(0)").val(getFormattedAddr(selectedMarker.getPopup().getContent()));			 // Add by DECANTER Maxence
		commentMainPage(getFormattedAddr(selectedMarker.getPopup().getContent()));						 //
		$("#commentMainPage").show();																	 //
	}
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

