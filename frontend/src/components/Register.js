import { useState} from "react";
import {  useNavigate } from "react-router-dom";
const Register = () => {

    const [name,setName] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    const regData=(e)=>{
        e.preventDefault();
        const userData = {username,password,name};     

        fetch("http://192.168.1.64:4999/user",{
            method:"POST",
            headers:{"content-type":"application/json"},
            body: JSON.stringify(userData),
        }).then((res)=> {
            alert('Registered Successfully');   
            navigate("/");
        }).catch((err)=>{
            console.log(err.message);
        })
    }
    

    return(
        <div className="container mt-5">
            <div className="columns is-mobile is-centered ">
                <div className="column is-one-third mt-6 box has-text-centered" id="form">
                    <h1 className="title is-1 has-text-white ">Register</h1>
                    <label className="label is-medium mt-4 has-text-white has-text-left">Name</label>
                    <input className="input is-normal" type="text" placeholder="Enter Name" 
                    value={name} onChange={(e)=>setName(e.target.value)}/>
                    <label className="label is-medium mt-3 has-text-white has-text-left">Username</label>
                    <input className="input is-normal" type="text" placeholder="Enter Username" 
                    value={username} onChange={(e)=>setUsername(e.target.value)}/>
                    <label className="label is-medium mt-3 has-text-white has-text-left">Password</label>
                    <input className="input is-normal" type="password" placeholder="Enter Password"
                    value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <button onClick={regData} className="button is-primary mt-5 is-medium" id="btnSubmit">Submit</button>
                </div>
            </div>
        </div>
    )
}

export default Register;