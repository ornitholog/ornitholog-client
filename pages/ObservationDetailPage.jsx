import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EditObservation from "../components/EditObservation";
import DeleteObservation from "../components/DeleteObservation";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import "../src/styles/ObservationDetailPage.scss"

function ObservationDetailPage({ birdList, fetchObservationList }) {
  const { user } = useContext(AuthContext);
  if (user) {
    console.log(user._id);
  }

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

  useEffect(() => {}, [observation]);

  return (
    <>
      <div className="container">
        {observation === null ? (
          <h3>loading...</h3>
        ) : (
          <div className="ObservationDetail flex-horizontal">
            <div>
              <h1>{observation.title}</h1>
              <h4>{observation.birdId.name} - <em>{observation.birdId.sciName}</em></h4>
              <div><span>Habitat:</span>{observation.habitat}</div>
              <div><span>Vegetation:</span>{observation.vegetation}</div>
              <div><span>Age:</span>{observation.age}</div>
              <div><span>Temperature:</span>{observation.temperature}°C</div>
              <div><span>Date:</span>{observation.date.slice(0, 10)}</div>
              <div className="notes"><span>Observation notes:</span>{observation.notes}</div>
            </div>
            <div className="img-wrap">
              <img src={observation.photo} alt="" />
            </div>

            {user && user._id === observation.creator && (
              <>
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
                <DeleteObservation
                  fetchObservationList={fetchObservationList}
                />
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default ObservationDetailPage;
