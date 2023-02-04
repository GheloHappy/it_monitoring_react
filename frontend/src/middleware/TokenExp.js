import { React, useState } from 'react';
import { Navigate, } from 'react-router-dom';

const TokenExp = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const tokenExp = localStorage.getItem("tokenExpiration");

    const intervalId = setInterval(() => {
        const currentTime = new Date().getTime();
        if (currentTime > tokenExp) {
          // Token has expired, log out the user
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpiration");
          setIsAuthenticated(false);
          clearInterval(intervalId);
          alert("Please login again");
        }
      }, 300000);

      if (!isAuthenticated) {
        return <Navigate to="/login" />;
      }
}

export default TokenExp;