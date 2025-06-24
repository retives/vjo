import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ActivityFeed from './pages/ActivityFeed';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Friends from './pages/Friends.js';
import Footer from './components/feed-components/Footer.js';
import Navbar from './components/feed-components/Navbar.js';
import AboutUs from './pages/AboutUs.js';
import Profile from './pages/Profile.js';
import AddActivity from './pages/AddActivity.js';
import {AuthProvider} from './utils/AuthProvider.js';
import "leaflet/dist/leaflet.css";



function App() {

  return (
    <div className="App">
      <AuthProvider>
      
        <Router>
          <Navbar/>
          <Routes>
            <Route path='/feed' element={<ActivityFeed/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/login' element={<Login/>}/>
            <Route path='/friends' element={<Friends/>} />
            <Route path='/about-us' element={<AboutUs/>} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/add-activity' element={<AddActivity />} />
            <Route path='/' element={<ActivityFeed/>} />
            <Route path='/activity-feed' element={<ActivityFeed/>} />
          </Routes>
            <footer className="footer">
          <Footer />
            </footer>
        </Router>

      </AuthProvider>
    </div>
  );
}

export default App;
