import { Link } from "react-router-dom";
import NewObservation from "./NewObservation";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import "../src/styles/NavBar.scss";
import logo from "../src/assets/ornitholog-logo-white.svg";
import ResponsiveNavBar from "./ResponsiveNavBar";

function NavBar({ birdList, fetchObservationList }) {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [toggle, setToggle] = useState(false);
  const [openRespNav, setOpenRespNav] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (user) {
      setUserId(user._id);
    }
  }, [user]);

  return (
    <>
      <nav className="NavBar">
        <Link className="logo" to="/">
          <img src={logo} alt="logo" />
        </Link>
        <ul className="desktop-nav">
          <li>
            <Link to="/">Home</Link>
          </li>
          {isLoggedIn && userId && (
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
        <a className="burger-menu" onClick={() => setOpenRespNav(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><title>menu-4</title><g stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" fill="none" stroke="#f2f2f2"><line x1="1" y1="12" x2="23" y2="12" stroke="#f2f2f2"></line> <line x1="1" y1="5" x2="23" y2="5"></line> <line x1="1" y1="19" x2="12" y2="19"></line></g></svg>
        </a>
      </nav>

      {toggle && isLoggedIn && (
        <NewObservation
          birdList={birdList}
          fetchObservationList={fetchObservationList}
          changeToggle={setToggle}
        />
      )}


      {openRespNav && (
        <>
          <ResponsiveNavBar
            setOpenRespNav={setOpenRespNav}
          />
          <div className="responsive-nav">
            <h2>My responsive nav</h2>
          </div>
        </>
      )}
    </>
  );
}

export default NavBar;
