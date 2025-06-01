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

// Cấu hình icon mặc định cho Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIconRetinaUrl,
  iconUrl: markerIconUrl,
  shadowUrl: markerShadowUrl,
});

const LocationMarker = ({ onSelect, center, radius }) => {
  const [position, setPosition] = useState(center || null);

  useEffect(() => {
    if (center) setPosition(center);
  }, [center]);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onSelect?.(e.latlng);
    },
  });

  if (!position) return null;

  return (
    <>
      <Marker position={position} />
      {radius && (
        <Circle center={position} radius={radius} color="blue" opacity={0.5} />
      )}
    </>
  );
};

const CenterMap = ({ center, zoomLevel }) => {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, zoomLevel);
    }
  }, [center, zoomLevel, map]);

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

  const initialCenter =
    center?.lat && center?.lng ? [center.lat, center.lng] : [14.0583, 108.2772]; // Vị trí mặc định là Việt Nam

  return (
    <MapContainer
      center={initialCenter}
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
