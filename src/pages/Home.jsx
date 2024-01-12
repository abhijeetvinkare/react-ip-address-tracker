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

  

  const handleSearch = (e) => {
    e.preventDefault();

    // Basic IP address validation
    const isIPValid = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(ipAddress);

    if (!isIPValid) {
      alert("Invalid IPv4 address");
      return;
    }

    setLoading(true);

    axios
      .get(`http://ip-api.com/json/${ipAddress}`)
      .then((response) => {
        if (
          response.data.status === "fail" &&
          response.data.message === "reserved range"
        ) {
          alert(
            "The provided IP address is in a reserved range and cannot be used for regular internet routing."
          );
        } else {
          setIpInfo(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching IP information:", error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

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
      {ipInfo &&  (
        <>
          <div className="result-container" style={{ marginBottom: "-92px" }}>
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
            <MapContainer
              center={[ipInfo.lat, ipInfo.lon]}
              zoom={13}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[ipInfo.lat, ipInfo.lon]}>
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
              center={[51.505, -0.09]}
              zoom={13}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[51.505, -0.09]}>
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
