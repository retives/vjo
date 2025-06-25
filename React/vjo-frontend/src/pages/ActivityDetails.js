import React, {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import ActivityMap from '../components/feed-components/ActivityMap';
import axios from 'axios';

const ActivityDetails = () =>{

    const { activity_id } = useParams();
    const [activity, setActivity] = useState(null);
    console.log("Activity ID:", activity_id);
    useEffect(() => {
        const getActivity = async () => {
            try { 
                const response = await axios.get(
                    `http://localhost:8000/activity/${activity_id}/`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('access_token')}`
                        }
                    }
                );
                setActivity(response.data);
                console.log(response.data);
            } catch(error) {
                console.error("Error fetching activity:", error);
            }
        };
        getActivity();
    }, [activity_id]);
    return (
    <>
    {/* <div className = "activity-details-wrapper">
        <div className = "name-likes">
        <h1>{activity.name}</h1>
        <span>{activity.likecount }</span>
        </div>

        <div className="overview">
            <div className = "user_info">
                
            </div>
        </div>

        <div className="map">
        <ActivityMap activity={activity} />
        </div>

        <div className="stats-plot">
            <div className="stats">
                <h2>Stats</h2>
                <p>Distance: {activity.distance} km</p>
                <p>Elevation Gain: {activity.elevation} m</p>
                <p>Start Time: {new Date(activity.start_time).toLocaleString()}</p>
                <p>End Time: {new Date(activity.end_time).toLocaleString()}</p>
                <p>Max Speed: {activity.max_speed} km/h</p>
            </div>
            <div className="plot">
                
                <h2>Plot</h2>
            </div>
        </div>
    </div> */}
    </>
    )
};
export default ActivityDetails;