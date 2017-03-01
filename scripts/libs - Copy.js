function changeDisplayMode()
{
	alert(1);
}

function fetchResultsFromAPI(lat,lng)
{
//alert(lat);
//alert(lng);
placesListingData.length = 0;
			
	var pyrmont = {lat: lat, lng: lng};  // current location
	
	geocoder = new google.maps.Geocoder();

    var myLatlng = new google.maps.LatLng(pyrmont.lat, pyrmont.lng);

    var myOptions = { // default map options
        zoom: 14,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
	
    map = new google.maps.Map("", myOptions);
	
	//var cur_location = new google.maps.LatLng(39.7391667, -104.9841667);

    // prepare request to Places
    var request = {
        location: myLatlng,
        radius: 500,
        types: ['restaurant']
    };
	//category=type;
	
	//alert("category");
    // send request
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, function(results, status, pagination){
		
		if (status == google.maps.places.PlacesServiceStatus.OK) 
		{
		
			for (var i = 0; i < results.length; i++) 
			{
				item ={
						'name':results[i].name,
						'place_id':results[i].place_id
					  };
				placesListingData.push(item);
			}
		}
	});
	alert(JSON.stringify(placesListingData));
}
