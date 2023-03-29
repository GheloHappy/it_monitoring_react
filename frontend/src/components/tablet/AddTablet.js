import { useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import logUser from "../Logs.js"

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
            qty: 1, // Set qty to 1 for each insert
            date_added: date_added,
            price
        }

        if (emptyFields.length > 0) {
            alert(`Please fill in the following fields: ${emptyFields.map(([key, value]) => key).join(", ")}`);
            return;
        }

        const promises = [];
        //loop insert per qty
        for (let i = 0; i < qty; i++) {
            promises.push(fetch(apiUrl + "tablets", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(newTabData),
            }));
        }
        const responses = await Promise.all(promises);
        const results = await Promise.all(responses.map(response => response.json()));
    
        let allSuccess = true;
        for (let i = 0; i < results.length; i++) {
            const result = results[i];
            if (!result.insertId) {
                allSuccess = false;
                alert(`Failed to add Tablet ${i + 1}`);
            }
        }
        if (allSuccess) {
            alert(`All ${qty} Tablets Saved`);
            logUser("Add New Tablet : " + item_name + " : " + qty);
            navigate('/tablets');
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