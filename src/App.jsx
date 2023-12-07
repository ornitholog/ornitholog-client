import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import SignUpPage from "../pages/SignUpPage";
import SignInPage from "../pages/SignInPage";
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
      </Routes>
    </>
  );
}

export default App;
