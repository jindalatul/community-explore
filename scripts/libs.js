function changeDisplayMode()
{
	alert(1);
}
function setType(value)
{
	document.getElementById("businessType").value=value;
	fetchResultsFromAPI();
	//alert(value);
}
function fetchResultsFromAPI()
{
var columns = 3;
/*
	alert(lat);
	alert(lng);
*/
	var lat=document.getElementById("latitude").value;
	var lng=document.getElementById("longitude").value;
	var type=document.getElementById("businessType").value;
	///alert(lat);
	//alert(lng);
	//alert(type);
	
	$.get( "http://tronixs.info/places/index.php", { lat: lat, lng: lng,type:type } )
		  .done(function( data ) {
			//alert(data);
			resultsDisplay = document.getElementById("resultsDisplay");
			resultsDisplay.innerHTML = "";
			for(var i=0;i<=data.results.length;i++)
			{
				
				createList(data.results[i]);
				
				//alert(data.results[i].name);
			}
		  });	
}

function createList(place)
{
	    //$.mobile.loading("show");

//alert(place.icon);

//https://developers.google.com/maps/documentation/javascript/reference#PlaceResult


var img_url ="https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&"+"photoreference="+place.photos[0].photo_reference+"&sensor=false&key=AIzaSyByADwYNWZd5OoQ0rMFU36MkJ4RUwV2iGY";
//alert(img_url);
var hotels=`<div class="col-sm-6 col-md-4">`+
				`<div class="thumbnail">`+
				  `<img src="`+img_url+`">`+
				  `<div class="caption">`+
					`<h2 class="result-content-title">`+ place.name +`</h2>`+
					`<p class="result-address"><i class="glyphicon glyphicon-map-marker"></i>`+ place.vicinity+`</p>`+
					`<p class="result-ratings">Ratings</p>`+
					`</div>`+
				`</div>`+
			  `</div>`;
			  
/*
var stars_percent = (place.rating/5)*100;

//var url='<div width="40px" onClick="alert(\''+place.place_id+'\')"></div>';		

*/	
resultsDisplay = document.getElementById("resultsDisplay");
resultsDisplay.innerHTML = resultsDisplay.innerHTML+hotels;
}