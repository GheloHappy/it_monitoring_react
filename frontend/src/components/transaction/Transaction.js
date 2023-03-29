import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import logUser from "../Logs.js"

const Transaction = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const { action, item_type, id } = useParams();
    const navigate = useNavigate();
    const [company, setCompany] = useState("");
    const [name, setName] = useState("");
    const [date_recret, setDateRecRet] = useState("");
    const [remarks, setRemarks] = useState("");
    const [itemName, setItemName] = useState("");

    //get date and time
    const currentDate = new Date();
    const date_added = moment(currentDate, "MM/DD/YYYY, HH:mm:ss").format("YYYY-MM-DD HH:mm:ss");

    const handleInsert = async () => {
        const requiredFields = {
            company,
            assigned_name: name,
            date_recret: date_recret,
        };

        const emptyFields = Object.entries(requiredFields).filter(([key, value]) => value === "");
        if (emptyFields.length > 0) {
            alert(`Please fill in the following fields: ${emptyFields.map(([key, value]) => key).join(", ")}`);
            return;
        }

        const newTabData = {
            ...requiredFields,
            item_id: id,
            item_type,
            remarks,
            transaction: action,
            date_added,
        }

        let result = await fetch(apiUrl + "transaction", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(newTabData),
        });
        result = await result.json();
        if (result.insertId) {
            alert('Transaction Saved');
            logUser("Transact : " + newTabData.transaction + " : " + newTabData.assigned_name);
            navigate('/tablets');
        } else {
            alert("Failed to save");
        }
    }

    useEffect(() => {
        fetch(apiUrl + "tablets/" + id)
            .then(res => res.json())
            .then(data => {
                // set state with the data received from the API
                if(data.assigned_name && data.transaction === "receive") {
                    setName(data.assigned_name);
                    setCompany(data.holder_company);
                }
                setItemName(data.item_name);
            })
            .catch(error => {
                console.log(error);
            });
    }, [apiUrl, id]);

    return (
        <div className="container mt-6">
            <div className="columns is-centered">
                <div className="column mt-2 box has-text-centered mt-6" id="form">
                    <h1 className="title is-3 has-text-white is-capitalized">{action} {item_type}</h1>
                    <div className="columns is-centered">
                        <div className="column is-four-fifths is-6 is-narrow">
                            <div className="field">
                                <div className="control">
                                    <label className="label is-medium has-text-white has-text-left">Company</label>
                                    <div className="select is-fullwidth">
                                        <select value={company} onChange={(e) => setCompany(e.target.value)} >
                                            <option value=""> </option>
                                            <option value="Monheim">Monheim</option>
                                            <option value="Maryland">Maryland</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <label className="label is-medium has-text-white has-text-left">Name</label>
                                    <input className="input" type="text" placeholder="Enter Name"
                                        value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <label className="label is-medium has-text-white has-text-left">Date</label>
                                    <input className="input" type="date"
                                        value={date_recret} onChange={(e) => setDateRecRet(e.target.value)} />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <label className="label is-medium has-text-white has-text-left">Item Name</label>
                                    <input className="input" type="text" disabled
                                        value={itemName} onChange={(e) => setItemName(e.target.value)} />
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
                                    >Save</button>
                                </div>
                                <div className="column is-half">
                                    <Link to={"/tablets"} className="button is-danger mt-5 is-fullwidth is-medium"
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

export default Transaction;