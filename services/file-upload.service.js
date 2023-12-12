// src/services/file-upload.service.js

import axios from "axios";

// const api = axios.create({
//     // make sure you use PORT = 5005 (the port where our server is running)
//     baseURL: import.meta.env.VITE_API_URL + "/api"
//     // withCredentials: true // => you might need this option if using cookies and sessions
// });

const errorHandler = (err) => {
    throw err;
};

// const getMovies = () => {
//   return api.get("/movies")
//     .then((res) => res.data)
//     .catch(errorHandler);
// };

const uploadImage = async (file) => {
    try {
        const image = await axios.post(import.meta.env.VITE_API_URL + "/api/upload", file)
       console.log("image here", image)
        return image.data.obsPhotoUrl
    } catch (error) {
        console.log(error)
    }


};

// const createMovie = (newMovie) => {
//   return api.post("/movies", newMovie)
//     .then(res => res.data)
//     .catch(errorHandler);
// };

export default {
    //   getMovies,
    uploadImage
    //   createMovie
};
