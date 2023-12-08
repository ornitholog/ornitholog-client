import { Link } from "react-router-dom"
import "../src/styles/NavBar.css"
import NewObservation from "./NewObservation";
import { useState } from "react";

function NavBar() {

    const [toggle, setToggle] = useState(false)

    return (
        <>
            <nav className="NavBar">
                <Link className="logo" to="/">OrnithoLog</Link>
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
                    <button onClick={() => setToggle(!toggle)} className="btn">
                        Create observation
                    </button>
                </ul>
                
            </nav>

            {toggle && (
                <NewObservation />
            )}

        </>
    )
}

export default NavBar