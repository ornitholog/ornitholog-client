import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../src/styles/ObservationDetailPage.css";
import EditObservation from "../components/EditObservation";
import DeleteObservation from "../components/DeleteObservation";
function ObservationDetailPage({ birdList, fetchObservationList }) {
  const url = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const [observation, setObservation] = useState(null);
  const [toggle, setToggle] = useState(false);

  const getObservation = () => {
    axios
      .get(`${url}/api/observations/${id}`)
      .then((response) => {
        setObservation(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getObservation();
  }, []);

  useEffect(() => {
    console.log(observation);
  }, [observation]);

  return (
    <>
      <div className="container">
        {observation === null ? (
          <h3>loading...</h3>
        ) : (
          <div className="observation-detail flex-hor">
            <div>
              <h1>{observation.title}</h1>
              <h1>{observation.birdId.name}</h1>
              <div>{observation.birdId.sciName}</div>
              <div>{observation.habitat}</div>
              <div>{observation.vegetation}</div>
              <div>{observation.age}</div>
              <div>{observation.temperature}°C</div>
              <div>{observation.date.slice(0, 10)}</div>
            </div>
            <div className="img-wrap">
              <img src={observation.photo} alt="" />
            </div>

            <button onClick={() => setToggle(!toggle)} className="btn">
              Edit
            </button>
            {toggle && (
              <EditObservation
                observationDetails={observation}
                getObservation={getObservation}
                fetchObservationList={fetchObservationList}
                birdList={birdList}
              />
            )}
            <DeleteObservation fetchObservationList={fetchObservationList} />
          </div>
        )}
      </div>
    </>
  );
}

export default ObservationDetailPage;
