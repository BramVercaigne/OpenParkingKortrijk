var longitude = 0;
var latitude = 0;
var html = "";

var plaatsen = new Array();


($.ajax({
	url: 'http://data.drk.be/parko/shopandgo.json',
	dataType: 'json',
	success: function (data){
		// plaatsen array opvullen met verschillende locaties
		for (var i=0;i<data.shopandgo.Sensor.length;i++){

			if (data.shopandgo.Sensor[i].Sensor != "Unknown"){

				if (($.inArray(data.shopandgo.Sensor[i]._Street, plaatsen)) == -1){
						plaatsen.push(data.shopandgo.Sensor[i]);
				}
			}
		}

		alert(plaatsen);
		
		//document.getElementById("shopandgo").innerHTML = html;
	}
}));

