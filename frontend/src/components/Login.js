import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [emptyUser, setEmptyUser] = useState(false);
    const [emptyPass, setEmptyPass] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        function fetchAuth() {
            const auth = localStorage.getItem('user');
            if (auth) {
                navigate('/');
            }
        }
        fetchAuth();
    }, [navigate]);

    const handleLogin = async () => {
        if (!username || !password) {
            setEmptyUser(!username);
            setEmptyPass(!password);
        } else {
            let result = await fetch("http://192.168.1.75:4999/login", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            result = await result.json();
            //console.warn(result);
            if (result.name) {
                localStorage.setItem('user', JSON.stringify(result));
                localStorage.setItem('token', result.token);
                navigate("/");
            } else {
                alert("Username or password is incorrect.");
                setEmptyUser(false);
                setEmptyPass(false);
            }
        }
    }

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            document.querySelector("#btnSubmit").click();
        }
    };

    return (
        <div className="container mt-5">
            <div className="columns is-mobile is-centered ">
                <div className="column is-one-third mt-6 box has-text-centered" id="form">
                    <h1 className="title is-1 has-text-white ">Login</h1>
                    <label className="label is-medium mt-3 has-text-white has-text-left">Username</label>
                    <input className="input is-normal" type="text" placeholder="Enter Username"
                        value={username} onKeyDown={handleKeyPress}
                        onChange={(e) => setUsername(e.target.value)} />
                    {emptyUser && <div className="has-text-danger mt-1">Username cannot be blank</div>}
                    <label className="label is-medium mt-3 has-text-white has-text-left">Password</label>
                    <input className="input is-normal" type="password" placeholder="Enter Password"
                        value={password} onKeyDown={handleKeyPress}
                        onChange={(e) => setPassword(e.target.value)} />
                    {emptyPass && <div className="has-text-danger mt-1">Password cannot be blank</div>}
                    <button onClick={handleLogin} className="button is-primary mt-5 is-medium is-fullwidth is-large"
                     id="btnSubmit">Submit</button>
                </div>
            </div>
        </div>
    );
}

export default Login;