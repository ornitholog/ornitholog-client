import { Link } from "react-router-dom";
import "../src/styles/NavBar.css";

import NewObservation from "./NewObservation";

function NavBar() {
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
          <li>
            <Link to="/signup">Sign up</Link>
          </li>
        </ul>
      </nav>

      <NewObservation />
    </>
  );
}

export default NavBar;
