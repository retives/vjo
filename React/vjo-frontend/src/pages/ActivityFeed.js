import Activity from "../components/feed-components/Activity";
import FriendSection from "../components/feed-components/FriendSection";
import MiniProfile from "../components/feed-components/MiniProfile";
import axios from "axios";
import { AuthContext } from "../utils/AuthProvider";
import { useState, useEffect, useContext} from 'react';
import "../App.css";
import "./styles/ActivityFeed.css";
import ActivitySection from '../components/feed-components/ActivitySection.js'
const ActivityFeed = () => {

  const [activities, setActivities] = useState([]);
  const [friend_suggestions, setFriendSuggestions] = useState([]);
  const {user, loading} = useContext(AuthContext);
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
          setActivities(response.data.activities);
          setFriendSuggestions(response.data.suggestions);
          console.log(response.data.activities)
        } catch (e) {
          console.error("Error fetching activities:", e);
        }
      };

      if (user) {
        getActivities();
      }
    }, [loading, user]);
  if (!user) {
    return <p>User not logged in. Please log in.</p>;
  }

  return (
    <div className="activity-feed">
      <div className="left-section">
        <MiniProfile />
      </div>
        
      <div className="middle-section">
        <ActivitySection activities={activities}/>
      </div>


      <div className="right-section">
          <FriendSection friendsData={friend_suggestions} />
      </div>

    </div>
  );
};

export default ActivityFeed;