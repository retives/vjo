import { Card, Button } from "react-bootstrap";
import "./styles/Activity.css";
import ActivityMap from "./ActivityMap.js";
import { Link } from 'react-router-dom';
import { AuthContext } from "../../utils/AuthProvider.js";
import { act, useContext, useEffect } from 'react'
import axios from "axios";
const Activity = ({ activity }) => {
    
    const {user, loading} = useContext(AuthContext);
    const user_id = activity.simple_user?.id
    console.log('simple_user:', activity.simple_user);
    console.log('activity ',activity);

    const deleteActivity = async () => {
        try {
            const response = await axios.delete(
                `http://localhost:8000/activity/delete/`,  // ✅ fixed URL
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                        'Content-Type': 'application/json',
                    },
                    data: { activity_id: activity.id }, // ✅ body goes in `data`
                }
            );
            console.log("Deleted:", response.data.message);
            user.update(response.data.user)
            window.location.reload();
            // Optionally: trigger refresh, or remove activity from UI
        } catch (error) {
            console.error("Error deleting activity:", error);
        }

    }
    console.log(user_id )
    return (
        <div className="activity-card">
            <Card>
                <div className="d-flex align-items-start mb-3">
                    {/* Left: Profile and emblem */}
                    <div className="profile-emblem me-3 d-flex flex-column align-items-center">
                        <img
                            src={`http://localhost:8000${activity.simple_user.profile_image}`}
                            alt="Profile"
                            className="rounded-circle mb-2"
                            style={{ width: 48, height: 48, objectFit: "cover" }}
                        />
                        {/* Placeholder for ride type emblem */}
                        {/* <img
                            src="/ride-emblem-placeholder.png"
                            alt="Ride Type"
                            className="ride-emblem"
                            style={{ width: 28, height: 28 }}
                        /> */}
                    </div>
                    {/* Right: Info */}
                    <div className="flex-grow-1">
                        <div className="info text-start">
                            <Card.Text className="mb-1">
                                <Card.Title className="mb-0">
                                    <Link className="link" to={`/accounts/${user_id}/`}>
                                        {activity.simple_user.full_name}
                                    </Link>
                                    <div>
                                        <button type="submit" onClick={deleteActivity}>Delete activity</button>
                                    </div>
                                </Card.Title>
                                <small className="text-muted">
                                    {activity.start_time}
                                    {activity.location ? ` · ${activity.location}` : ""}
                                </small>
                            </Card.Text>
                            <Card.Title>
                                <Link className="link" to={`/activity/${activity.id}`}>
                                    {activity.name}
                                </Link>
                            </Card.Title>
                            <Card.Text>
                                {activity.descrtiption}
                            </Card.Text>
                            <div className="d-flex gap-4 mt-2 mb-2">
                                <div>
                                    <div className="stat-label">Distance</div>
                                    <div className="stat-value">{activity.distance} km</div>
                                </div>
                                <div>
                                    <div className="stat-label">Steps</div>
                                    <div className="stat-value">{activity.steps || '--'}</div>
                                </div>
                                <div>
                                    <div className="stat-label">Time</div>
                                    <div className="stat-value">{activity.duration}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Map */}
                <ActivityMap activity={activity} isZoomable={false} isDraggable={false} isScrollZoomable={false} />
                <div className="activity-actions">
                    <Button variant="success">
                        Like <span>{/*Like count*/}</span>
                    </Button>
                    <Button variant="success">
                        Share
                    </Button>
                    <Button variant="success">
                        Comment
                    </Button>
                </div>
            </Card>
        </div>
    );
};
export default Activity;
