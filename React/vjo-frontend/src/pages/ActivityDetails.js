import React, {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import ActivityMap from '../components/feed-components/ActivityMap';
import axios from 'axios';
import './styles/ActivityDetails.css';
import { AuthContext } from '../utils/AuthProvider';


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
    if (!activity || !activity.simple_user) {
        return <p>Loading...</p>;
    }   
    const user = activity.simple_user
    return (

<div className="activity-details-container" style={{ marginTop: '50px' }}>
  <div className="panel-body activity-header">
    <h1>{activity.name}</h1>
    <span>{activity.likecount}</span>
  </div>
      {/* Activity Info */}
    <div className="col-md-6 mb-4">
      <div className="panel panel-default p-3">

        <div className="d-flex align-items-center mb-3">
          <img
            src={user.profile_image || "/default-profile.png"}
            alt="User"
            className="rounded-circle me-3"
            style={{ width: 60, height: 60, objectFit: "cover" }}
          />
          <div>
            <h5 className="mb-0">{user.full_name}</h5>
            <small>
              {activity.start_time
                ? new Date(activity.start_time).toLocaleString()
                : ""}
            </small>
          </div>
        </div>
        <h2>{activity.name}</h2>
        {activity.description && (
          <p className="text-muted">{activity.description}</p>
        )}
        {activity.image && (
          <img
            src={activity.image}
            alt="Activity"
            className="img-fluid rounded mb-2"
            style={{ maxHeight: 200 }}
          />
        )}
      </div>
    </div>
  <div className="panel panel-default activity-details">
    <div className="row">
      {/* Stats Section */}
      <div className="col-md-6 mb-4">
        <div className="panel panel-default p-3">
          <h2>Stats</h2>
          <div className="row mb-2">
            <div className="col-4">
              <strong>Distance:</strong> {activity.distance} km
            </div>
            <div className="col-4">
              <strong>Elevation Gain:</strong> {activity.ascent} m
            </div>
            <div className="col-4">
              <strong>Max Speed:</strong> {activity.max_speed} km/h
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <strong>Start Time:</strong> {activity.start_time ? new Date(activity.start_time).toLocaleString() : ""}
            </div>
            <div className="col-6">
              <strong>End Time:</strong> {activity.end_time ? new Date(activity.end_time).toLocaleString() : ""}
            </div>
          </div>
        </div>
      </div>

    <div className="panel panel-default">
      <h2>Map</h2>
      <ActivityMap activity={activity} isZoomable={true} isDraggable={true} isScrollZoomable={true}/>
    </div>
  </div>
  
  <hr />
  <div className="panel panel-default">
    <h2>Plot</h2>
    <img src = {activity.speed_plot} alt = 'Speed_plot_alt_text' className='img-fluid'/>
  </div>
</div>
  </div>
    )
};
export default ActivityDetails;