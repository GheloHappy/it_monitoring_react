import { useState, useEffect} from "react";
import {  useNavigate } from "react-router-dom";
const Register = () => {

    const [name,setName] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        function fetchAuth(){
            const auth = localStorage.getItem('user');
            if(auth) {
                navigate('/');
            }
        }
        fetchAuth();
    }, [navigate]);

    const handleRegister = async () => {
        const userData = {username,password,name};  
        let result = await fetch("http://192.168.1.75:4999/user", {
            method:"POST",
            headers:{"content-type":"application/json"},
            body: JSON.stringify(userData),
        });
        result = await result.json();
        //console.warn(result);
        if(result.insertId) {
            alert('Registered Successfully');
            navigate("/login");
        } else {
            alert("User already exists.");
        }
    }

    return(
        <div className="container mt-6">
            <div className="columns is-mobile is-centered ">
                <div className="column is-one-third mt-6 box has-text-centered" id="form">
                    <h1 className="title is-1 has-text-white ">SignUp</h1>
                    <label className="label is-medium mt-4 has-text-white has-text-left">Name</label>
                    <input className="input is-normal" type="text" placeholder="Enter Name" 
                    value={name} onChange={(e)=>setName(e.target.value)}/>
                    <label className="label is-medium mt-3 has-text-white has-text-left">Username</label>
                    <input className="input is-normal" type="text" placeholder="Enter Username" 
                    value={username} onChange={(e)=>setUsername(e.target.value)}/>
                    <label className="label is-medium mt-3 has-text-white has-text-left">Password</label>
                    <input className="input is-normal" type="password" placeholder="Enter Password"
                    value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <button onClick={handleRegister} className="button is-primary mt-5 is-medium is-fullwidth is-large" id="btnSubmit">Submit</button>
                </div>
            </div>
        </div>
    )
}

export default Register;