This is the frontend served at https://map.project-osrm.org.

This frontend is builds heavily ontop of [Leaflet Routing Machine](https://github.com/perliedman/leaflet-routing-machine). If you need a simple OSRM integration in your webpage, you should start from there.

# Building

Run this in the root folder:

```bash
npm install
make
```

To view the frontend in a browser, try `python -m SimpleHTTPServer` (Python 2)
or `python -m http.server` (Python 3) and open your browser at `http://127.0.0.1:8000`.


# Modifing

The most common modifcation is to add your own OSRM endpoint. For this open `src/leaflet_options.js`:

```
  services: [{
    label: 'Car (fastest)',
    path: 'http://api-osrm-routed-patrick-develop.tilestream.net/route/v1'
  }],

```

Replace the path with whatever your endpoint looks like.

After this run `make` again.


# Debug Interface

There is a debug interface for osrm-backend, accessible at http://127.0.0.1:8000/debug .
It shows the edges of the graph, with the speed, and in pink the  "small components",
areas of the road network that are isolated from the rest for some reason
(invalid turn restrictions, barriers, disconnected, incorrect oneways, etc)
and are discarded in the routing machine.

Warning : If you want to debug your own osrm-backend, you have to edit debug/index.html
and change http://router.project-osrm.org/tile/v1/car/tile to your own endpoint.
