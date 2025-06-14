import React, { useState } from "react";
import "../App.css";
import "./styles/AddActivity.css";

function AddActivity() {
  const [activityName, setActivityName] = useState("");
  const [date, setDate] = useState("");
  const [imageurl, setImageurl] = useState("");
  const [athleteName, setAthleteName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      activityName,
      date,
      imageurl,
      athleteName,
    });
    setActivityName("");
    setDate("");
    setImageurl("");
    setAthleteName("");
    alert("Activity added!");
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
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="input-wrapper">
          <label>Image URL</label>
          <input
            type="text"
            value={imageurl}
            onChange={(e) => setImageurl(e.target.value)}
            placeholder="/uploads/images/your-image.jpg"
          />
        </div>
        <div className="input-wrapper">
          <label>Athlete Name</label>
          <input
            type="text"
            value={athleteName}
            onChange={(e) => setAthleteName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Activity</button>
      </form>
    </div>
  );
}

export default AddActivity;