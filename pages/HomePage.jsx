import React from "react";
import "../src/styles/HomePage.css";
import { Link } from "react-router-dom";

function HomePage({ observationList }) {
  console.log(observationList.data);
  return (
    <div className="HomePage">
      <div className="hero">
        <div className="hero-box">
          <h1>Header</h1>
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor
          </p>
          <button>Click here</button>
        </div>
      </div>
      <div className="homepage-container">
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
          sadipscing elitr, sed diam nonumy eirmod tempor invidunt
        </p>
        <button className="filter-btn">Filters</button>
        <div className="card-container">
          {observationList &&
            observationList.data.map((observation) => {
              return (
                <>
                  <div className="observation-card">
                    <img src={observation.photo}></img>
                    <h1>{observation.birdId.name}</h1>
                    <h2>{observation.birdId.sciName}</h2>
                    <p>Location Name</p>
                    <p>{observation.date}</p>
                    <Link>
                      <button>More Info</button>
                    </Link>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
