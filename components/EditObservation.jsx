import { useState } from "react";
import axios from "axios";

function EditObservation({
  observationDetails,
  getObservation,
  birdList,
  fetchObservationList,
}) {
  console.log(observationDetails);
  const url = import.meta.env.VITE_API_URL;

  const [bird, setBird] = useState(observationDetails.birdId.name);
  const [date, setDate] = useState(observationDetails.date);
  const [title, setTitle] = useState(observationDetails.title);
  const [latitude, setLatitude] = useState(
    observationDetails.location.coordinates[0]
  );
  const [longitude, setLongitude] = useState(
    observationDetails.location.coordinates[1]
  );
  const [habitat, setHabitat] = useState(observationDetails.habitat);
  const [vegetation, setVegetation] = useState(observationDetails.vegetation);
  const [age, setAge] = useState(observationDetails.age);
  const [photo, setPhoto] = useState(observationDetails.photo);
  const [sound, setSound] = useState("");
  const [temperature, setTemperature] = useState(
    observationDetails.temperature
  );
  const [notes, setNotes] = useState(observationDetails.notes);
  const [suggestions, setSuggestions] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const addedBird = birdList.find((elm) => {
      return elm.name === bird;
    });

    const requestBody = {
      bird: addedBird._id,
      date,
      title,
      location: {
        type: "Point",
        coordinates: [latitude, longitude],
      },
      habitat,
      vegetation,
      age,
      photo,
      sound,
      temperature,
    };

    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .put(`${url}/api/observations/${observationDetails._id}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        getObservation();
        fetchObservationList();
      })
      .catch((error) => console.log(error));
  };
  const birdListArray = birdList.map((bird) => {
    return bird.name;
  });

  const handleInputChange = (e) => {
    const value = e.target.value;
    setBird(value);

    const filteredSuggestions = birdListArray.filter((suggestion) =>
      suggestion.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (suggestion) => {
    setBird(suggestion);
    setSuggestions([]);
  };

  return (
    <>
      <div className="createObservation container">
        <h2>Edit observation</h2>

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
          <label>
            Observed Bird:
            <input type="text" value={bird} onChange={handleInputChange} />
            <ul>
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
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
            onChange={(e) => {
              setHabitat(e.target.value);
            }}
          >
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
            onChange={(e) => {
              setAge(e.target.value);
            }}
          >
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
  );
}

export default EditObservation;
