
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

var bezetting =  null;
var info = null;

$.ajax({
    url: 'http://data.drk.be/parko/bezettingparkings.json',
    dataType: 'json',
    async: false,
    success: function(data) {
        bezetting = data;
    }
});

$.ajax({
    url: 'http://data.drk.be/parko/parkoinfo.json',
    dataType: 'json',
    async: false,
    success: function(data) {
        info = data;
    }
});

function laadParking(){
	var html = "";
	var lengthBezetting = bezetting.bezettingparkings.parking.length;
	for (var i=0;i<lengthBezetting;i++){
		var status = "";
		var free = bezetting.bezettingparkings.parking[i]._vrij;
		var cap = bezetting.bezettingparkings.parking[i]._capaciteit
		var warning = bezetting.bezettingparkings.parking[i]._capaciteit * 0.2;
		var full = bezetting.bezettingparkings.parking[i]._capaciteit * 0.1;
		var parkingNaam = bezetting.bezettingparkings.parking[i].parking;

		switch (true) {
			case (free < full):
				status = "danger";
				break;
			case (free < warning):
				status = "warning";
				break;					
			default:
				status = "success";
				break;
		}

		html += "<div class='panel panel-";
		html += status;
		html += "'>";
			html += "<div class='panel-heading'>";
				html += "<a data-toggle='collapse' data-parent='#accordion' href='#collapse"
				html += i;
				html += "'>";
					html += "<h4 class='panel-title'>";
			           	html += parkingNaam;
				           	html += "<span id='km-";
							html += parkingNaam;
							html += "' class='badge pull-right'>";
							html += "</span>";
							html += "<span class='badge pull-right'>";
							html += free;
							html += "</span>";
					html += "</h4>";	
	            html += "</a>";
            html += "</div>";

            html += "<div id='collapse"
	            html += i;
	            html += "' class='panel-collapse collapse'>"
					html += "<div class='panel-body'>";
						html += "<div id='panel";
						html += parkingNaam;
						html += "'></div>";
					html += "</div>";
			html += "</div>";
		html += "</div>";
	}
	document.getElementById("accordion").innerHTML = html;

		
}

function getLocation(){
  if (navigator.geolocation){
    navigator.geolocation.watchPosition(showPosition);
  }
  else{
  	x.innerHTML="Geolocation is not supported by this browser.";
  }
}


function showPosition(position){
	var jsonBram;
  	($.ajax({
		url: 'http://data.drk.be/parko/parkoinfo.json',
		dataType: 'json',
		success: function (info){
			var lengthInfo = info.parkoinfo.Authority.Operator.OffstreetParking.length;
			for (var i=0;i<lengthInfo;i++){
				var km = getDistanceFromLatLonInKm(position.coords.latitude, position.coords.longitude, info.parkoinfo.Authority.Operator.OffstreetParking[i].GeneralInfo.GeoLocation.Latitude, info.parkoinfo.Authority.Operator.OffstreetParking[i].GeneralInfo.GeoLocation.Longitude);
				km = Math.round(km * 100) / 100;
				var speed = position.coords.speed;
				document.getElementById("km-"+info.parkoinfo.Authority.Operator.OffstreetParking[i].GeneralInfo.IDInfo.Name).innerHTML = "<span class='glyphicon glyphicon-road'></span>" + " " +km + " km / sp: " + speed;
				
			}
			
		}
	}));
  }

function panelInfo(){
	var lengthInfo = info.parkoinfo.Authority.Operator.OffstreetParking.length;
	for (var i=0;i<lengthInfo;i++){
		var htmlPanel = "";
		htmlPanel += "<div class='col-xs-8 col-sm-8'>";
			htmlPanel += "<p>"
				htmlPanel += info.parkoinfo.Authority.Operator.OffstreetParking[i].GeneralInfo.Address.StreetName;
			htmlPanel += "</p>"
			htmlPanel += "<p>"
				htmlPanel += info.parkoinfo.Authority.Operator.OffstreetParking[i].GeneralInfo.Address.PostalCode;
				htmlPanel += " ";
				htmlPanel += info.parkoinfo.Authority.Operator.OffstreetParking[i].GeneralInfo.Address.Location;
			htmlPanel += "</p>"
		htmlPanel += "</div>";
		htmlPanel += "<div class='col-xs-4 col-sm-4'>";
			htmlPanel += "<p>"
				htmlPanel += "<button type='button' class='btn btn-default' id='btn";
				htmlPanel += info.parkoinfo.Authority.Operator.OffstreetParking[i].GeneralInfo.IDInfo.Name;
				htmlPanel += "'>"
				htmlPanel += "Navigeren";
				htmlPanel += "</button>"
			htmlPanel += "</p>"
			htmlPanel += "<p>"
				htmlPanel += "<button type='button' class='btn btn-default' id='btn";
				htmlPanel += info.parkoinfo.Authority.Operator.OffstreetParking[i].GeneralInfo.IDInfo.Name;
				htmlPanel += "'>"
				htmlPanel += "Start timer";
				htmlPanel += "</button>"
			htmlPanel += "</p>"
		htmlPanel += "</div>";

		document.getElementById("panel"+info.parkoinfo.Authority.Operator.OffstreetParking[i].GeneralInfo.IDInfo.Name).innerHTML = htmlPanel; 
		
	}
			
}

    laadParking();
panelInfo();
getLocation();
