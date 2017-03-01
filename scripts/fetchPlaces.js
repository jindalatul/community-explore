var geocoder;
var map;
var category;
var search;

function fetchPlacesList() 
{
	var CurentLatitude = parseFloat(localStorage.getItem("CurentLatitude"));
	var CurentLongitude = parseFloat(localStorage.getItem("CurentLongitude"));

	if(localStorage.getItem("CurrentLocationText"))
	{
		document.getElementById('search-text-box').value= localStorage.getItem("CurrentLocationText");
	}
	
		// ons.notification.alert(localStorage.getItem("CurentLatitude"));
		// ons.notification.alert(localStorage.getItem("CurentLongitude"));
		
	var pyrmont = {lat: CurentLatitude, lng: CurentLongitude};  // current location
	
	//alert(pyrmont.lat);
	
	var AutoCompleteOptions = {
		types: ['(cities)'],
		componentRestrictions: { country: "us" }
	};
	
	  var input = document.getElementById('search-text-box');
	  var autocomplete = new google.maps.places.Autocomplete(input,AutoCompleteOptions);
	    
	              autocomplete.addListener('place_changed', function(){
				  
				  var place = autocomplete.getPlace();
				  //alert("List place Changed");
				  
				  document.getElementById("restaurants").innerHTML = "";
				  
				  localStorage.setItem("CurentLatitude", place.geometry.location.lat());
				  localStorage.setItem("CurentLongitude", place.geometry.location.lng());

				  localStorage.setItem("CurrentLocationText",document.getElementById('search-text-box').value);
				  
				  
				  
				  //alert(place.geometry.location.lat());
				  
			geocoder = new google.maps.Geocoder();

			var myLatlng = new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng());

			var myOptions = { // default map options
				zoom: 16,
				center: myLatlng,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			
			map = new google.maps.Map("", myOptions);
	
			// prepare request to Places
					var request = {
						location: myLatlng,
						radius: 500,
						types: ['restaurant']
					};
				service = new google.maps.places.PlacesService(map);
				service.nearbySearch(request, callbackList);
				  
			  });
	
	///////////////
	
    // prepare Geocoder
    geocoder = new google.maps.Geocoder();

    var myLatlng = new google.maps.LatLng(pyrmont.lat, pyrmont.lng);

    var myOptions = { // default map options
        zoom: 16,
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
    service.nearbySearch(request, callbackList);
	
}

function fetchPlacesMap()
{	
	var CurentLatitude = parseFloat(localStorage.getItem("CurentLatitude"));
	var CurentLongitude = parseFloat(localStorage.getItem("CurentLongitude"));
	if(localStorage.getItem("CurrentLocationText"))
	{
		document.getElementById('search-text-box').value= localStorage.getItem("CurrentLocationText");
	}
	
		// ons.notification.alert(localStorage.getItem("CurentLatitude"));
		// ons.notification.alert(localStorage.getItem("CurentLongitude"));
		
	var pyrmont = {lat: CurentLatitude, lng: CurentLongitude};  // current location
	
	//alert(pyrmont.lat);
	
	var AutoCompleteOptions = {
		types: ['(cities)'],
		componentRestrictions: { country: "us" }
	};
	
	map = new google.maps.Map(document.getElementById('map-canvas'), {
        center: pyrmont,
        disableDefaultUI: false,
        zoom: 16
        });
		
	  var input = document.getElementById('search-text-box');
	  var autocomplete = new google.maps.places.Autocomplete(input,AutoCompleteOptions);
	  
	  //autocomplete.bindTo('bounds', map);
	  
	          autocomplete.addListener('place_changed', function(){
				  var place = autocomplete.getPlace();
				  map.panTo(place.geometry.location);
				  
				  localStorage.setItem("CurentLatitude", place.geometry.location.lat());
				  localStorage.setItem("CurentLongitude", place.geometry.location.lng());
				  localStorage.setItem("CurrentLocationText",document.getElementById('search-text-box').value);
				  				  
				  var service = new google.maps.places.PlacesService(map);
				  service.nearbySearch({
					  location: place.geometry.location,
					  radius: 500,
					  type: ['liquor_store']
					}, callbackMap);
				  
				  //alert(place.geometry.location.lat());
			  });
	
	///////////////
			  
        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: pyrmont,
          radius: 500,
          type: ['restaurant']
        }, callbackMap);
}
		
function callbackMap(results, status) 
{
	if (status == google.maps.places.PlacesServiceStatus.OK) 
	{
			//alert(localStorage.getItem("CurrentView"));
			if(localStorage.getItem("CurrentView")=="map")
			{
				//alert("Map View");
				for (var i = 0; i < results.length; i++) 
					createMarker(results[i]);
			}	
		}
}

function callbackList(results, status) 
{
	
	if (status == google.maps.places.PlacesServiceStatus.OK) 
	{
			if(localStorage.getItem("CurrentView")=="list")
			{
				//alert("List View");
				for (var i = 0; i < results.length; i++) 
					createList(results[i]);
			}		
		}
}

function createMarker(place) 
{
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
}

function createList(place)
{
	    //$.mobile.loading("show");

//alert(place.icon);

//https://developers.google.com/maps/documentation/javascript/reference#PlaceResult

var hotels = '<ons-list-item modifier="chevron" class="list-item-container"><ons-row>';
var stars_percent = (place.rating/5)*100;
var photo='<ons-col width="95px"><img src="'+place.icon+'" class="thumbnail"></ons-col>';

var locationName='<ons-col><div class="name">'+place.name+'</div>';
var address='<div class="location"><i class="fa fa-map-marker"></i>' + place.vicinity+'</div>';
var description='<div class="desc">Description</div></ons-col>';
var url='<ons-col width="40px" onClick="alert(\''+place.place_id+'\')"></ons-col>';		

hotels+=photo+locationName+address+description+url;
hotels += '</ons-row></ons-list-item>';
	
restaurantList = document.getElementById("restaurants");
restaurantList.innerHTML = restaurantList.innerHTML+hotels;
}