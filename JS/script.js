($.ajax({
	url: 'http://data.drk.be/parko/bezettingparkings.json',
	dataType: 'json',
	success: function (data){
		var html = "";
		for (var i=0;i<data.bezettingparkings.parking.length;i++){
			//alert(data.bezettingparkings.parking[i].parking);
			var status = "";
			var free = data.bezettingparkings.parking[i]._vrij;
			var cap = data.bezettingparkings.parking[i]._capaciteit
			var warning = data.bezettingparkings.parking[i]._capaciteit * 0.2;
			var full = data.bezettingparkings.parking[i]._capaciteit * 0.1;

			if (free < full){
				status = "danger";
			}else if (free < warning){
				status = "warning";
			}else if (free < cap){
				status = "success";
			}

			html += 
				"<div class='panel panel-"+status+"'>"+
					"<div class='panel-heading'>"+
						"<h3 class='panel-title'>"+
							data.bezettingparkings.parking[i].parking+
							"<span class='badge pull-right'>"+
								data.bezettingparkings.parking[i]._vrij+
							"</span>"+
						"</h3>"+
					"</div>"+
					"<div class='panel-body'>"+
						"<p>" +
							data.bezettingparkings.parking[i]._vrij+"/"+data.bezettingparkings.parking[i]._capaciteit+
						"</p>"+
					"</div>"+
				"</div>"
			;
			
		}
		document.getElementById("parking").innerHTML = html;
	}
}));

getLocation();

// function getLocation()
//   {
//   if (navigator.geolocation)
//     {
//     navigator.geolocation.getCurrentPosition(showPosition);
//     }
//   else{alert("Geolocation is not supported by this browser.");}
//   }
// function showPosition(position)
//   {
//   alert("Latitude: " + position.coords.latitude + 
//   "<br>Longitude: " + position.coords.longitude); 
//   }

var latLngA = 0;
var latLngB = 0;

function getLocation() {
  navigator.geolocation.getCurrentPosition(
            function(position) {
                latLngA = position.coords.latitude;
                alert(latLngA);
                latLngB = position.coords.longitude;
                alert(getDistanceFromLatLonInKm(latLngA, latLngB, 50.82573, 3.26156))
            },
            function() {
                alert("geolocation not supported!!");
            }
    );

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

}