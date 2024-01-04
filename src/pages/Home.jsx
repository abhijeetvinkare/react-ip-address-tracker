import React from "react";
import "./Home.css";
import { MapContainer, TileLayer } from "react-leaflet";
import LocationMarker from "./LocationMarker";
import { IoIosArrowForward } from "react-icons/io";

function Home() {
  return (
    <div className="main-container">
      <div className="search-container">
        <h1>IP Address Tracker</h1>
        <form action="">
          <input
            className="search-input-box"
            type="text"
            placeholder="Enter ip address . . ."
            required
          />
          <button>
            <IoIosArrowForward size={25} />
          </button>
        </form>
      </div>
      <div className="result-container">
        <div className="result-container-child">
          <span className="title-span">IP ADDRESS</span>
          <span className="info-span">192.218.174.101</span>
        </div>
        <div className="result-container-child">
          <span className="title-span">LOCATION</span>
          <span className="info-span">Brooklyn, NY 10001</span>
        </div>
        <div className="result-container-child">
          <span className="title-span">TIMEZONE</span>
          <span className="info-span">UTC - 05:00</span>
        </div>
        <div className="result-container-child">
          <span className="title-span">ISP</span>
          <span className="info-span">SpaceX</span>
        </div>
      </div>
      <div className="map-container">
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
