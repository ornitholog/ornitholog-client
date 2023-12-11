import axios from "axios";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

// Import Pages
import HomePage from "../pages/HomePage";
import SignUpPage from "../pages/SignUpPage";
import LogInPage from "../pages/LogInPage";
import ObservationDetailPage from "../pages/ObservationDetailPage";

import ProfilePage from "../pages/ProfilePage";
import BirdDetailPage from "../pages/BirdDetailsPage";
import BirdIndexPage from "../pages/BirdIndexPage";

// Import Components
import NavBar from "../components/NavBar";

function App() {
  const url = import.meta.env.VITE_API_URL;
  const [observations, setObservations] = useState(null);
  const [birds, setBirds] = useState(null);

  const fetchObservations = () => {
    axios
      .get(`${url}/api/observations`)
      .then((response) => {
        setObservations(response.data);
      })
      .catch((error) => {});
  };

  // const fetchFilteredObservation = (birdName, habitat) = {

  // }

  const fetchBirds = () => {
    axios
      .get(`${url}/api/birds`)
      .then((response) => {
        setBirds(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchObservations();
    fetchBirds();
  }, []);

  return (
    <>
      <NavBar birdList={birds} />

      <Routes>
        <Route
          path="/"
          element={<HomePage observationList={observations} birdList={birds} />}
        ></Route>
        {/* <Route
          path="/"
          element={
            <HomePage observationList={observations} birdList={birdList} fetchFilteredObservation={fetchFilteredObservation}/>
          }
        ></Route> */}
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/login" element={<LogInPage />}></Route>
        <Route
          path="/observations/:id"
          element={
            <ObservationDetailPage
              birdList={birds}
              fetchObservationList={fetchObservations}
            />
          }
        ></Route>
        <Route path="/profile/:id" element={<ProfilePage />}></Route>
        <Route
          path="/birds/:id"
          element={<BirdDetailPage birdList={birds} />}
        ></Route>

        <Route path="/birds" element={<BirdIndexPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
