// Creating map object
var myMap = L.map("map", {
  center: [20, -40],
  zoom: 3
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a> created by Oleg Mironov ",
  maxZoom: 30,
  id: "mapbox.satellite",
  accessToken: API_KEY
}).addTo(myMap);


var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

function choseColor(d) {
  return d < 1 ? '#edf8fb' :
    d < 2 ? '#bfd3e6' :
      d < 3 ? '#9ebcda' :
        d < 4 ? '#8c96c6' :
          d < 5 ? '#8856a7' :
            '#810f7c';
}

d3.json(url, function (data) {

  var earthquakeMarkers = [];

  data.features.forEach((item) => {
    var longitude = item.geometry.coordinates[0];
    var latitude = item.geometry.coordinates[1];
    earthquakeMarkers.push(L.circle([latitude, longitude], {
      color: choseColor(item.properties.mag),
      fillColor: choseColor(item.properties.mag),
      fillOpacity: 0.8,
      radius: 30000 * item.properties.mag
    }).bindPopup("<h1> Magnitude: " + item.properties.mag + "</h1>"));
  });

  var cityLayer = L.layerGroup(earthquakeMarkers).addTo(myMap);

  var legend = L.control({ position: 'bottomright' });
  legend.onAdd = function () {
    var div = L.DomUtil.create("div", "info legend");
    var grades = [0, 1, 2, 3, 4, 5]
    var labels = ['<strong> Magnitude</strong><br><br>'];




  div.innerHTML += labels;
    for (var i = 0; i < grades.length; i++) {
      div.innerHTML +=
        '<i style="background:' + choseColor(grades[i]+0.1) + '">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</i> ' +
        '&nbsp' + grades[i] +'&nbsp' + (grades[i + 1] ? '&ndash;&nbsp' + (grades[i]+ 0.9) + ' <br>' : '+');
    }
    return div;
  };



  legend.addTo(myMap);

});

