import { Card, Button } from "react-bootstrap";
import "./styles/Activity.css";
import ActivityMap from "./ActivityMap.js";


const Activity = ({ activity }) => {


    return (        
        <div className="activity-card">
            <Card>
                <Card.Title>{activity.name}</Card.Title>
                {/* potting the activity data on the map */}
                <ActivityMap activity={activity} />
                <Card.Text>

                    Athlete: {activity.user_fullname}<br />
                    Distance: {activity.distance} km<br />
                    Elevation gain: {activity.elevation} m<br />
                    Start time: {activity.start_time}<br />
                    End time: {activity.end_time}<br />
                    Max speed: {activity.max_speed} km/h<br />
                </Card.Text>
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
