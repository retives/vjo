import React from 'react';
import FriendsCard from './FriendsCard';
import './styles/FriendSection.css';


const FriendSection = ({ friendsData }) => {
  return (
    <div className="friend-section">
      <h2>Friends</h2>
      <div className="friend-list">
        {friendsData && friendsData.length > 0 ? (
          friendsData.map((following_user, index) => (
            <FriendsCard following_user={following_user} key={index} />
          ))
        ) : (
          <p>No friends found.</p>
        )}
      </div>
    </div>
  );
};

export default FriendSection;