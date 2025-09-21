import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Default blue marker fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Red icon for problems
const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function RecenterMap({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.flyTo(coords, 12); // smooth animation
    }
  }, [coords, map]);
  return null;
}

// Dummy problems
const problemsData = {
  "London, England, United Kingdom": [
    { id: 1, lat: 51.51, lon: -0.1, description: "Potholes on road" },
    { id: 2, lat: 51.515, lon: -0.08, description: "Garbage not collected" },
  ],
  "Paris, Île-de-France, France": [
    { id: 1, lat: 48.8566, lon: 2.3522, description: "Broken streetlight" },
    { id: 2, lat: 48.85, lon: 2.34, description: "Water leakage" },
  ],
  "Paris, Texas, United States": [
    { id: 1, lat: 33.66, lon: -95.55, description: "Roadside trash" },
    { id: 2, lat: 33.67, lon: -95.55, description: "Flooded street" },
  ],
};

const LiveMap = ({ selectedLocation, selectedCity }) => {
  const cityProblems = selectedCity ? problemsData[selectedCity] || [] : [];

  return (
    <div className="w-[80%] mx-auto mt-5 border-2 border-black rounded-md overflow-hidden">
      <div className="w-full h-[400px]">
        <MapContainer
          center={[51.505, -0.09]}
          zoom={5}
          className="w-full h-full z-0"
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* City marker */}
          {selectedLocation && (
            <Marker position={selectedLocation}>
              <Popup>Selected City</Popup>
            </Marker>
          )}

          {/* Problems markers */}
          {cityProblems.map((problem) => (
            <Marker
              key={problem.id}
              position={[problem.lat, problem.lon]}
              icon={redIcon}
            >
              <Popup>{problem.description}</Popup>
            </Marker>
          ))}

          <RecenterMap coords={selectedLocation} />
        </MapContainer>
      </div>
    </div>
  );
};

export default LiveMap;
