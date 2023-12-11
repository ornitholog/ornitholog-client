import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function BirdDetailPage({ birdList }) {
  const { id } = useParams();
  const [selectedBird, setSelectedBird] = useState(null);

  useEffect(() => {
    if (birdList) {
      const filteredBird = birdList.filter((bird) => bird._id === id);
      console.log(selectedBird);
      setSelectedBird(filteredBird);
    }
  }, [birdList]);

  return (
    <>
      <div className="BirdDetailsPage">
        {!selectedBird ? (
          <p>Loading ....</p>
        ) : (
          <div className="bird-details-container">
            <div className="bird-details">
              <h1>{selectedBird[0].name}</h1>
              <h2>{selectedBird[0].sciName}</h2>
              <h3>{`Family: ${selectedBird[0].family}`}</h3>
              <h3>{`Order: ${selectedBird[0].order}`}</h3>

              {selectedBird[0].region.map((reg, index) => {
                return <p key={index}>{reg}</p>;
              })}
              <p>{`Maximum length: ${selectedBird[0].lengthMax}cm`}</p>
              <p>
                {`Wingspan: ${selectedBird[0].wingspanMin}cm - ${selectedBird[0].wingspanMax}cm`}
              </p>
              <p>{`Status: ${selectedBird[0].status}`}</p>
              <p>{selectedBird[0].infoText}</p>
            </div>
            <img className="bird-img" src={selectedBird[0].image} />
          </div>
        )}
      </div>
    </>
  );
}

export default BirdDetailPage;
