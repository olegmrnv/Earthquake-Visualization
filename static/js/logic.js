

// Creating different Layers
var satellite_map = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a> created by Oleg Mironov ",
  maxZoom: 30,
  id: "mapbox.satellite",
  accessToken: API_KEY
});

var light_map = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a> created by Oleg Mironov ",
  maxZoom: 30,
  id: "mapbox.light",
  accessToken: API_KEY
});

var dark_map = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a> created by Oleg Mironov ",
  maxZoom: 30,
  id: "mapbox.dark",
  accessToken: API_KEY
});


// Creating map object and set default layers
var myMap = L.map("map", {
  center: [20, -40],
  zoom: 3,
  layers: [dark_map]
});


// url from which we will get earthquake data
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// function to select color depending on magnitude
function choseColor(d) {
  return d < 1 ? '#edf8fb' :
    d < 2 ? '#bfd3e6' :
      d < 3 ? '#9ebcda' :
        d < 4 ? '#8c96c6' :
          d < 5 ? '#8856a7' :
            '#810f7c';
}


// receiving earthquake data and creating layer of circles with different colors and sizes
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

  var earthquakeLayer = L.layerGroup(earthquakeMarkers).addTo(myMap);


  //creating legend and adding it to map
  var legend = L.control({ position: 'bottomright' });
  legend.onAdd = function () {
    var div = L.DomUtil.create("div", "info legend");
    var grades = [0, 1, 2, 3, 4, 5]
    var labels = ['<strong> Magnitude</strong><br><br>'];
    div.innerHTML += labels;
    for (var i = 0; i < grades.length; i++) {
      div.innerHTML +=
        '<i style="background:' + choseColor(grades[i] + 0.1) + '">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</i> ' +
        '&nbsp' + grades[i] + '&nbsp' + (grades[i + 1] ? '&ndash;&nbsp' + (grades[i] + 0.9) + ' <br>' : '+');
    }
    return div;
  };
  legend.addTo(myMap);


  // getting GeoJson data on tectonic plates
  new_url = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";
  d3.json(new_url, function (new_data) {
    var plates_layer = L.geoJson(new_data).addTo(myMap);
  
  // Only one base layer can be shown at a time
  var baseMaps = {
    "Light Map": light_map,
    "Dark Map": dark_map,
    "Satellite Map": satellite_map
  };

  // Overlays that may be toggled on or off
  var overlayMaps = {
    "Earthquakes": earthquakeLayer,
    "Tectonic plates": plates_layer
  };


  // Pass our map layers into our layer control
  // Add the layer control to the map

  L.control.layers(baseMaps, overlayMaps, {collapsed:false}).addTo(myMap);
  
    // closing d3 geoJson request 
  });
  // closing d3 earthquake request
});


