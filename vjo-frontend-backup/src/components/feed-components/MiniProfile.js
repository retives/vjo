import React from "react";
import { Card } from "react-bootstrap";

import "./styles/MiniProfile.css"; 
const MiniProfile = ({}) => {
    
    return (
    <div id = "mini-profile">
         <Card>
                {/* <Card.Img
                    variant="top"
                    src={user.imageurl}
                    alt={user.name}
                    className="profile-image"
                    onError={() => console.log(`Failed to load image: ${user.imageurl}`)}>
                </Card.Img> */}
        <Card.Title className="profile-name">
            {/* {user.name} */}
            Name
        </Card.Title>
        <div className="stats-container">
            
        <div className="stat-column">
            <Card.Header className="p-0 border-0 bg-transparent">
            Activities
            </Card.Header>
            <Card.Text className="mb-0">
            {/* {user.totalActivities} */}0
            </Card.Text>
        </div>

        <div className="stat-column">
            <Card.Header className="p-0 border-0 bg-transparent">
            Km of activities
            </Card.Header>
            <Card.Text className="mb-0">
            {/* {user.totalDistance} km */}0 km
            </Card.Text>
        </div>

        <div className="stat-column">
            <Card.Header className="p-0 border-0 bg-transparent">
            Friends
            </Card.Header>
            <Card.Text className="mb-0">
            {/* {user.friendsAmount} */}
            0
            </Card.Text>
        </div>
        </div>
                
        </Card>
    </div>
    )
}
export default MiniProfile;