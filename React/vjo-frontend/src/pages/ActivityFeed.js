import Activity from "../components/feed-components/Activity";
import FriendSection from "../components/feed-components/FriendSection";
import MiniProfile from "../components/feed-components/MiniProfile";
import "../App.css";
import "./styles/ActivityFeed.css";
import axios from "axios";
import React, { useState, useEffect } from 'react';


const ActivityFeed = ({user}) => {

    const [activities, setActivities] = useState([]);

  useEffect(() => {
    const getActivities = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/activity-feed/`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            'Content-Type': 'application/json'
          }
        });
        setActivities(response.data.activities);
        console.log("Fetched:", response.data);
      } catch (e) {
        console.error("Error fetching activities:", e);
      }
    };

    getActivities();
  }, []);


  return (
    
    <div className="activity-feed">

      <div className="left-section">  
        <MiniProfile user={user} />
      </div>
        
  <div className="middle-section">
    {Array.isArray(activities) && activities.length > 0 ? (
      activities.map((activity) => (
        <Activity key={activity.id} activity={activity} />
      ))
    ) : (
      <p>No activities found.</p>
    )}
  </div>


      <div className="right-section">
        <FriendSection />
      </div>

    </div>
  );
};

export default ActivityFeed;