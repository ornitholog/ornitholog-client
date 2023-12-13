import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";

function ProfilePage({ observationList }){
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext)
    const [userObservations, setUserObservations] = useState([])

    const returnCreatorList = () => {
        const filtereObservations = observationList.filter((elm) => {
            return user._id === elm.creator
        })
        setUserObservations(filtereObservations)
    }

    useEffect(() => {
        returnCreatorList()
    }, [observationList])

    return(
        <>
            <div className="container profile">
                <h3>🦉 Welcome {user.name}</h3>
                <h1>Your obsevations</h1>
                <div className="card-container">
                    { userObservations && (
                        userObservations.map((elm, id) => {
                            return (
                                <div className="observation-card" key={id}>
                                    <img src={elm.photo} alt="" />
                                    <h4>{elm.title}</h4>
                                    <h6>{elm.birdId.sciName}</h6>
                                    <div>{elm.date}</div>
                                    <div><span>Habitat:</span>{elm.habitat}</div>
                                    <Link to={`/observations/${elm._id}`}>Detail</Link>
                                </div>
                            )
                        })
                    )}
                </div>
            </div>
        </>
    )
}

export default ProfilePage