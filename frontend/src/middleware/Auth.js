import { React, useEffect } from 'react';
import { Navigate, } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    useEffect(() => {
        async function fetchData() {
            const result = await fetch(apiUrl+"/protected", {
                method: "POST",
                headers: {
                    'x-access-token': localStorage.getItem('token'),
                },
            });
            const data = await result.json(); 
            if (result.status !== 200) {
                localStorage.clear();
                //alert("Please login first");
                return <Navigate to="/login" />
            }
            return data;
        }
        fetchData();
    }, []);
    const user = localStorage.getItem('user');
    return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;