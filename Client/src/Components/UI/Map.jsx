import { useEffect, useRef, useState, useCallback } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Icon, Style } from "ol/style";
import { transform } from "ol/proj";

const MapComponent = () => {
  const [position, setPosition] = useState(null);
  const mapRef = useRef();
  function openGoogleMaps() {
    const url = `https://www.google.com/maps?q=${position.lat},${position.lon}`;
    window.open(url, "_blank");
  }
  const initializeMap = useCallback(() => {
    if (position && mapRef.current) {
      // Convert coordinates to Web Mercator projection
      const [mercatorLon, mercatorLat] = transform(
        [position.lon, position.lat],
        "EPSG:4326", // Geographic coordinates
        "EPSG:3857" // Web Mercator projection
      );

      // Create a map
      const map = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: [mercatorLon, mercatorLat],
          zoom: 17, // Adjust zoom level as needed
          projection: "EPSG:3857",
        }),
      });

      // Create and style the marker
      const marker = new Feature({
        geometry: new Point([mercatorLon, mercatorLat]),
      });

      marker.setStyle(
        new Style({
          image: new Icon({
            src: "https://openlayers.org/en/latest/examples/data/icon.png",
            scale: 1, // Adjust scale for performance
          }),
        })
      );

      const vectorSource = new VectorSource({
        features: [marker],
      });

      const markerLayer = new VectorLayer({
        source: vectorSource,
      });

      map.addLayer(markerLayer);

      return () => map.setTarget(undefined); // Clean up the map on unmount
    }
  }, [position]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setPosition({ lat: latitude, lon: longitude });
        // setPosition({ lat: 28.575859, lon: 77.0797641 });
        console.log("Current Position:", { lat: latitude, lon: longitude }); // Log location data
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    initializeMap();
  }, [initializeMap]);

  return (
    <div onClick={openGoogleMaps} className="w-full h-full cursor-pointer">
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default MapComponent;
