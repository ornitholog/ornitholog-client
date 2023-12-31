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
      <div className="SignUpPage container">
        <div className="auth-container">
          <form onSubmit={handleSubmit}>
            <h5 className="center">
              Do you have alredy an account?<br />
              <Link to={"/login"}>Please login here</Link>
            </h5>
            <h2>Register</h2>
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

            {/* <input
              type="file"
              name="profileImg"
              accept="image/png, image/jpeg"
            /> */}
            <button className="btn submit-btn" type="submit">
              Sign Up
            </button>
          </form>
        </div>

        {errorMessage && <p className="errorMessage">{errorMessage}</p>}
      </div>
    </>
  );
}

export default SignUpPage;
