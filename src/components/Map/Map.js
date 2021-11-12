import React from "react";
import { MapContainer as LeafletMap, TileLayer, useMap } from "react-leaflet";
import { showDataOnMap } from "../../uitls";
import "./Map.css";

function ChangeMapView({ coords }) {
  const map = useMap();
  map.setView([coords.lat, coords.lng], map.getZoom());

  return null;
}
function Map({ countries, casesType, center, zoom }) {
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Loop through and draw circles on screen */}
        {showDataOnMap(countries,casesType)}
        <ChangeMapView coords={center} />
      </LeafletMap>
    </div>
  );
}

export default Map;
