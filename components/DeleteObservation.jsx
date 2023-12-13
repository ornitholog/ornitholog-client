import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function DeleteObservation({ fetchObservationList }) {
  const url = import.meta.env.VITE_API_URL;
  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const { id } = useParams();

  const deleteObservation = (e) => {
    e.preventDefault();
    axios
      .delete(`${url}/api/observations/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        fetchObservationList();
        navigate(`/`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <button className="btn btn-light icon-btn delete-btn" onClick={deleteObservation}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><title>c-remove</title><g fill="#121212"><path d="M8,0C3.6,0,0,3.6,0,8s3.6,8,8,8,8-3.6,8-8S12.4,0,8,0Zm3.182,9.768c.195,.195,.195,.512,0,.707l-.707,.707c-.195,.195-.512,.195-.707,0l-1.768-1.768-1.768,1.768c-.195,.195-.512,.195-.707,0l-.707-.707c-.195-.195-.195-.512,0-.707l1.768-1.768-1.768-1.768c-.195-.195-.195-.512,0-.707l.707-.707c.195-.195,.512-.195,.707,0l1.768,1.768,1.768-1.768c.195-.195,.512-.195,.707,0l.707,.707c.195,.195,.195,.512,0,.707l-1.768,1.768,1.768,1.768Z" fill="#121212"></path></g></svg>
        Delete
      </button>
    </div>
  );
}

export default DeleteObservation;
