import { Link } from "react-router-dom";
import "../src/styles/NavBar.css";
import NewObservation from "./NewObservation";
import { useState } from "react";

import IsPrivate from "../components/IsPrivate/IsPrivate";
import IsAnon from "../components/IsAnon/IsAnon";

function NavBar({ birdList }) {
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
          <IsAnon>
            <li>
              <Link to="/signup">Sign up</Link>
            </li>
          </IsAnon>
          <IsPrivate>
            <button onClick={() => setToggle(!toggle)} className="btn">
              Create observation
            </button>
          </IsPrivate>
        </ul>
      </nav>

      <IsPrivate>
        {toggle && <NewObservation birdList={birdList} />}
      </IsPrivate>
    </>
  );
}

export default NavBar;
