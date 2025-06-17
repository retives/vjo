import React, {createContext, useState, useEffect} from 'react';
import {jwtDecode} from 'jwt-decode';
export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
        const [isLoggedIn, setIsLoggedIn] = useState(false);
        const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp > Date.now() / 1000) {
          setIsLoggedIn(true);
          setUser(JSON.parse(storedUser));
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      } catch (e) {
        setIsLoggedIn(false);
        setUser(null);
      }
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, []);

    return (
        <AuthContext.Provider value={{isLoggedIn, user }}>
            {children}
        </AuthContext.Provider>
    )}
    export default AuthProvider;
 
  