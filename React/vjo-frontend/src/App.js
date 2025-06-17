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
import AuthContext from './utils/AuthProvider.js';
import "leaflet/dist/leaflet.css";



function App() {

  return (
    <div className="App">
      <AuthContext>
      {/* Retrieve user data from localStorage */}
      <Navbar/>
      <Router>
        <Routes>
          <Route path='/feed' element={<ActivityFeed/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/friends' element={<Friends/>}></Route>
          <Route path='/about-us' element={<AboutUs/>}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
          <Route path='/add-activity' element={<AddActivity />} /> {/* new route */}
          <Route path='/' element={<ActivityFeed/>} />

        </Routes>
      </Router>
      <footer className="footer">
        <Footer />
      </footer>
      </AuthContext>
    </div>
  );
}

export default App;
