import Activity from "../components/feed-components/Activity";
import FriendSection from "../components/feed-components/FriendSection";
import MiniProfile from "../components/feed-components/MiniProfile";
import axios from "axios";
import { useState, useEffect} from 'react';
import "../App.css";
import "./styles/ActivityFeed.css";

const ActivityFeed = () => {

  const [activities, setActivities] = useState([]);

  // Retrieve activity data from localStorage
  useEffect(() => {
    const getActivities = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/activity-feed/`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            'Content-Type': 'application/json'
          }
        });
        setActivities(response.data);
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
        <MiniProfile />
      </div>
        
      <div className="middle-section">
        {Array.isArray(activities) && activities.length !== 0 ? (
          activities.map((activity) => (
          <Activity
            key={activity.id}
            activity={activity}
          />
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