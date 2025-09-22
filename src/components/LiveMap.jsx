import React, { useEffect, useState } from "react";
import MarkerClusterGroup from "react-leaflet-cluster";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import L from "leaflet";
import { Link } from "react-router-dom";

// Fix Leaflet default marker issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// 🔴 Red icon for complaints
const redIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

// Component to recenter map when a location is selected
function RecenterMap({ coords }) {
    const map = useMap();
    useEffect(() => {
        if (coords) {
            map.flyTo(coords, 12);
        }
    }, [coords, map]);
    return null;
}

const LiveMap = ({ selectedLocation }) => {
    const [complaints, setComplaints] = useState([]);
    useEffect(() => {
        fetchComplaints();
    }, []);

    async function fetchComplaints() {
        try {
            const res = await axios.get("http://localhost:8080/complaints");
            console.log(res)
            setComplaints(res.data);
        } catch (err) {
            console.error("Error fetching complaints:", err);
        }
    }

    
    return (
        <div className="w-[80%] mx-auto mt-5 mb-10 border-2 border-black rounded-md overflow-hidden">
            <div className="w-full h-[400px]">
                <MapContainer
                    center={[20, 0]} // world view by default
                    zoom={2}
                    className="w-full h-full z-0"
                    scrollWheelZoom={true}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {/* Show selected city marker if passed */}
                    {selectedLocation && (
                        <Marker position={selectedLocation}>
                            <Popup>Selected City</Popup>
                        </Marker>
                    )}

                    {/* Render complaints as red markers */}
                    <MarkerClusterGroup
                        iconCreateFunction={(cluster) => {
                            const count = cluster.getChildCount();
                            return L.divIcon({
                                html: `<div style="
                                                background-color: rgba(255,0,0,0.7);
                                                color: white;
                                                border-radius: 50%;
                                                width: 30px;
                                                height: 30px;
                                                display: flex;
                                                align-items: center;
                                                justify-content: center;
                                                font-size: 14px;
                                                font-weight: bold;
                                            ">${count}</div>`,
                                className: "custom-cluster-icon",
                                iconSize: L.point(30, 30, true), // smaller size
                            });
                        }}
                    >
                        {complaints.map((c) => (
                            <Marker
                                key={c.id}
                                position={[c.latitude, c.longitude]}
                                icon={redIcon}
                            >

                                <Link to={`/complain/${c.id}`}>
                                    <Popup ><strong className="hover:cursor-pointer">{c.title}</strong></Popup>
                                </Link>



                            </Marker>
                        ))}
                    </MarkerClusterGroup>



                    <RecenterMap coords={selectedLocation} />
                </MapContainer>
            </div>
        </div>
    );
};

export default LiveMap;
