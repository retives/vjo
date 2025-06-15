import React from "react";
import SignupForm from "../components/auth-components/SignupForm";
import Navbar from "../components/feed-components/Navbar";

function Signup(){
    return (
        <>
            <Navbar />
            <div className = "signup-container">
                <SignupForm />  
            </div>
            
            
        </>

    )
}
export default Signup;