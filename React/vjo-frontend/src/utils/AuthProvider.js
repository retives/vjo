  import React, {createContext, useState, useEffect} from 'react';
  import {jwtDecode} from 'jwt-decode';

  const AuthContext = createContext();

  const AuthProvider = ({children}) =>{
          const [isLoggedIn, setIsLoggedIn] = useState(false);
          const [user, setUser] = useState(null);
          const [loading, setLoading] = useState(true);

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
      setLoading(false);
    }, []);

      return (
          <AuthContext.Provider value={{isLoggedIn, user, loading }}>
              {children}
          </AuthContext.Provider>
      )};
  export {AuthProvider, AuthContext};

    