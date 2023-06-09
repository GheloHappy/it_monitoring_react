import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import logUser from "../Logs.js"


const CreateRequest = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [currentId, setCurrentId] = useState('');
    const [tableData, setTableData] = useState([]);
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
                var id = 0;
                if(data.latest_id != null) {
                    id = data.latest_id;
                }
                setCurrentId("IT" + id + getCurrentId());
            });
    }, [apiUrl]);

    const handleAddItem = () => {
        const newRow = { qty, description, remarks };
        setTableData([...tableData, newRow]);
        setQty('');
        setDescription('');
        setRemarks('');
    }

    const handleDelete = (index) => {
        const updatedTableData = [...tableData];
        updatedTableData.splice(index, 1);
        setTableData(updatedTableData);
      };

    const handleInsert = async () => {
        const requiredFields = { department, date_requested, purpose };
        const emptyFields = Object.entries(requiredFields).filter(([key, value]) => value === "");
        const data = {
            ...requiredFields,
            items: tableData,
            input_user,
            refnbr: currentId,
        }

        const checkTableData = () => {
            if (tableData.length === 0) {
                alert('Please add data to the table.');
                return false;
            }
            return true;
        };

        if (emptyFields.length > 0) {
            alert(`Please fill in the following fields: ${emptyFields.map(([key, value]) => key).join(", ")}`);
            return;
        }

        if (!checkTableData()) {
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
                                    <button onClick={handleAddItem} className="button is-info mt-1 is-fullwidth is-medium"
                                    >ADD</button>
                                </div>
                                <div className="column is-half">
                                    <Link to={"/requests"} className="button is-danger mt-1 is-fullwidth is-medium"
                                    >CANCEL</Link>
                                </div>
                            </div>
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
                            <div className="columns">
                                <div className="column is-fullwidth">
                                    <button onClick={handleInsert} className="button is-success mt- is-fullwidth is-medium"
                                    >SAVE</button>
                                </div>
                            </div>
                        </div>
                        <table className="table is-striped is-bordered is-fullwidth mt-5 mr-1 ml-1" >
                            <thead>
                                <tr>
                                    <th className="has-text-centered">QTY</th>
                                    <th className="has-text-centered">description</th>
                                    <th className="has-text-centered">Remarks</th>
                                    <th className="has-text-centered">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((row, index) => (
                                    <tr key={index}>
                                        <td className="has-text-centered">{row.qty}</td>
                                        <td className="has-text-centered">{row.description}</td>
                                        <td className="has-text-centered">{row.remarks}</td>
                                        <td className="has-text-centered">
                                            <button className="button is-danger mt-1" onClick={() => handleDelete(index)}
                                             >DELETE</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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