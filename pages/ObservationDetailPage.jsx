import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


function ObservationDetailPage({ observationList }){
    console.log(observationList.data);
    const {id} = useParams();
    const [observation, setObservation] = useState(null);



    // const findObservation = () => {
    //     const observationDetails = props.observationList.find((elm) => {
    //         return elm.id === id
    //     })
    //     setObservation(observationDetails)
    // }

    // useEffect(() => {
    //     findObservation();
    //   }, [props.observationList, id]);

    
    //   console.log(observation)
    return(
        <>
            <div className="container">
                <div>
                </div>
                <h1>Observation detail page</h1>
            </div>
        </>
    )
}

export default ObservationDetailPage