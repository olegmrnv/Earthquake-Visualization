// Creating map object
var myMap = L.map("map", {
  center: [20, -40],
  zoom: 3
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 30,
  id: "mapbox.satellite",
  accessToken: API_KEY
}).addTo(myMap);


var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

function choseColor(magnitude){
  if (magnitude <= 1){ return "green"}
  else if (magnitude <= 2){ return "yellow"}
  else if (magnitude <= 3){return "orange"}
  else if (magnitude <= 4){return "red"}
  else if (magnitude <= 5){return "brown"}
  else {return "black"}
}

d3.json(url, function(data){
  var geojson = data.features;
  var earthquakeMarkers = [];
  
  geojson.forEach((item) => {
    var longitude = item.geometry.coordinates[0];
    var latitude = item.geometry.coordinates[1];
    earthquakeMarkers.push(L.circle([latitude,longitude],{
      color: choseColor(item.properties.mag),
      fillColor: choseColor(item.properties.mag),
      fillOpacity: 0.8,
      radius: 20000 * item.properties.mag
    }).bindPopup("<h1> Mgnitude: " + item.properties.mag + "</h1>"));
  });
  
  var cityLayer = L.layerGroup(earthquakeMarkers).addTo(myMap);
  

});

