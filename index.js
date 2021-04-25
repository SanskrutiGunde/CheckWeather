var api = "https://fcc-weather-api.glitch.me/api/current?";
var lat, lon;
var tempUnit = "C";
var currentTempCelsius;

$(document).ready(function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var lat = "lat=" + position.coords.latitude;
      var lon = "lon=" + position.coords.longitude;
      getWeather(lat, lon);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
  //toggle temp unit
  $("#tempUnit").click(function () {
    var currentTempUnit = $("#tempUnit").text();
    var newTempUnit = currentTempUnit == "C" ? "F" : "C";
    $("#tempUnit").text(newTempUnit);
    if (newTempUnit == "F") {
      var fahTemp = Math.round((parseInt($("#temp").text()) * 9) / 5 + 32);
      $("#temp").text(fahTemp + " " + String.fromCharCode(176));
    } else {
      $("#temp").text(currentTempCelsius + " " + String.fromCharCode(176));
    }
  });
});

function getWeather(lat, lon) {
  var urlString = api + lat + "&" + lon;

  $.ajax({
    url: urlString,
    success: function (result) {
      $("#city").text(result.name);
      $("#country").text(result.sys.country);
      currentTempCelsius = Math.round(result.main.temp * 10) / 10;
      $("#temp").text(currentTempCelsius + " " + String.fromCharCode(176));
      $("#tempUnit").text(tempUnit);
      $("#desc").text(result.weather[0].main);
      IconGen(result.weather[0].main);
    },
  });
}

function IconGen(desc) {
  var desc = desc.toLowerCase();
  switch (desc) {
    case "drizzle":
      addIcon(desc);
      break;
    case "clouds":
      addIcon(desc);
      break;
    case "rain":
      addIcon(desc);
      break;
    case "snow":
      addIcon(desc);
      break;
    case "clear":
      addIcon(desc);
      break;
    case "thunderstom":
      addIcon(desc);
      break;
    default:
      $("div.clouds").removeClass("hide");
  }
}

function addIcon(desc) {
  $("div." + desc).removeClass("hide");
}
