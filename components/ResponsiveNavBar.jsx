import { Link } from "react-router-dom";
import NewObservation from "./NewObservation";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import logo from "../src/assets/ornitholog-logo-white.svg";
import exitBtn from "../src/assets/exit.svg";
import "../src/styles/ResponsiveNavbar.scss"

function ResponsiveNavBar({setOpenRespNav}){
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
    const [toggle, setToggle] = useState(false);
    const [userId, setUserId] = useState(null);
  
    useEffect(() => {
      if (user) {
        setUserId(user._id);
      }
    }, [user]);
  
    return (
      <>
        <div className="ResponsiveNavbar">
          <div className="inner-wrap">
            <button onClick={() => setOpenRespNav(false)} className="exitBtn">
                <img src={exitBtn} alt="close-nav" />
            </button>
            <Link className="logo" to="/">
              <img src={logo} alt="logo" />
            </Link>
            <ul>
              <li>
                <Link onClick={() => setOpenRespNav(false)} to="/">Home</Link>
              </li>
              {isLoggedIn && userId && (
                <li>
                  <Link onClick={() => setOpenRespNav(false)} to={`/profile/${userId}`}> Profile</Link>
                </li>
              )}
              <li>
                <Link onClick={() => setOpenRespNav(false)} to="/birds">Birds</Link>
              </li>
              {!isLoggedIn && (
                <li>
                  <Link onClick={() => setOpenRespNav(false)} to="/login">Login</Link>
                </li>
              )}
              {isLoggedIn && (
                <>
                  <li>
                    <a onClick={() => {logOutUser(); setOpenRespNav(false); }} className="logout">
                      Logout
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
  
        {toggle && isLoggedIn && (
          <NewObservation
            birdList={birdList}
            fetchObservationList={fetchObservationList}
            changeToggle={setToggle}
          />
        )}
  

      </>
    );
}

export default ResponsiveNavBar