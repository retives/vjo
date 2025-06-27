import React, {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import ActivityMap from '../components/feed-components/ActivityMap';
import axios from 'axios';
import './styles/ActivityDetails.css';



const ActivityDetails = () =>{
    const { activity_id } = useParams();
    const [activity, setActivity] = useState({});
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
                setActivity(response.data.activity);
                console.log(activity);
                console.log("Activity fetched successfully:", response.data);
            } catch(error) {
                console.error("Error fetching activity:", error);
            }
        };
        getActivity();
    }, [activity_id]);
    if (!activity) {
        return <p>Loading...</p>;
    }   
    return (
  <div className="activity-details-container" style={{ marginTop: '50px' }}>
        <div className="panel-body activity-header">
          <h1>{activity.name}</h1>
          <span>{activity.likecount}</span>
    </div>
    <div className="panel panel-default activity-details">
  <div className="map-container mb-4">
    <div className="panel panel-default">
      <h2>Map</h2>
      <ActivityMap activity={activity} />
    </div>
  </div>
  <hr />
  <div className="panel panel-default p-3 " style={{ marginTop: '200px' }}>
    <h2>Stats</h2>
    <div className="row mb-2">
      <div className="col-md-4">
        <strong>Distance:</strong> {activity.distance} km
      </div>
      <div className="col-md-4">
        <strong>Elevation Gain:</strong> {activity.elevation} m
      </div>
      <div className="col-md-4">
        <strong>Max Speed:</strong> {activity.max_speed} km/h
      </div>
    </div>
    <div className="row">
      <div className="col-md-6">
        <strong>Start Time:</strong> {activity.start_time ? new Date(activity.start_time).toLocaleString() : ""}
      </div>
      <div className="col-md-6">
        <strong>End Time:</strong> {activity.end_time ? new Date(activity.end_time).toLocaleString() : ""}
      </div>
    </div>
  </div>
  <hr />
  <div className="panel panel-default p-3">
    <h2>Plot</h2>
    {activity.speed_plot}
  </div>
</div>
  </div>
    )
};
export default ActivityDetails;