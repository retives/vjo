import {useContext} from "react";
import { Card } from "react-bootstrap";
import {AuthContext} from "../../utils/AuthProvider";
import "./styles/MiniProfile.css"; 
const MiniProfile = () => {
    const {user, loading} = useContext(AuthContext);
    if (loading) {
        return <p>Loading...</p>;
    }   
    return (
    <div id = "mini-profile">
         <Card>
                <Card.Img       
                    variant="top"
                    src={`http://localhost:8000${user.profile_image}`}
                    alt={user.full_name}
                    className="profile-image"
                    onError={() => console.log(`Failed to load image`)}>
                </Card.Img>
        <Card.Title className="profile-name">
            {user.full_name}
        </Card.Title>
        <div className="stats-container">
            
        <div className="stat-column">
            <Card.Header className="p-0 border-0 bg-transparent">
            Activities
            </Card.Header>
            <Card.Text className="mb-0">
            { user.activity_amount }
            </Card.Text>
        </div>

        <div className="stat-column">
            <Card.Header className="p-0 border-0 bg-transparent">
            Km of activities
            </Card.Header>
            <Card.Text className="mb-0">
            {user.total_distance.distance__sum } km
            </Card.Text>
        </div>

        <div className="stat-column">
            <Card.Header className="p-0 border-0 bg-transparent">
            Friends
            </Card.Header>
            <Card.Text className="mb-0">
            {user.friends.length} 
            </Card.Text>
        </div>
        </div>
                
        </Card>
    </div>
    )
}
export default MiniProfile;