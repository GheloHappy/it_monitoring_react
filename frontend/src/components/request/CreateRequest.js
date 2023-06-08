import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import logUser from "../Logs.js"


const CreateRequest = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [currentId, setCurrentId] = useState('');
    const [curentItems, setCurrentItems] = useState([]);
    const [department, setDepartment] = useState("");
    const [date_requested, setDateRequested] = useState("");
    const [description, setDescription] = useState("");
    const [qty, setQty] = useState("");
    const [remarks, setRemarks] = useState("");
    const [purpose, setPurpose] = useState("");
    const navigate = useNavigate();

    const userLocal = localStorage.getItem('user');
    const userData = JSON.parse(userLocal);
    const input_user = userData.name;

    useEffect(() => {
        fetch(apiUrl + "request/currentid")
            .then(res => res.json())
            .then(data => {
                const id = data.latest_id;
                setCurrentId("IT" + id + getCurrentId());
            });
    }, [apiUrl]);

    const handleAddItem = () => {
        fetch(apiUrl + "request/currentid")
            .then(res => res.json())
            .then(data => {
                setCurrentItems(data);
            });
    }

    const handleInsert = async () => {
        const requiredFields = { department, date_requested, description, qty, purpose };
        const emptyFields = Object.entries(requiredFields).filter(([key, value]) => value === "");
        const data = {
            ...requiredFields,
            remarks,
            input_user,
        }

        if (emptyFields.length > 0) {
            alert(`Please fill in the following fields: ${emptyFields.map(([key, value]) => key).join(", ")}`);
            return;
        }

        let result = await fetch(apiUrl + "request", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data),
        });
        result = await result.json();
        if (result.insertId) {
            alert('Transaction Saved');
            logUser("Request : " + data.description);
            navigate('/requests');
        } else {
            alert("Failed to save");
        }
    }

    return (
        <div className="container mt-6">
            <div className="columns is-centered">
                <div className="column mt-2 box has-text-centered mt-6" id="form">
                    <h1 className="title is-3 has-text-white ">New Request - {currentId}</h1>
                    <div className="columns is-centered">
                        <div className="column is-three-quarters is-6 is-narrow">
                            <div className="field">
                                <div className="control">
                                    <label className="label is-medium has-text-white has-text-left">Department</label>
                                    <input className="input" type="text" placeholder="Enter Department"
                                        value={department} onChange={(e) => setDepartment(e.target.value)} />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <label className="label is-medium has-text-white has-text-left">Date Requested</label>
                                    <input className="input" type="date"
                                        value={date_requested} onChange={(e) => setDateRequested(e.target.value)} />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <label className="label is-medium has-text-white has-text-left">Purpose / Project</label>
                                    <input className="input" type="text" placeholder="Enter Purpose"
                                        value={purpose} onChange={(e) => setPurpose(e.target.value)} />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <label className="label is-medium has-text-white has-text-left">Qty</label>
                                    <input className="input" type="number"
                                        value={qty} onChange={(e) => setQty(e.target.value)} />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <label className="label is-medium has-text-white has-text-left">Description</label>
                                    <input className="input" type="text" placeholder="Enter Description"
                                        value={description} onChange={(e) => setDescription(e.target.value)} />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <label className="label is-medium has-text-white has-text-left">Remarks</label>
                                    <input className="input" type="text" placeholder="Enter Remarks"
                                        value={remarks} onChange={(e) => setRemarks(e.target.value)} />
                                </div>
                            </div>
                            <div className="columns">
                                <div className="column is-half">
                                    <button onClick={handleInsert} className="button is-info mt-5 is-fullwidth is-medium"
                                    >ADD</button>
                                </div>
                                <div className="column is-half">
                                    <Link to={"/requests"} className="button is-danger mt-5 is-fullwidth is-medium"
                                    >CANCEL</Link>
                                </div>
                            </div>
                            <table>
                                
                            </table>
                            <div className="columns">
                                <div className="column is-fullwidth">
                                    <button className="button is-success mt-5 is-fullwidth is-medium"
                                    >SAVE</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )


    function getCurrentId() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}${month}${day}`;

        return formattedDate;
    }
}

export default CreateRequest;