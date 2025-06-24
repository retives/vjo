import React, {useContext, useEffect} from 'react';


const ActivityDetails = ({activity}) =>{

    return (
    <>
    <div className = "activity-details-wrapper">
        <div className = "name-likes">
        <h1>{activity.name}</h1>
        </div>

        <div className="overview">

        </div>

        <div className="map">
        
        </div>

        <div className="stats-plot">
        
        </div>
    </div>
    </>
    )
}