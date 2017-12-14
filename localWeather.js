$("#geoNavigator").on("click",findMyLoc);
$("#cityStateLoc").on("click",function() {
  loadWeather($("input[type='text']").val());
  $("input[type='text']").val("");
});

function findMyLoc() {
	// Geolocation is NOT supported
  if (!navigator.geolocation) {
		console.log("Geolocation is not supported by this browser");
		return;
	}
	// Gathers current location's position
	navigator.geolocation.getCurrentPosition(loadWeather);
}

function loadWeather(position) {
  // Check whether geonavigator object or input type string is passed in
  if (typeof position === 'object') {
    position = position.coords.latitude + ',' + position.coords.longitude;    
  }
  
	// Gathers weather information
	$.simpleWeather({
		location: position,
		unit: 'f', 
		success: function(weather) {
      var tempSwap = false;      
			$("#location").text(weather.city + ',' + weather.region);
			var fahrenheit = parseInt(weather.temp);
			var celsius = ((fahrenheit-32)*5/9).toFixed(0);
      if (weather.temp > 75) {
        $('body').css("background","#F7AC57");
      } else {
        $('body').css("background","#0091c2");
      }
			$("#temp").text(fahrenheit + '\xB0 F');
			$("#temp").on("click",function(){
				if (tempSwap === false) {
					$("#temp").text(celsius + '\xB0 C');
					$("#tempUnit").text("Convert to Fahrenheit");
					tempSwap = true;
				} else {
					$("#temp").text(fahrenheit + '\xB0 F');
					$("#tempUnit").text("Convert to Celsius");
					tempSwap = false;
				}
			});

			$("#wind").text(weather.wind.direction + ' ' + weather.wind.speed + ' ' + weather.units.speed);
			$("#currCond").text(weather.currently);
		  $("#title").html('<h1><img src='+weather.thumbnail+'> Local Weather App</h1>')},
		error: function(error) {
			alert(error);
		}
	});
}