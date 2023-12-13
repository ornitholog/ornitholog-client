import service from "../services/geoCoder.service";
import chevron from "../src/assets/chevron-right.svg";
// import "../src/styles/ObservationDetails.scss";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

function ObservationDetails({ observation, summary }) {
  const [locationDetails, setLocationDetails] = useState({});
  const date = new Date(observation.date);

  const getGeoData = async (lat, long) => {
    try {
      const data = await service.geoCoder(lat, long);
      setLocationDetails(data);
    } catch (error) {
      console.error("Error fetching geo data:", error);
    }
  };

  useEffect(() => {
    getGeoData(
      observation.location.coordinates[1],
      observation.location.coordinates[0]
    );
  }, []);

  return (
    <div key={observation._id} className="observation-card">
      <img src={observation.photo}></img>
      <div className="info-summary">
        <div className="observation-date">
          {date.getDate()}-{date.getMonth() + 1}-{date.getFullYear()}
        </div>
        <h4>{observation.title}</h4>
        <h5>{observation.birdId.name}</h5>
        <p className="sciName">{observation.birdId.sciName}</p>

        <div>
          {locationDetails.city} - {locationDetails.countryName}
        </div>
        <div></div>
        <div className="more-info">
          <Link to={`/observations/${observation._id}`}>More Info</Link>
          <svg
            className="something"
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
          >
            <g class="nc-icon-wrapper" fill="currentColor">
              <path
                d="M4.781.375a1,1,0,0,0-1.562,1.25L6.719,6l-3.5,4.375a1,1,0,0,0,1.562,1.25l4-5a1,1,0,0,0,0-1.25Z"
                fill="currentColor"
              ></path>
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default ObservationDetails;
