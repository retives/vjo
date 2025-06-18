import { Card, Button } from "react-bootstrap";
import "./styles/Activity.css";
import { usePersistedState } from "../../hooks/usePersistedState.ts";
import ActivityMap from "./ActivityMap.js";


const Activity = ({ activity }) => {
    const [likes, setLikes] = usePersistedState(`likes-`, 0);
    const [liked, setLiked] = usePersistedState(`liked-`, false);

    const handleLike = () => {
        if (!liked) {
            setLikes(likes + 1);
            setLiked(true);
        } else {
            setLikes(likes - 1);
            setLiked(false);
        }
    };

    return (
        <div className="activity-card">
            <Card>
                <Card.Title>{activity.name}</Card.Title>
                {/* potting the activity data on the map */}
                <ActivityMap activity={activity} />
                <script>
                    console.log("Activity Map Data:", plotData);
                </script>
                <Card.Text>
                    {activity.user.full_name}<br />
                    {activity.start_time}<br />
                </Card.Text>
                <div className="activity-actions">
                    <Button variant="success" onClick={handleLike}>
                        {liked ? "Unlike" : "Like"}
                    </Button>
                    <Button variant="success">
                        Share
                    </Button>
                    <Button variant="success">
                        Comment
                    </Button>
                    <span className="like-count">{likes} {likes === 1 ? "like" : "likes"}</span>
                </div>
            </Card>
        </div>
    );
};

export default Activity;
