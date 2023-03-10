import { useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const AddTablet = () => { 
    const apiUrl = process.env.REACT_APP_API_URL;
    const [company, setCompany] = useState("");
    const [item_name, setItemName] = useState("");
    const [model, setModel] = useState("");
    const [serial, setSerial] = useState("");
    const [dop, setDop] = useState("");
    const [others, setOthers] = useState("");
    const [remarks, setRemarks] = useState("");
    const [qty, setQty] = useState("");
    const [price, setPrice] = useState("");
    const navigate = useNavigate();

    //get date and time
    const currentDate = new Date();
    const date_added = moment(currentDate, "MM/DD/YYYY, HH:mm:ss").format("YYYY-MM-DD HH:mm:ss");

    const handleInsert = async () => {
        const requiredFields = { company, item_name, model, dop, qty };
        const emptyFields = Object.entries(requiredFields).filter(([key, value]) => value === "");
        const newTabData = {
            company,
            item_name,
            model,
            serial,
            dop,
            others,
            remarks,
            qty,
            date_added: date_added,
            price
        }

        if (emptyFields.length > 0) {
            alert(`Please fill in the following fields: ${emptyFields.map(([key, value]) => key).join(", ")}`);
            return;
        }

        let result = await fetch(apiUrl + "tablets", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(newTabData),
        });
        result = await result.json();
        if (result.insertId) {
            alert('New Tablet Saved');
            navigate('/tablets');
        } else {
            alert("Failed to add");
        }
    }

    return (
        <div className="container mt-6">
            <div className="columns is-centered">
                <div className="column mt-2 box has-text-centered mt-6" id="form">
                    <h1 className="title is-3 has-text-white ">Add new Tablet / Accessories</h1>
                    <div className="columns is-centered">
                        <div className="column is-three-quarters is-6 is-narrow">
                            <div className="field">
                                <div className="control">
                                    <label className="label is-medium has-text-white has-text-left">Company</label>
                                    <div className="select is-fullwidth">
                                        <select value={company} onChange={(e) => setCompany(e.target.value)} >
                                            <option> </option>
                                            <option>Monheim</option>
                                            <option>Maryland</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <label className="label is-medium has-text-white has-text-left">Item Name</label>
                                    <input className="input" type="text" placeholder="Enter Item Name"
                                        value={item_name} onChange={(e) => setItemName(e.target.value)} />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <label className="label is-medium has-text-white has-text-left">Model</label>
                                    <input className="input" type="text" placeholder="Enter Model"
                                        value={model} onChange={(e) => setModel(e.target.value)} />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <label className="label is-medium has-text-white has-text-left">Serial</label>
                                    <input className="input" type="text" placeholder="Enter Serial"
                                        value={serial} onChange={(e) => setSerial(e.target.value)} />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <label className="label is-medium has-text-white has-text-left">Date Purchased</label>
                                    <input className="input" type="date"
                                        value={dop} onChange={(e) => setDop(e.target.value)} />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <label className="label is-medium has-text-white has-text-left">Others</label>
                                    <input className="input" type="text"
                                        value={others} onChange={(e) => setOthers(e.target.value)} />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <label className="label is-medium has-text-white has-text-left">Remarks</label>
                                    <input className="input" type="text"
                                        value={remarks} onChange={(e) => setRemarks(e.target.value)} />
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
                                    <label className="label is-medium has-text-white has-text-left">Price</label>
                                    <input className="input" type="number"
                                        value={price} onChange={(e) => setPrice(e.target.value)} />
                                </div>
                            </div>
                            <div className="columns">
                                <div className="column is-half">
                                    <button onClick={handleInsert} className="button is-info mt-5 is-fullwidth is-medium"
                                    >ADD</button>
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

export default AddTablet;