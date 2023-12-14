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
      <div className="container">
        {!selectedBird ? (
          <p>Loading ....</p>
        ) : (
          <div className="ObservationDetail flex-horizontal">
            <div className="observation-info">
              <h1>{selectedBird[0].name}</h1>
              <h4>
                <em>{selectedBird[0].sciName}</em>
              </h4>
              <div>
                <span>Family:</span>
                <h4>{selectedBird[0].family}</h4>
              </div>
              <div>
                <span>Order:</span>
                <h4>{selectedBird[0].order}</h4>
              </div>
              <div>
                <span>Region:</span>
                {selectedBird[0].region.map((reg, index) => {
                  return <div key={index}>{reg}</div>;
                })}
              </div>

              <div>
                <span>Maximum length:</span>
                <h4>{selectedBird[0].lengthMax}cm</h4>
              </div>
              <div>
                <span>Maximum length:</span>
                <h4>{selectedBird[0].lengthMax}cm</h4>
              </div>
              <div>
                <span>Wingspan:</span>
                <h4>{selectedBird[0].wingspanMin}cm</h4>
              </div>
              <div>
                <span>Status:</span>
                <h4>{selectedBird[0].status}</h4>
              </div>
              <div>
                <h4>{selectedBird[0].infoText}</h4>
              </div>
            </div>
            <div className="img-wrap">
              <img src={selectedBird[0].image} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default BirdDetailPage;
