import axios from "axios";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

// Import Pages
import HomePage from "../pages/HomePage";
import SignUpPage from "../pages/SignUpPage";
import SignInPage from "../pages/SignInPage";
import ObservationDetailPage from "../pages/ObservationDetailPage";
import EditObservationPage from "../pages/EditObservationPage";
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
      .get(`${url}/observations`)
      .then((response) => {
        setObservations(response);
      })
      .catch((error) => {});
  };

  const fetchBirds = () => {
    axios
      .get(`${url}/birds`)
      .then((response) => {
        setBirds(response);
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
      
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/signin" element={<SignInPage />}></Route>
        <Route path="/observations/:id" element={<ObservationDetailPage />}></Route>
        <Route path="/profile/:id" element={<ProfilePage />}></Route>
        <Route path="/birds/:id" element={<BirdDetailPage />}></Route>
        <Route path="/observations/:id/edit" element={<EditObservationPage />}></Route>
        <Route path="/birds" element={<BirdIndexPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
