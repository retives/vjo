import "./styles/FriendsCard.css";
import person from "../../images/person.png";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../utils/AuthProvider";
const FriendsCard = ({ following_user }) => {

    const {user} = useContext(AuthContext);
    const isFollowing = (targetId) => {
    return user.following?.some(f => f.id === targetId);
    };

    // Usage
    const [following, setFollowing] = useState(isFollowing(following_user.id));

    const {update} = useContext(AuthContext);
    //Folowing the other user
    const handleFollow = async(e) => {
        e.preventDefault();
        // Logic to add friend goes here
        try{
            // Make a POST request to follow the friend
            const response = await axios.post(`http://localhost:8000/follow/`, {   
                'following_id': following_user.id 
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },
                });
                // Confirming the sollow request
                if (response.status === 201) {
                    setFollowing(true);
                    console.log(response.data.message);
                    update(response.data.user);
                }
                // Handling the error if the request fails
        } catch (error) {
            if (error.response) {
                console.error('The error occurred',error.response.status);
            }
        }
    }
    // Unfollowing the other user
    const handleUnfollow = async(e) => {
        e.preventDefault();
        try{
            // Sending the response to unfollow chosen user
            const response = await axios.post(`http://localhost:8000/unfollow/`, {
                'following_id': following_user.id},
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    },
                });
            //Confirming the unfollow request
            if (response.status === 201){
                setFollowing(false);
                update(response.data.user);
                console.log(response.data.message);         
        }
        }catch(error){
            if (error.response){
                console.log('Error unfollowing friend:', error.response.status);

            }
        }
        

    }
    return (
        <div className="friends-card">
            <img
                src={following_user.profile_image || person} 
                alt={following_user.full_name}   
                className="friends-image"
                onError={(e) => {
                    e.target.src = person;
                }}
            />
            <h3>{following_user.full_name}</h3>
             <div className="button-container">
                { !following ?(
                    <button className="add-friend-button" onClick={handleFollow}>Follow</button>
                 ):(
                    <button className="following-button" onClick={handleUnfollow}>Unfollow</button>
                 )}
            
            </div>
        </div>
    );
};

export default FriendsCard;