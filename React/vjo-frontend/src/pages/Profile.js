import { useContext } from 'react';
import Navbar from '../components/feed-components/Navbar';
import Footer from '../components/feed-components/Footer';
import HeaderImages from '../components/profile-components/HeaderImages';
import axios from 'axios';
import "../App.css";
import "./styles/Profile.css";
import { AuthContext } from '../utils/AuthProvider';


const Profile = () => {
    const { user } = useContext(AuthContext);
    console.log("User in Profile:", user);
    if (!user) {
    return <div>Loading...</div>; // or a spinner
}

    return (
        <div className="profile-page">
            <Navbar />
            <div className="profile-header-banner">
                {/* <HeaderImages user={user} /> */}
                <div className="profile-main-info">
                    <img className="profile-avatar" src={user.profile_image} alt={user.full_name} />
                    <div className="profile-basic">
                        <h1>{user.full_name}</h1>
                    </div>
                </div>
            </div>
            <div className="profile-stats-row">
                <div className="profile-stat-block">
                    <div className="profile-stat-label">Activities</div>
                    <div className="profile-stat-value">{/*user.totalActivities */}</div>
                </div>
                <div className="profile-stat-block">
                    <div className="profile-stat-label">Total Distance</div>
                    <div className="profile-stat-value">{/* user.totalDistance */} km</div>
                </div>
                <div className="profile-stat-block">
                    <div className="profile-stat-label">Friends</div>
                    <div className="profile-stat-value">{/* user.friendsAmount */}</div>
                </div>
            </div>
            <div className="profile-achievements">
                <h2>Achievements</h2>
                <ul>
                    <li>🏆 5K (30:59) <span className="achievement-date">2 weeks ago</span></li>
                    <li>🏆 2 mile (20:00) <span className="achievement-date">2 weeks ago</span></li>
                    <li>🏆 1 mile (9:47) <span className="achievement-date">2 weeks ago</span></li>
                </ul>
            </div>
            <Footer />
        </div>
    );
}
export default Profile;