import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../src/styles/Auth.scss";

function SignUpPage() {
  const url = import.meta.env.VITE_API_URL;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, password);

    const requestBody = { name, email, password };

    axios
      .post(`${url}/auth/signup`, requestBody)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => setErrorMessage(error.response.data.message));
  };

  return (
    <>
      <div className="SignUpPage">
        <div className="auth-container">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <label>Username:</label>
            <input
              type="text"
              name="userName"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

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

            <input
              type="file"
              name="profileImg"
              accept="image/png, image/jpeg"
            />
            <button className="submit-btn" type="submit">
              Sign Up
            </button>
          </form>
          <div className="something">
            <p>Already have account?</p>
            <Link to={"/login"}> Login</Link>
          </div>
        </div>

        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </>
  );
}

export default SignUpPage;
