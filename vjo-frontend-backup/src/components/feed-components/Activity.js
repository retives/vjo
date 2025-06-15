import { Card, Button } from "react-bootstrap";
import "./styles/Activity.css";
import { usePersistedState } from "../../hooks/usePersistedState.ts";

const Activity = ({ card }) => {
    const [likes, setLikes] = usePersistedState(`${card.id || card.activityName}_likes`, 0);
    const [liked, setLiked] = usePersistedState(`${card.id || card.activityName}_liked`, false);

    const handleLike = () => {
        if (!liked) {
            setLikes(likes + 1);
            setLiked(true);
        } else {
            setLikes(likes - 1);
            setLiked(false);
        }
        console.log(`Activity ${card.activityName} has been ${liked ? "unliked" : "liked"}.`);
    };

    return (
        <div className="activity-card">
            <Card>
                <Card.Title>{card.activityName}</Card.Title>
                <Card.Img
                    variant="top"
                    src={card.imageurl}
                    alt={card.activityName}
                    className="activity-image"
                    onError={() => console.log(`Failed to load image: ${card.imageurl}`)}
                />
                
                <Card.Text>
                    {card.athleteName}<br />
                    {card.date}
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