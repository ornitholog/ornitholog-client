import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";


function LogInPage() {
  const url = import.meta.env.VITE_API_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(`${url}/auth/login`, requestBody)
      .then((response) => {
        console.log("JWT token", response.data.authToken);
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <>
      <div className="LogInPage container">
        <div className="auth-container">
          <h5 className="center">
            You don't have an account yet?<br /> 
            <Link to="/signup">Please sign up here</Link>
          </h5>
          <h2>Log In</h2>
          <form onSubmit={handleSubmit}>
            <label>E-mail:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>

            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* <input
              type="file"
              name="profileImg"
              accept="image/png, image/jpeg"
            /> */}
            <button className="btn submit-btn" type="submit">
              Log In
            </button>
            
            {errorMessage && <p className="errorMessage">{errorMessage}</p>}
          </form>
        </div>

      </div>
    </>
  );
}

export default LogInPage;
