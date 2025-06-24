  import React, {createContext, useState, useEffect} from 'react';
  import {jwtDecode} from 'jwt-decode';

  const AuthContext = createContext();

  const AuthProvider = ({children}) =>{
          const [isLoggedIn, setIsLoggedIn] = useState(false);
          const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp > Date.now() / 1000) {
          setIsLoggedIn(true);
          setUser(JSON.parse(storedUser));
        }
      } catch (e) {
        console.error("Invalid token");
      }
    }
  }, []);
const login = (userData, access, refresh) =>{
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setIsLoggedIn(true);
  }
const update = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  }
const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
  }

      return (
          <AuthContext.Provider value={{isLoggedIn, user ,setIsLoggedIn, setUser, login, logout, update}}>
              {children}
          </AuthContext.Provider>
      )};
  export {AuthProvider, AuthContext};

    