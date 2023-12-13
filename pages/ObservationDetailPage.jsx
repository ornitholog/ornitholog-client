import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditObservation from "../components/EditObservation";
import DeleteObservation from "../components/DeleteObservation";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import "../src/styles/ObservationDetailPage.scss";
import service from "../services/geoCoder.service";

function ObservationDetailPage({ birdList, fetchObservationList }) {
  const url = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [toggle, setToggle] = useState(false);
  const [locationDetails, setLocationDetails] = useState({});
  const [observation, setObservation] = useState(null);

  const getObservation = async () => {
    try {
      const response = await axios.get(`${url}/api/observations/${id}`);
      setObservation(response.data);
      await getGeoData(
        response.data.location.coordinates[1],
        response.data.location.coordinates[0]
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getGeoData = async (lat, long) => {
    try {
      const data = await service.geoCoder(lat, long);
      setLocationDetails(data);
    } catch (error) {
      console.error("Error fetching geo data:", error);
    }
  };

  useEffect(() => {
    getObservation();
  }, []);

  return (
    <>
      <div className="container">
        {observation === null ? (
          <h3>loading...</h3>
        ) : (
          <div className="ObservationDetail flex-horizontal">
            <div className="observation-info">
              <h1>{observation.title}</h1>
              <h4>
                {observation.birdId.name} -{" "}
                <em>{observation.birdId.sciName}</em>
              </h4>
              <div>
                <span>Habitat:</span>
                {observation.habitat}
              </div>
              <div>
                <span>Vegetation:</span>
                {observation.vegetation}
              </div>
              <div>
                <span>Age:</span>
                {observation.age}
              </div>
              <div>
                <span>Temperature:</span>
                {observation.temperature}°C
              </div>
              <div>
                <span>Date:</span>
                {observation.date.slice(0, 10)}
              </div>
              <div>
                <span>City:</span>
                {locationDetails.city}
              </div>
              <div>
                <span>Country:</span>
                {locationDetails.countryName}
              </div>
              <div className="notes">
                <span>Observation notes:</span>
                {observation.notes}
              </div>
            </div>
            <div className="img-wrap">
              <img src={observation.photo} alt="" />
            </div>

            {user && user._id === observation.creator && (
              <>
                <button onClick={() => setToggle(!toggle)} className="btn">
                  <img src="../src/assets/n-edit.svg" />
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
