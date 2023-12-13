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
      <button className="btn btn-light delete-btn" onClick={deleteObservation}>Delete</button>
    </div>
  );
}

export default DeleteObservation;
