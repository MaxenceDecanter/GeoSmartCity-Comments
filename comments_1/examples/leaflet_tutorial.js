
    /*$("body").click(function( event ) {
        console.log(event.target)
    });*/


    
	/* Examples
	var geojsonFeature = {
        "type": "Feature",
        "properties": {
            "name": "Coors Field",
            "amenity": "Baseball Stadium",
            "popupContent": "This is where the Rockies play!"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [51.99404, -0.05621]
        }
    };
    L.geoJson(geojsonFeature).addTo(mymap);
    var myLayer = L.geoJson().addTo(mymap);
    myLayer.addData(geojsonFeature);

    var myLines = [{
        "type": "LineString",
        "coordinates": [[-100, 40], [-105, 45], [-110, 55]]
    }, {
        "type": "LineString",
        "coordinates": [[-105, 40], [-110, 45], [-115, 55]]
    }];

    var myStyle = {
        "color": "#ff7800",
        "weight": 5,
        "opacity": 0.65
    };

    L.geoJson(myLines, {
        style: myStyle
    }).addTo(mymap);

    var polygon = L.polygon([
        [51.509, -0.08],
        [51.503, -0.06],
        [51.51, -0.047]
    ]).addTo(mymap);
    polygon.bindPopup("I am a polygon.");
	*/