import React from "react";
import "./Home.css";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import LocationMarker from "./LocationMarker";

function Home() {
  const position = [51.505, -0.09];
  return (
    <div className="main-container">
      <div>
        <h1>IP Address Tracker</h1>
      </div>
      <div>
        <MapContainer
          center={{ lat: 51.505, lng: -0.09 }}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker />
        </MapContainer>
        ,
      </div>
    </div>
  );
}

export default Home;
