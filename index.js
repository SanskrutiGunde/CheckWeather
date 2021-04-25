var api = "https://fcc-weather-api.glitch.me/api/current?";
var lat, lon;
var tempUnit = "C";
var currentTempCelsius;

navigator.geolocation.getCurrentPosition(function (position) {
  var lat = "lat=" + position.coords.latitude;
  var lon = "lon=" + position.coords.longitude;
  getWeather(lat, lon);
});

function getWeather(lat, lon) {
  var urlString = api + lat + "&" + lon;

  $.ajax({
    url: urlString,
    success: function (result) {
      $("#city").text(result.name);
      $("#country").text(result.sys.country);
      currentTempCelsius = Math.round(result.main.temp * 10) / 10;
      $("#temp").text(result.main.temp);
      $("#tempUnit").text(tempUnit);
      $("#desc").text(result.weather[0].main);
    },
  });
}
