import React from "react";
import FriendsSearch from "../components/friends-components/FriendsSearch.js";
import Navbar from "../components/feed-components/Navbar.js";
import Footer from "../components/feed-components/Footer.js";


function Friends() {

    const retives = {
        name: "Serhii Tokariev",
        imageurl: "/uploads/images/retives.jpg",
        totalActivities: 100,
        totalDistance: 500,
        friendsAmount: 50,
      };
  return (
    <>
    <Navbar user = {retives}/>
    <FriendsSearch />
    <Footer />
    </>
  );
}
export default Friends;