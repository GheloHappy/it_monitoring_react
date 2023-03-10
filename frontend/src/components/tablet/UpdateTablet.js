import { useState, useEffect } from "react";
import moment from "moment";
import { Link, useNavigate, useParams } from "react-router-dom";

const UpdateTablet = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL + "tablets/" + id;
    const [company, setCompany] = useState("");
    const [item_name, setItemName] = useState("");
    const [model, setModel] = useState("");
    const [serial, setSerial] = useState("");
    const [dop, setDop] = useState("");
    const [others, setOthers] = useState("");
    const [remarks, setRemarks] = useState("");
    const [qty, setQty] = useState(0);
    const [price, setPrice] = useState(0);

    useEffect(() => {
        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                // set state with the data received from the API
                setCompany(data.company);
                setItemName(data.item_name);
                setModel(data.model);
                setSerial(data.serial);
                setDop(moment(data.dop).format("YYYY-MM-DD"));
                setOthers(data.others);
                setRemarks(data.remarks);
                setQty(data.qty);
                setPrice(data.price);
            })
            .catch(error => {
                console.log(error);
            });
    }, [apiUrl]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const data = {
            company,
            item_name,
            model,
            serial,
            dop,
            others,
            remarks,
            qty,
            price,
        }
        
        fetch(apiUrl, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {  
                alert('Tablet Updated');
                navigate('/tablets');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    return (
        <div className="container mt-6">
            <div className="columns is-centered">
                <div className="column mt-2 box has-text-centered mt-6" id="form">
                    <h1 className="title is-3 has-text-white ">UPDATE Tablet / Accessories</h1>
                    <div className="columns is-centered">
                        <div className="column is-three-quarters is-6 is-narrow">
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
                                    <button onClick={handleUpdate} className="button is-info mt-5 is-fullwidth is-medium"
                                    >UPDATE</button>
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

export default UpdateTablet;