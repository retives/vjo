import React from 'react';
import './styles/AthleteOverview.css'; 
const AthleteOverviewCard = ({ athlete }) => {
  return (
    <div className="athlete-overview-card">
        <div className ="image-container">
            <img src={athlete.profilePicture} alt={`${athlete.name}'s profile`} />
        </div>

        <div className='info-container'>
            <h2>{athlete.name}</h2>
            <p>{athlete.location}</p>
            
        </div>

        <div className="button-container">
            <button className="add-friend-button">Add Friend</button>
        </div>
        <div className="activities-container">
        <h4>Activities</h4>
        <ul>
          {Object.entries(athlete.activities).map(([type, count]) => (
            <li key={type}>
              {count} {type.charAt(0).toUpperCase() + type.slice(1).replace(/([A-Z])/g, ' $1')}
            </li>
          ))}
        </ul>
      </div>
    
    </div>
  );
}
export default AthleteOverviewCard;