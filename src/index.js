"use strict";

var itineraryBuilder = require('./itinerary_builder.js');
var createGeocoder = require('./geocoder.js');
var theme = require('./directions_theme.js');
var links = require('./links.js');
var options = require('./options.js');
var tools = require('./tools.js');

var parsedOptions = links.parseLink(window.location.search);
console.log(parsedOptions);
var viewOptions = L.extend(options.viewDefaults, parsedOptions);

var mapbox = L.tileLayer('https://{s}.tiles.mapbox.com/v3/dennisl.4e2aab76/{z}/{x}/{y}.png',
    {attribution: '&copy; <a href="http://mapbox.com/">MapBox</a> &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}
    );

var map = L.map('map', {layers: [mapbox], zoomControl: false}).setView(viewOptions.center, viewOptions.zoom);

var baseMaps = {
  'Mapbox': mapbox,
};
L.control.layers(baseMaps).addTo(map);

var controlOptions = L.extend(options.controlDefaults, theme.options);

var lrm = L.Routing.control(controlOptions);
lrm.addTo(map);

var toolsControl = tools.control(lrm, {position: 'bottomleft', linkButtonClass: 'mapbox-directions-icon mapbox-link-icon'});
toolsControl.addTo(map);

theme.setup(lrm);

lrm.setWaypoints(viewOptions.waypoints);
