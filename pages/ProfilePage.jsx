import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import ObservationDetails from "../components/ObservationDetails";

function ProfilePage({ observationList }) {
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


    return (
        <>
            <div className="container profile-page">
                <h3>🦉 Welcome {user.name}</h3>
                <h1>Your obsevations</h1>
                <div className="card-container">
                    {userObservations && (
                        userObservations.map((elm, id) => {
                            return (
                                <ObservationDetails
                                    observation={elm}
                                    key={id}
                                />
                            )
                        })
                    )}
                </div>
            </div>
        </>
    )
}

export default ProfilePage