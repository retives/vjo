import { Card, Button } from "react-bootstrap";
import "./styles/Activity.css";
import { usePersistedState } from "../../hooks/usePersistedState.ts";
import axios from "axios";
import { useEffect } from "react";

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

    const getActivities = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/activity-feed/`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log("Activities fetched successfully:", response.data);
        } catch (e) {
            console.error("Error fetching activities:", e);
        }
    };

    useEffect(() => {
        getActivities();
    }, []);

    return (
        <div className="activity-card">
            <Card>
                <Card.Title>Title</Card.Title>
                <Card.Img
                    variant="top"
                    src='/'
                    alt='Image'
                    className="activity-image"
                    onError={() => console.log(`Failed to load image:`)}
                />
                
                <Card.Text>
                    Someone<br />
                    06-06-2025
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
