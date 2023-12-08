import { useState } from "react"
import axios from "axios";

function NewObservation(){


    const url = import.meta.env.VITE_API_URL;

    const [date, setDate] = useState(new Date());
    const [title, setTitle] = useState("");
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [habitat, setHabitat] = useState("forest");
    const [vegetation, setVegetation] = useState("");
    const [age, setAge] = useState("juvenil");
    const [photo, setPhoto] = useState("");
    const [sound, setSound] = useState("");
    const [temperature, setTemperature] = useState(0);
    const [notes, setNotes] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const requestBody = {
            date,
            title,
            location: {
                type: "Point",
                coordinates: [latitude, longitude]
            },
            habitat,
            vegetation,
            age,
            photo,
            sound,
            temperature
        };

        // Get the token from the localStorage
        const storedToken = localStorage.getItem('authToken');

        // Send the token through the request "Authorization" Headers
        axios
            .post(`${url}/api/observations/`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((response) => {
                // Reset the state
                setTitle("");
                setDate(new Date())
                setLatitude(0)
                setLongitude(0)
                setHabitat("")
                setVegetation("")
                setAge("")
                setPhoto("")
                setSound("")
                setTemperature(0)
                setNotes("")
            })
            .catch((error) => console.log(error));
    };
    
    return(
        <>
            <div className="createObservation container">
                <h2>Add your bird observation</h2>

                <form onSubmit={handleSubmit}>
                    <label>
                        Title:
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setPhoto(e.target.value)}
                    />
                    <label>
                        Date:
                        <input
                            type="datetime-local"
                            name="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </label>
                    <label>
                        Latitude:
                        <input
                            type="number"
                            name="latitude"
                            value={latitude}
                            onChange={(e) => setLatitude(e.target.value)}
                        />
                    </label>
                    <label>
                        Longitude:
                        <input
                            type="number"
                            name="longitude"
                            value={longitude}
                            onChange={(e) => setLongitude(e.target.value)}
                        />
                    </label>
                    <select
                        onChange={(e) => { setHabitat(e.target.value) }}>

                        <option value="forest">Forest</option>
                        <option value="grassland">Grassland</option>
                        <option value="wetland">Wetland</option>
                        <option value="coast">Coast</option>
                        <option value="urban">Urban</option>
                        <option value="mountain">Mountain</option>
                        <option value="river">River</option>

                    </select>
                    <label>
                        Vegetation:
                        <input
                            type="text"
                            name="vegetation"
                            value={vegetation}
                            onChange={(e) => setVegetation(e.target.value)}
                        />
                    </label>
                    <select
                        onChange={(e) => { setAge(e.target.value) }}>

                        <option value="juvenil">Juvenil</option>
                        <option value="adult">Adult</option>
                    </select>
                    <label>
                        Sound:
                        <input
                            type="text"
                            name="sound"
                            value={sound}
                            onChange={(e) => setSound(e.target.value)}
                        />
                    </label>

                    <label>
                        Temperature:
                        <input
                            type="number"
                            name="temperature"
                            value={temperature}
                            onChange={(e) => setTemperature(parseInt(e.target.value))}
                        />
                    </label>

                    <label>
                        Note:
                        <input
                            type="textarea"
                            rows="4"
                            name="notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </label>


                    <button type="submit">Submit</button>
                </form>

            </div>
        </>
    )
}

export default NewObservation