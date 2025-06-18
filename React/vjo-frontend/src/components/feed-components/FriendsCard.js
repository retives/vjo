import "./styles/FriendsCard.css";

const FriendsCard = ({ friend }) => { 
    return (
        <div className="friends-card">
            <img
                src={friend.imageurl || ""}
                alt={friend.name}
                className="friends-image"
                onError={(e) => {
                    e.target.style.backgroundColor = "black";
                    e.target.src = "";
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