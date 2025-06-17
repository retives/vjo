import Activity from "../components/feed-components/Activity";
import FriendSection from "../components/feed-components/FriendSection";
import MiniProfile from "../components/feed-components/MiniProfile";
import "../App.css";
import "./styles/ActivityFeed.css";

const activityData = [
  {
    id: "1",
    imageurl: "/uploads/images/afternoon-ride-10-03-2025.jpg",
    activityName: "Afternoon Ride",
    athleteName: "Serhii Tokariev",
    date: "10-03-2025",
  },
  {
    id: "2",
    imageurl: "/uploads/images/afternoon-ride-13-04-2025.jpg",
    activityName: "Afternoon Ride",
    athleteName: "Serhii Tokariev",
    date: "13-04-2025",
  },
  {
    id: "3",
    imageurl: "/uploads/images/afternoon-ride-26-02-2025.jpg",
    activityName: "Afternoon Ride",
    athleteName: "Serhii Tokariev",
    date: "26-04-2025",
  },
];

const ActivityFeed = (user) => {
  return (
    <div className="activity-feed">

      <div className="left-section">
        <MiniProfile user={user.user} />
      </div>
      
      <div className="middle-section">
        {activityData.map((activity, index) => (
          <Activity card={activity} key={index} />
        ))}
      </div>

      <div className="right-section">
        <FriendSection />
      </div>

    </div>
  );
};

export default ActivityFeed;