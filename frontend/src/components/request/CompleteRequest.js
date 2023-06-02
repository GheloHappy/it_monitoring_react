import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import logUser from "../Logs.js"

const CompleteRequest = () => {
    const { id } = useParams();
    const apiUrl = process.env.REACT_APP_API_URL;
    const [status, setStatus] = useState("");
    const [pending, setPending] = useState("");
    const [date_received, setDateReceived] = useState("");
    const [date_requested, setDateRequested] = useState("");
    const [itemDesc, setitemDesc] = useState("");
    const [qty, setQty] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetch(apiUrl + "requests/" + id)
            .then(res => res.json())
            .then(data => {
                // set state with the data received from the API
                const originalDateString = data.date_requested;
                const originalDate = new Date(originalDateString);
                const formattedDate = originalDate.toISOString().split('T')[0];
                setDateRequested(formattedDate);
                setitemDesc(data.description);
                setQty(data.qty);
            })
            .catch(error => {
                console.log(error);
            });
    }, [apiUrl,id]);

    const handleUpdate= async () => {
        const requiredFields = { status};
        if (status === "Pending") {
            requiredFields.pending = pending;
        } else {
            requiredFields.date_received = date_received;
        }
        const emptyFields = Object.entries(requiredFields).filter(([key, value]) => value === "");
        const data = {
            ...requiredFields
        }

        if (emptyFields.length > 0) {
            alert(`Please fill in the following fields: ${emptyFields.map(([key, value]) => key).join(", ")}`);
            return;
        }

        fetch(apiUrl + "request/" + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {  
            alert('Request Updated');
            logUser("Update Request : " + status + " : " + data.date_received + " : " + itemDesc );
            navigate('/requests');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    return (
        <div className="container mt-6">
            <div className="columns is-centered">
                <div className="column mt-2 box has-text-centered mt-6" id="form">
                    <h1 className="title is-3 has-text-white is-capitalized">UPDATE REQUEST</h1>
                    <div className="columns is-centered">
                        <div className="column is-four-fifths is-6 is-narrow">
                            <div className="field">
                                <div className="control">
                                    <label className="label is-medium has-text-white has-text-left">Date Requested</label>
                                    <input className="input" type="text" disabled
                                        value={date_requested} onChange={(e) => setDateRequested(e.target.value)} />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <label className="label is-medium has-text-white has-text-left">Item Description</label>
                                    <input className="input" type="text" disabled
                                        value={itemDesc} onChange={(e) => setitemDesc(e.target.value)} />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <label className="label is-medium has-text-white has-text-left">Qty</label>
                                    <input className="input" type="text" disabled
                                        value={qty} onChange={(e) => setQty(e.target.value)} />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <label className="label is-medium has-text-white has-text-left">Status</label>
                                    <div className="select is-fullwidth">
                                        <select value={status} onChange={(e) => setStatus(e.target.value)} >
                                            <option value=""></option>
                                            <option value="Pending">Pending</option>
                                            <option value="Completed">Completed</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            { status === "Pending" ?
                                <>
                                    <div className="field">
                                        <div className="control">
                                            <label className="label is-medium has-text-white has-text-left">Pending Item</label>
                                            <input className="input" type="text"
                                                value={pending} onChange={(e) => setPending(e.target.value)} />
                                        </div>
                                    </div>
                                </> : <>
                                    <div className="field">
                                        <div className="control">
                                            <label className="label is-medium has-text-white has-text-left">Date</label>
                                            <input className="input" type="date"
                                                value={date_received} onChange={(e) => setDateReceived(e.target.value)} />
                                        </div>
                                    </div>
                                </>
                            }
                            <div className="columns">
                                <div className="column is-half">
                                    <button onClick={handleUpdate} className="button is-info mt-5 is-fullwidth is-medium"
                                    >Save</button>
                                </div>
                                <div className="column is-half">
                                    <Link to={"/requests"} className="button is-danger mt-5 is-fullwidth is-medium"
                                    >CANCEL</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompleteRequest;