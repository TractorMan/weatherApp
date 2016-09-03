weather = {
	tempC: 0,
	tempF: 0,
	unit: "C",
	lat: 0,
	long: 0,
 	icon: "none"
	
}



var getLocation = function() {
	
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
	
    }
	 else {
    
	   alert("Geolocation is not supported by this browser.");
   
    
	}
	
}



var showPosition = function (position) {
	weather.lat = (position.coords.latitude);
	weather.long = (position.coords.longitude);
	
	console.log("Latitude: " + weather.lat+  "\nLongitude: " + weather.long);

	getWeather();
	
}


var getWeather = function(){
	
	$.get("http://api.openweathermap.org/data/2.5/weather?appid=9fd7753a46f3a016a3f5eb7d63ffe253&lat="+weather.lat+"&lon="+weather.long, function(json){
		
		weather.name=(json.weather[0].main);
		console.log(weather.name);
		iconGet(weather.name);
		
		weather.tempC = Math.ceil((json.main.temp)-273);
		weather.tempF=Math.ceil(weather.tempC*9/5+32)

		$(".temp").html(weather.tempC+"°C");
		
		weather.place = (json.name)
		console.log(weather.place)
		$(".place").html(weather.place);
	})
	
	
	
}

var iconGet = function(name){
	
	switch(name) {
	    case "Clear":
	        $(".icon").attr("src","clear.svg")
	        break;
	    case "Clouds":
	         $(".icon").attr("src","clouds.svg")
	        break;
	    case "Rain":
	        $(".icon").attr("src","rain.svg")
	        break;
	    case "Drizzle":
	         $(".icon").attr("src","rain.svg")
	        break;
	    case "Snow":
	        $(".icon").attr("src","snow.svg")
	        break;
	    case "Thunderstorm":
	         $(".icon").attr("src","storm.svg")
	        break;
	    case "Extreme":
	         $(".icon").attr("src","wind.svg")
	        break;
			
	    default:
	       $(".icon").attr("src","fewclouds.svg")
	}
	
	
	
}

var buttonPress = function(){
	
	$(".temp").click(function(){
		console.log("click")
		switchUnit();
	
	})
	
	
}


var switchUnit = function(){
	
	if (weather.unit == "C"){
		weather.unit = "F";
		$(".temp").html(weather.tempF+"°F");
		
	}
	
	else{
		weather.unit = "C";
		$(".temp").html(weather.tempC+"°C");
		
	}
	
}


var main = function(){
	
	getLocation();
	buttonPress();
	
	
	
}


$(document).ready(main);

