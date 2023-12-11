import { Link } from "react-router-dom";
import NewObservation from "./NewObservation";
import { useState } from "react";

import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import IsPrivate from "../components/IsPrivate/IsPrivate";
import IsAnon from "../components/IsAnon/IsAnon";

function NavBar({ birdList }) {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <nav className="NavBar">
        <Link className="logo" to="/">
          OrnithoLog
        </Link>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="#">Profile</Link>
          </li>
          <li>
            <Link to="#">Birds</Link>
          </li>

          {!isLoggedIn && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <button onClick={() => setToggle(!toggle)} className="btn">
              Create observation
            </button>
          )}
        </ul>
      </nav>

      {toggle && isLoggedIn && <NewObservation birdList={birdList} />}
    </>
  );
}

export default NavBar;
