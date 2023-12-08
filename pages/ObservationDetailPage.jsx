import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../src/styles/ObservationDetailPage.css"


function ObservationDetailPage(){

    const url = import.meta.env.VITE_API_URL;
    const {id} = useParams();
    const [observation, setObservation] = useState(null);

    const getObservation = () => {
        axios
            .get(`${url}/api/observations/${id}`)
            .then((response) => {
                setObservation(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
        }

        useEffect(() => {
            getObservation();
        }, []);

        useEffect(() => {
            console.log(observation)
        }, [observation])
    

    return(
        <>
            <div className="container">
                {
                    observation === null
                        ? <h3>loading...</h3>
                        : <div className="observation-detail flex-hor">
                            <div>
                                <h1>{observation.birdId.name}</h1>
                                <div>{observation.birdId.sciName}</div>
                                <div>{observation.habitat}</div>
                                <div>{observation.vegetation}</div>
                                <div>{observation.temperature}°C</div>
                                <div>{observation.date.slice(0,10)}</div>
                            </div>
                            <div className="img-wrap">
                                <img src={observation.photo} alt="" />
                            </div>
                        </div>
                }
            </div>
        </>
    )
}

export default ObservationDetailPage