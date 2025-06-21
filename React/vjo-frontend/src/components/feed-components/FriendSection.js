import React from 'react';
import FriendsCard from './FriendsCard';
import './styles/FriendSection.css';
const friendsData = [
  {
    name: "Alice Johnson",
    imageurl: "../images/person.png", // Replace with actual image URL
  },
  {
    name: "Bob Smith",
    imageurl: "../images/person.png", // Replace with actual image URL
  },
  {
    name: "Charlie Brown",
    imageurl: "../images/person.png", // Replace with actual image URL
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