import React from 'react';
import FriendsCard from './FriendsCard';
import './styles/FriendSection.css';
const friendsData = [
  {
    name: "Alice Johnson",
    imageurl: "https://via.placeholder.com/50",
  },
  {
    name: "Bob Smith",
    imageurl: "https://via.placeholder.com/50", 
  },
  {
    name: "Charlie Brown",
    imageurl: "", 
  },
];

const FriendSection = () => {
  return (
    <div className="friend-section">
      <h2>Friends</h2>
      <div className="friend-list">
        {friendsData.map((friend, index) => (
          <FriendsCard friend={friend} key={index} />
        ))}
      </div>
    </div>
  );
};
export default FriendSection;