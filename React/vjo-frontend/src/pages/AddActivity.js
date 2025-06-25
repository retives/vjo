import { useContext,  useState } from "react";
import "../App.css";
import "./styles/AddActivity.css";
import {AuthContext } from "../utils/AuthProvider";
import axios from "axios";
import {useNavigate } from 'react-router-dom';
function AddActivity() {

  const { user } = useContext(AuthContext);
  const { update } = useContext(AuthContext);
  const [activityName, setActivityName] = useState("");
  const [description, setDescription] = useState("");
  const [gpxFile, setGpxFile] = useState(null);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("activityName", activityName);
    formData.append("description", description);
    formData.append("gpx_file", gpxFile);
    formData.append("image", image);
    console.log("Form data prepared:", formData);
    try {

      const response = await axios.post("http://localhost:8000/add-activity/", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      update(response.data.user);
      console.log("User: ", user);
      navigate("/");
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="add-activity-page">
      <h2>Add Activity</h2>
      <form className="add-activity-form" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label>Activity Name</label>
          <input
            type="text"
            value={activityName}
            onChange={(e) => setActivityName(e.target.value)}
            required
          />
        </div>
        <div className="input-wrapper">
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write about your activity..."
          />
        </div>
        <div className="input-wrapper">
          <label>GPX File</label>
          <input
            type="file"
            accept=".gpx"
            onChange={(e) => setGpxFile(e.target.files[0] )}
            required
          />
        </div>
        <div className="input-wrapper">
          <label>Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button type="submit">Add Activity</button>
      </form>
    </div>
  );
}

export default AddActivity;