import { Link } from "react-router-dom";

function BirdIndexPage({ birdList }) {
  if (birdList) {
    birdList.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
    // console.log(sortedBirds);
  }

  return (
    <>
      <div className="container">
        <h1>Bird index page</h1>
        <div className="card-container">
          {birdList &&
            birdList.map((bird) => {
              return (
                <div className="observation-card" key={bird._id}>
                  <img src={bird.image}></img>
                  <p>{bird.name}</p>
                  <p>{bird.sciName}</p>
                  <p>{bird.habitat}</p>
                  <p>{bird.region}</p>
                  <Link to={`/birds/${bird._id}`}>More</Link>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default BirdIndexPage;
