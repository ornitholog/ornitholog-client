import service from "../services/geoCoder.service";
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
      <Link to={`/observations/${observation._id}`}>
        <img src={observation.photo}></img>
      </Link>
      <div className="info-summary">
        <div className="meta-info-wrap">
          <div className="location">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><g class="nc-icon-wrapper" fill="#cbcbcb"><path fill="#cbcbcb" d="M6,1C3.1,1,0,3.2,0,7c0,3.7,6,9,6,9s6-5.3,6-9C12,3.2,8.9,1,6,1z M6,9C4.9,9,4,8.1,4,7c0-1.1,0.9-2,2-2 s2,0.9,2,2C8,8.1,7.1,9,6,9z"></path> <path data-color="color-2" d="M14,7c0,1-0.3,2.1-0.8,3.2C14.5,8.7,16,6.6,16,4.9C16,1.8,13.4,0,11.1,0c-0.3,0-0.7,0-1,0.1 C12.3,1.4,14,3.8,14,7z"></path></g></svg>
            {locationDetails.city} - {locationDetails.countryName}
          </div>
          <div className="observation-date">
            {date.getDate()}-{date.getMonth() + 1}-{date.getFullYear()}
          </div>
        </div>
        <h4>{observation.title}</h4>
        <h5>{observation.birdId.name} - <em>{observation.birdId.sciName}</em></h5>

        <div></div>
        <div className="more-info">
          <Link to={`/observations/${observation._id}`}>
            More Info
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
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ObservationDetails;
