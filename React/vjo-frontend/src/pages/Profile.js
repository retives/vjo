import { useContext, useEffect, useState } from 'react';
import Navbar from '../components/feed-components/Navbar';
import Footer from '../components/feed-components/Footer';
import HeaderImages from '../components/profile-components/HeaderImages';
import axios from 'axios';
import "../App.css";
import "./styles/Profile.css";
import { AuthContext } from '../utils/AuthProvider';
import { useParams } from 'react-router-dom';


const Profile = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)
    useEffect (() => {
        // Fetching the user
        const getUser = async() => {
            try{
            const response = await axios.get(`http://localhost:8000/accounts/${id}/`,
                {
                    headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json'
                    }
                }
            )
            if (response.status === 200){
                setUser(response.data)
                console.log('User loaded successfully')
            }
            if ((await response).status=== 401){
                setError(response.error)
            }
        }catch (error) {
            setError(error);
        }}
        getUser();
    }, [id]);
    //Fallback for user
    if (!user){
        return <p>User is loading...</p>
    }

    
return (
    <div className="profile-page">
        <div className="profile-header-banner mt-5" style={{ marginTop: "120px" }}>
            {/* <HeaderImages user={user} /> */}
            <div className="profile-main-info d-flex align-items-center">
                <img
                    className="profile-avatar"
                    src={user.profile_image || 'Image'}
                    alt={user.full_name}
                    style={{ width: 120, height: 120, objectFit: "cover", borderRadius: "50%" }}
                />
                <div className="profile-basic ms-4">
                    <h1>{user.full_name}</h1>
                </div>
            </div>
        </div>
        <div className="profile-stats-row">
            <div className="profile-stat-block">
                <div className="profile-stat-label">Activities</div>
                <div className="profile-stat-value">{user.activity_amount}</div>
            </div>
            <div className="profile-stat-block">
                <div className="profile-stat-label">Total Distance</div>
                <div className="profile-stat-value">{user.total_distance.distance__sum} km</div>
            </div>
            <div className="profile-stat-block">
                <div className="profile-stat-label">Friends</div>
                <div className="profile-stat-value">{user.friends.length}</div>
            </div>
        </div>
        <Footer />
    </div>
);
}
export default Profile;