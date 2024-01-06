import React, { useEffect, useState } from "react";
import "./Home.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { IoIosArrowForward } from "react-icons/io";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function Home() {
  const [ipInfo, setIpInfo] = useState(null);
  const [ipAddress, setIpAddress] = useState("");
  const [position, setPosition] = useState({
    lat: 51.505,
    lon: -0.09,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.ipify.org/?format=json");
        setIpAddress(response.data.ip);
      } catch (error) {
        console.error("Error fetching IP data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(ipAddress);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://ip-api.com/json/${ipAddress}`);
      setIpInfo(response.data);

      // Assuming response.data has lat and lon properties
      setPosition({
        lat: response.data.lat,
        lon: response.data.lon,
      });
    } catch (error) {
      console.error("Error fetching IP information:", error.message);
    }
  };

  const dummyPosition = [51.505, -0.09];

  return (
    <div className="main-container">
      <div className="search-container">
        <h1>IP Address Tracker</h1>
        <form onSubmit={handleSearch}>
          <input
            className="search-input-box"
            type="text"
            placeholder="Enter ip address . . ."
            required
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
          />
          <button type="submit">
            <IoIosArrowForward size={25} />
          </button>
        </form>
      </div>
      {ipInfo && (
        <>
          <div className="result-container">
            <div className="result-container-child">
              <span className="title-span">IP ADDRESS</span>
              <span className="info-span">{ipInfo.query}</span>
            </div>
            <div className="result-container-child">
              <span className="title-span">LOCATION</span>
              <span className="info-span">
                {" "}
                {ipInfo.city}, {ipInfo.regionName}, {ipInfo.country}
              </span>
            </div>
            <div className="result-container-child">
              <span className="title-span">TIMEZONE</span>
              <span className="info-span">{ipInfo.timezone}</span>
            </div>
            <div className="result-container-child">
              <span className="title-span">ISP</span>
              <span className="info-span">{ipInfo.isp}</span>
            </div>
          </div>
          <div className="map-container">
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
            ,
          </div>
        </>
      )}
      {!ipInfo && (
        <>
          <div className="result-container">
            <div className="result-container-child">
              <span className="title-span">IP ADDRESS</span>
              <span className="info-span">127.101.131.11</span>
            </div>
            <div className="result-container-child">
              <span className="title-span">LOCATION</span>
              <span className="info-span">New York, USA</span>
            </div>
            <div className="result-container-child">
              <span className="title-span">TIMEZONE</span>
              <span className="info-span">UTC - 5:00</span>
            </div>
            <div className="result-container-child">
              <span className="title-span">ISP</span>
              <span className="info-span">SpaceX</span>
            </div>
          </div>
          <div className="map-container">
            <MapContainer
              center={dummyPosition}
              zoom={13}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={dummyPosition}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </>
      )}
      {loading ? (
        <Backdrop
          sx={{
            color: "#ffffff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        ""
      )}
    </div>
  );
}

export default Home;
