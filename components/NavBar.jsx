import { Link } from "react-router-dom";
import NewObservation from "./NewObservation";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import IsPrivate from "../components/IsPrivate/IsPrivate";
import IsAnon from "../components/IsAnon/IsAnon";
import "../src/styles/NavBar.scss";
import logo from "../src/assets/ornitholog-logo-white.svg"
import logout from "../src/assets/logout.svg"

function NavBar({ birdList, fetchObservationList }) {

  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [toggle, setToggle] = useState(false);
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    if(user){
      setUserId(user._id)
    }
  }, [user])

  
  return (
    <>
      <nav className="NavBar">
        <Link className="logo" to="/">
          <img src={logo} alt="logo" />
        </Link>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          { isLoggedIn && userId && (
          <li>
            <Link to={`/profile/${userId}`}> Profile</Link>
          </li>
          )}
          <li>
            <Link to="/birds">Birds</Link>
          </li>

          {!isLoggedIn && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <>
            <li>
              <a onClick={() => logOutUser()} className="logout">
                Logout
              </a>
            </li>
            <button onClick={() => setToggle(!toggle)} className="btn">
              Create observation
            </button>
            </>
          )}
        </ul>
      </nav>

      {toggle && isLoggedIn && (
        <NewObservation
          birdList={birdList}
          fetchObservationList={fetchObservationList}
        />
      )}
    </>
  );
}

export default NavBar;
