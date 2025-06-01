import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";

import markerIconUrl from "leaflet/dist/images/marker-icon.png";
import markerIconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import markerShadowUrl from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIconRetinaUrl,
  iconUrl: markerIconUrl,
  shadowUrl: markerShadowUrl,
});

const LocationMarker = ({ onSelect, center, radius }) => {
  const [position, setPosition] = React.useState(center || null);

  useEffect(() => {
    setPosition(center); // Update position when center changes
  }, [center]);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onSelect(e.latlng);
    },
  });

  return position ? (
    <>
      <Marker position={position} />
      {radius && (
        <Circle center={position} radius={radius} color="blue" opacity={0.5} />
      )}
    </>
  ) : null;
};

const CenterMap = ({ center, zoomLevel }) => {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, zoomLevel); // Move the map to the new position
    }
  }, [center, map, zoomLevel]);

  return null;
};

const MapSelector = ({ onSelect, center, radius }) => {
  const [zoomLevel, setZoomLevel] = useState(6);

  useEffect(() => {
    if (radius) {
      const zoom = radius > 5000 ? 6 : radius > 2000 ? 8 : 12;
      setZoomLevel(zoom);
    }
  }, [radius]);

  return (
    <MapContainer
      center={center || [14.0583, 108.2772]} // Default coordinates if center is not passed
      zoom={zoomLevel}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <LocationMarker onSelect={onSelect} center={center} radius={radius} />
      <CenterMap center={center} zoomLevel={zoomLevel} />
    </MapContainer>
  );
};

export default MapSelector;
