import React from "react";
import "../src/styles/HomePage.css";

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
        {observationList.data.map((observation) => {
          <div className="observation-card">observation.age</div>;
        })}
      </div>
    </div>
  );
}

export default HomePage;
