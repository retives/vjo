import React, { useState } from "react";
import TextInput from "../auth-components/TextInput";
import SubmitButton from "../auth-components/SubmitButton";
import AthleteOverviewCard from "./AthleteOverviewCard";
import "./styles/FriendsSearch.css";

const users = [
  {
    name: "Oleh Antoshkiv",
    profilePicture: "https://example.com/oleh.jpg",
    location: "Ivano Frankivsk, Ivano-Frankivs'ka oblast, Ukraine",
    activities: {
      bikeRides: 997,
      runs: 59
    }
  },
  {
    name: "Andrii Pavlyuk",
    profilePicture: "https://example.com/andrii.jpg",
    location: "Lviv, Lviv oblast, Ukraine",
    activities: {
      bikeRides: 432,
      swims: 15
    }
  },
  {
    name: "Serhii Tokariev",
    profilePicture: "https://example.com/serhii.jpg",
    location: "Ivano Frankivsk, Ivano-Frankivs'ka oblast, Ukraine",
    activities: {
      hikes: 210,
      runs: 45
    }
  },
  {
    name: "Iryna Shevchenko",
    profilePicture: "https://example.com/iryna.jpg",
    location: "Odesa, Odesa oblast, Ukraine",
    activities: {
      walks: 88,
      bikeRides: 200
    }
  },
  {
    name: "Dmytro Bondarenko",
    profilePicture: "https://example.com/dmytro.jpg",
    location: "Kharkiv, Kharkiv oblast, Ukraine",
    activities: {
      runs: 350,
      swims: 78
    }
  }
];


function FriendsSearch() {
  const [athleteName, setAthleteName] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(athleteName.toLowerCase())
    );
    setResults(filtered);
  };
    return (
        <>
            <h1>Athlete Search</h1>
            <TextInput
                label="Search by name"
                type="text"
                value={athleteName}
                onChange={(e) => setAthleteName(e.target.value)}
            />
            <SubmitButton
                label="Search"
                onClick={handleSearch}
            />
            <div>
        {results.map((user, idx) => (
          <AthleteOverviewCard athlete={user} key={idx} />
        ))}
      </div>
        </>
    );
}
export default FriendsSearch;