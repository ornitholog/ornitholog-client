import React, { useState, useEffect } from "react";
import "../src/styles/HomePage.scss";
import { Link } from "react-router-dom";
import Map from "../components/Map";
import service from "../services/geoCoder.service";

import FilterObservations from "../components/FilterObservations";

function HomePage({ observationList }) {
  const [displayedObservations, setDisplayedObservations] =
    useState(observationList);
  const [geoData, setGeoData] = useState({});

  useEffect(() => {
    const fetchGeoData = async (longitude, latitude) => {
      try {
        const data = await service.geoCoder(longitude, latitude);
        setGeoData(data);
      } catch (error) {
        console.error("Error fetching geo data:", error);
      }
    };

    if (observationList) {
      displayedObservations.forEach((observation) => {
        fetchGeoData(observation.location[0], observation.location[1]);
      });
    }
  }, [displayedObservations]);

  return (
    <div className="HomePage">
      <div className="hero">
        <div className="hero-box">
          <h1>OrnithoLog</h1>
          <p>Contribute to Avian Conservation: OrnithoLog – Your Platform for Tracking and Reporting Bird Species Observations</p>
          <button className="btn btn-light">Join the community</button>
        </div>
      </div>
      <div className="homepage-container">
        <div className="flex-horizontal">
          <h3>Bird Observation Contributions</h3>
          <p>Share valuable insights into avian ecosystems by uploading bird observations, including geo-location, temperature, habitat, and vegetation data. Your contributions can help in monitoring key bird species, providing insights into the health and status of ecosystems</p>
        </div>

        <h2 className="center">Birds observations</h2>
        <FilterObservations
          observationList={observationList}
          setDisplayedObservations={setDisplayedObservations} />

        <div className="card-container">
          {displayedObservations &&
            displayedObservations.map((observation, index) => {
              return (
                <div key={observation._id} className="observation-card">
                  <img src={observation.photo}></img>
                  <h4>{observation.birdId.name}</h4>
                  <h5>{observation.birdId.sciName}</h5>
                  <p>
                    {`${geoData.city} - ${geoData.countryName}` || "Loading..."}
                  </p>
                  <div>{observation.date}</div>
                  <Link to={`/observations/${observation._id}`}>More Info</Link>
                </div>
              );
            })}
        </div>
        <Map observationList={observationList} />
      </div>
    </div>
  );
}

export default HomePage;
