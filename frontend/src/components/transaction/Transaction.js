import { useParams  } from "react-router";
import { Link  } from "react-router-dom";
import { useState, useEffect } from "react";

const Transaction = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const { action, item_type, id } = useParams();

    const apiTranLink = apiUrl + "transactions/" + id;
    const [updatedTran, setUpdatedTran] = useState("");

    useEffect(() => {
        fetch(apiTranLink)
            .then(res => res.json())
            .then(data => {
                // set state with the data received from the API
                setUpdatedTran(data.transaction);
            })
            .catch(error => {
                console.log(error);
            });
    }, [apiTranLink]);

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
                                        {/* <select value={company} onChange={(e) => setCompany(e.target.value)} > */}
                                        <select>
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
                                    <input className="input" type="text" placeholder="Enter Name" />
                                        {/* value={item_name} onChange={(e) => setItemName(e.target.value)} /> */}
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <label className="label is-medium has-text-white has-text-left">Date Received</label>
                                    <input className="input" type="date" />
                                        {/* value={dop} onChange={(e) => setDop(e.target.value)} /> */}
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <label className="label is-medium has-text-white has-text-left">Item Name</label>
                                    <input className="input" type="text" disabled/>
                                        {/* value={item_name} onChange={(e) => setItemName(e.target.value)} /> */}
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <label className="label is-medium has-text-white has-text-left">Qty</label>
                                    <input className="input" type="number"/>
                                        {/* value={qty} onChange={(e) => setQty(e.target.value)} /> */}
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <label className="label is-medium has-text-white has-text-left">Remarks</label>
                                    <input className="input" type="text" placeholder="Enter Remarks" />
                                        {/* value={remarks} onChange={(e) => setItemName(e.target.value)} /> */}
                                </div>
                            </div>

                            <div className="columns">
                                <div className="column is-half">
                                    {/* <button onClick={handleUpdate} className="button is-info mt-5 is-fullwidth is-medium"
                                    >UPDATE</button> */}
                                    <button className="button is-info mt-5 is-fullwidth is-medium"
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