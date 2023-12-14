import { useState } from "react";
import axios from "axios";
import service from "../services/file-upload.service";
import exitBtn from "../src/assets/exit.svg";

function NewObservation({ birdList, fetchObservationList, changeToggle }) {
  const url = import.meta.env.VITE_API_URL;

  const [bird, setBird] = useState("");
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
  const [suggestions, setSuggestions] = useState([]);

  const handleFileUpload = async (e) => {
    e.preventDefault();
    try {
      const uploadData = new FormData();

      // imageUrl => this name has to be the same as in the model since we pass
      // req.body to .create() method when creating a new movie in '/api/movies' POST route
      uploadData.append("photo", photo);
      const response = await service.uploadImage(uploadData);

      await handleSubmit(response);
    } catch (error) {
      console.log("Error while uploading the file: ", error);
    }
  };

  const handleSubmit = async (image) => {
    try {
      const addedBird = birdList.find((elm) => {
        return elm.name === bird;
      });

      const requestBody = {
        birdId: addedBird._id,
        date,
        title,
        location: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
        habitat,
        vegetation,
        age,
        photo: image,
        sound,
        temperature,
        notes,
      };

      // Get the token from the localStorage
      const storedToken = localStorage.getItem("authToken");

      await axios.post(`${url}/api/observations`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setTitle("");
      setBird("");
      setDate(new Date());
      setLatitude(0);
      setLongitude(0);
      setHabitat("");
      setVegetation("");
      setAge("");
      setPhoto("");
      setSound("");
      setTemperature(0);
      setNotes("");
      fetchObservationList();
    }

    // Send the token through the request "Authorization" Headers
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
      <div className="NewObservation container modal">
        <button onClick={() => changeToggle(false)} className="exitBtn">
          <img src={exitBtn} />
        </button>
        <h2>Add your bird observation</h2>

        <form onSubmit={handleFileUpload}>
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
          <label>
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
          </label>
          <label>
            Vegetation:
            <input
              type="text"
              name="vegetation"
              value={vegetation}
              onChange={(e) => setVegetation(e.target.value)}
            />
          </label>
          <label>
            Age:
            <select
              onChange={(e) => {
                setAge(e.target.value);
              }}
            >
              <option value="juvenil">Juvenil</option>
              <option value="adult">Adult</option>
            </select>
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
            Upload Photo:
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
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

          <button type="submit" className="btn">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default NewObservation;
