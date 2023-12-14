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
              {user && user._id === observation.creator && (
                <div className="btns-wrap">
                  <button
                    onClick={() => setToggle(!toggle)}
                    className="btn icon-btn"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                    >
                      <title>i-edit</title>
                      <g fill="#f2f2f2">
                        <path d="M1.5,12c.053,0,.106-.008,.158-.026l3-1c.073-.024,.141-.066,.195-.121L12.854,2.854c.195-.195,.195-.512,0-.707L10.854,.146c-.195-.195-.512-.195-.707,0L2.146,8.146c-.055,.055-.097,.122-.121,.195l-1,3c-.06,.18-.013,.378,.121,.512,.096,.095,.223,.146,.354,.146Z"></path>
                        <path
                          d="M15,14H1c-.553,0-1,.448-1,1s.447,1,1,1H15c.553,0,1-.448,1-1s-.447-1-1-1Z"
                          fill="#f2f2f2"
                        ></path>
                      </g>
                    </svg>
                    Edit
                  </button>
                  {toggle && (
                    <EditObservation
                      observationDetails={observation}
                      getObservation={getObservation}
                      fetchObservationList={fetchObservationList}
                      birdList={birdList}
                      changeToggle={setToggle}
                    />
                  )}
                  <DeleteObservation
                    fetchObservationList={fetchObservationList}
                  />
                </div>
              )}
            </div>
            <div className="img-wrap">
              <img src={observation.photo} alt="" />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ObservationDetailPage;
