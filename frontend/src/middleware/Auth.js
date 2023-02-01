import { React,useState,useEffect } from 'react';
import { Navigate, } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const [data, setData] = useState(null);
    useEffect(() => {
        async function fetchData() {
            const result =  await fetch("http://192.168.1.75:4999/protected", {
                method: "POST",
                headers: {
                    'x-access-token': localStorage.getItem('token'),
                },
            });
            const data = await result.json();
            if (result.status !== 200) {
                alert("Please Login First");
                return <Navigate to="/login" />
            } 
            setData(data); 
        }
        fetchData();
    }, []);
    const user = localStorage.getItem('user');
    return user && data ? children : <Navigate to="/login" />;
};

export default PrivateRoute;