# Earthquake Visualization

This is a visual presentation of earthquakes that took place in last 7 days on our planet. Size and color of markers change according to magnitude. Data is being pulled from external source via API request in JSON format. Data updates every 5 minutes: https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson

As a bonus, borders of tectonic plates are plotted to this map as well. So we can determine if earthquakes are common to areas around edges of tectonic plates. That data obtained in geoJson format: https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json

Control function been added to the map as well as legend.

Deployed version: https://olegmrnv.github.io/Earthquake-Visualization/
