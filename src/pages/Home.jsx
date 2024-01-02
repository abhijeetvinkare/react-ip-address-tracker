import React from "react";
import "./Home.css";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";

function Home() {
  const position = [51.505, -0.09]
  return (
    <div className="main-container">
      <div>
        <h1>IP Address Tracker</h1>
      </div>
      <div>
        <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default Home;
