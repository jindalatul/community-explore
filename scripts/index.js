var geocoder;
var map;
var category;
var search;
var placesListingData;

var AutoCompleteOptions = {
		types: ['geocode'],
		componentRestrictions: { country: "us" }
		};
	
var input = document.getElementById('location-search-textbox');
var autocomplete = new google.maps.places.Autocomplete(input,AutoCompleteOptions);
	  
	    autocomplete.addListener('place_changed', function(){
				  
		var place = autocomplete.getPlace();
		alert("List place Changed");
		
		//document.getElementById("latitude").value=place.geometry.location.lat();
		//document.getElementById("longitude").value=place.geometry.location.lng();
		
		//fetchResultsFromAPI();
		
		//alert(placesListingData);
		
		//document.getElementById("restaurants").innerHTML = "";
				  
		// localStorage.setItem("CurentLatitude", place.geometry.location.lat());
		// localStorage.setItem("CurentLongitude", place.geometry.location.lng());

// localStorage.setItem("CurrentLocationText",document.getElementById('location-search-textbox').value);
		});