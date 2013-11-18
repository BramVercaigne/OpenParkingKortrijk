
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

			

			switch (true) {
				case (free < full):
					status = "danger";
					break;
				case (free < warning):
					status = "warning";
					break;
				case (free < cap):
					status = "success";
					break;
			}


			html += 
				"<div class='panel panel-"+status+"'>"+
					"<div class='panel-heading'>"+
						"<h3 class='panel-title'>"+
							data.bezettingparkings.parking[i].parking+
							"<span id='km-" + data.bezettingparkings.parking[i].parking + "' class='badge pull-right'>"+
								
							"</span>"+ 
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
		getLocation();
	}
}));

function getLocation()
  {
  if (navigator.geolocation)
    {
    navigator.geolocation.watchPosition(showPosition);
    }
  else{x.innerHTML="Geolocation is not supported by this browser.";}
  }
function showPosition(position)
  {
  ($.ajax({
	url: 'http://data.drk.be/parko/parkoinfo.json',
	dataType: 'json',
	success: function (info){
		
		for (var i=0;i<info.parkoinfo.Authority.Operator.OffstreetParking.length;i++){
			var km = getDistanceFromLatLonInKm(position.coords.latitude, position.coords.longitude, info.parkoinfo.Authority.Operator.OffstreetParking[i].GeneralInfo.GeoLocation.Latitude, info.parkoinfo.Authority.Operator.OffstreetParking[i].GeneralInfo.GeoLocation.Longitude);
			km = Math.round(km * 100) / 100;
			document.getElementById("km-"+info.parkoinfo.Authority.Operator.OffstreetParking[i].GeneralInfo.IDInfo.Name).innerHTML = "<span class='glyphicon glyphicon-road'></span>" + " " +km + " km / sp: " + position.coords.speed;
			
			//alert(position.coords.latitude+","+ position.coords.longitude+"&"+latparking+","+longparking);
		}
	}
}));
  }


