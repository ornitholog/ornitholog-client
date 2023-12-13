import service from "../services/geoCoder.service";
import "../src/styles/HomePage.scss";
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
      <h4>{observation.title}</h4>
      <h4>{observation.birdId.name}</h4>
      <h5>{observation.birdId.sciName}</h5>

      <div>
        {date.getDate()}-{date.getMonth() + 1}-{date.getFullYear()}
      </div>
      <div>
        {observation.location.coordinates[0]} ,
        {observation.location.coordinates[1]}
      </div>
      <div>
        {locationDetails.city} - {locationDetails.countryName}
      </div>
      <div></div>

      <Link to={`/observations/${observation._id}`}>More Info</Link>
    </div>
  );
}

export default ObservationDetails;
