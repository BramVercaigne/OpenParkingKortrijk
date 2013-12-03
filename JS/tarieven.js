alert("start");

var bezetting =  null;

$.ajax({
    url: 'http://data.drk.be/parko/bezettingparkings.json',
    dataType: 'json',
    async: false,
    success: function(data) {
        bezetting = data;
    }
});

function bram(){
	for (var i = 0; bezetting.bezettingparkings.parking.length;i++){
		alert(bezetting.bezettingparkings.parking[i].parking);
	}
}

bram();