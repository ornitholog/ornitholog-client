import React, { useState } from "react";
import Map from "../components/Map";
import ObservationDetails from "../components/ObservationDetails.jsx";
import FilterObservations from "../components/FilterObservations";
import "../src/styles/HomePage.scss";
import { Link } from "react-router-dom";

function HomePage({ observationList }) {
  const [displayedObservations, setDisplayedObservations] =
    useState(observationList);

  return (
    <div className="HomePage">
      <div className="hero">
        <div className="hero-box">
          <h1>OrnithoLog</h1>
          <p>
            Contribute to Avian Conservation: OrnithoLog – Your Platform for
            Tracking and Reporting Bird Species Observations
          </p>
          <Link className="btn btn-light" to="/signup">
            Join the community
          </Link>
        </div>
      </div>
      <div className="homepage-container">
        <div className="flex-horizontal">
          <h3>Bird Observation Contributions</h3>
          <p className="info-text">
            Share valuable insights into avian ecosystems by uploading bird
            observations, including geo-location, temperature, habitat, and
            vegetation data. Your contributions can help in monitoring key bird
            species, providing insights into the health and status of ecosystems
          </p>
        </div>

        <h2 className="center">Birds observations</h2>
        <FilterObservations
          observationList={observationList}
          setDisplayedObservations={setDisplayedObservations}
        />

        <div className="card-container">
          {displayedObservations &&
            displayedObservations.map((observation, index) => {
              return (
                <ObservationDetails
                  observation={observation}
                  summary={true}
                  key={index}
                />
              );
            })}
        </div>
        <Map observationList={observationList} />
      </div>
    </div>
  );
}

export default HomePage;
