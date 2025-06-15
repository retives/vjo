import React from "react";
import Navbar from "../components/feed-components/Navbar";
import LoginForm from "../components/auth-components/LoginForm";
import Footer from "../components/feed-components/Footer";

const retives = {
    name: "Serhii Tokariev",
    imageurl: "/uploads/images/retives.jpg",
    totalActivities: 100,
    totalDistance: 500,
    friendsAmount: 50,
  };
function Signup(){
    return (    
        <>
            <Navbar user = {retives} />
            <LoginForm />
        </>

    )
}
export default Signup;