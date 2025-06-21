import "./styles/FriendsCard.css";
import person from "../../images/person.png";
const FriendsCard = ({ friend }) => { 
    return (
        <div className="friends-card">
            <img
                src={friend.imageurl} 
                alt={friend.name}   
                className="friends-image"
                onError={(e) => {
                    e.target.src = person;
                }}
            />
            <h3>{friend.name}</h3>
             <div className="button-container">
            <button className="add-friend-button">Add Friend</button>
            </div>
        </div>
    );
};

export default FriendsCard;