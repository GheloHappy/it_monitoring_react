import { useState, useEffect, useRef } from "react";
import dateFormat from 'dateformat';
import { Link } from "react-router-dom";
import logUser from "../Logs.js"


const Requests = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedDateField, setSelectedDateField] = useState("date_added");
    const [selectedDate, setSelectedDate] = useState("");
    const [status, setStatus] = useState("");

    const searchTermRef = useRef(null);
    const dateFieldRef = useRef(null);

    useEffect(() => {
        fetch(apiUrl + "requests")
            .then(res => res.json())
            .then(data => {
                setData(data);
            });
    }, [apiUrl]);
    //search item name filter
    const filteredData = data.filter((item) => {
        const itemName = item.description.toLowerCase();
        const searchTermLowerCase = searchTerm.toLowerCase();
        const dateField = FieldChange(selectedDateField);
        const itemDate = dateFormat(item[dateField], "yyyy-mm-dd");
        return itemName.includes(searchTermLowerCase) && (!selectedDate || itemDate === selectedDate);
    });
    const sortedData = filteredData.sort((a, b) => a.item_name.localeCompare(b.item_name));
    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleDateFieldChange = (event) => {
        setSelectedDateField(event.target.value);
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleClearFilter = () => {
        setSearchTerm("");
        setSelectedDateField("date_added");
        setSelectedDate("");
        searchTermRef.current.value = "";
        dateFieldRef.current.value = "";
    };


    return (
        <div className="mt-6 mr-5 ml-5">
            <div className="rows is-centered ">
                <div className="row">
                    <input className="input is-normal mt-5" type="text" placeholder="Search item name"
                        onChange={handleSearchTermChange} ref={searchTermRef} />
                </div>
                <div className="row mt-2">
                    <div className="columns">
                        <div className="column is-5">
                            <div className="columns">
                                <div className="column is-one-third">
                                    <div className="field">
                                        <div className="control">
                                            <div className="select">
                                                <select value={selectedDateField} onChange={handleDateFieldChange} ref={dateFieldRef}>
                                                    <option>Date Added</option>
                                                    <option>Date Received</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="column is-one-third">
                                    <input className="input is-normal" type="date" onChange={handleDateChange} ref={dateFieldRef} />
                                </div>
                                <div className="column is-one-third">
                                    <button className="button is-danger" onClick={handleClearFilter} >CLEAR FILTERS</button>
                                </div>
                            </div>
                        </div>
                        <div className="column is-pulled-right">
                            <Link to={"/requests/create"} className="button is-primary is-pulled-right">ADD NEW (+)</Link>
                        </div>
                    </div>
                </div>
                <table className="table is-striped is-bordered is-fullwidth mt-2">
                    <thead>
                        <tr>
                            <th className="has-text-centered">id</th>
                            <th className="has-text-centered">Department</th>
                            <th className="has-text-centered">Date Requested</th>
                            <th className="has-text-centered">Qty</th>
                            <th className="has-text-centered">Description</th>
                            <th className="has-text-centered">Remarks</th>
                            <th className="has-text-centered">Pending</th>
                            <th className="has-text-centered">Status</th>
                            <th className="has-text-centered">Date Received</th>
                            <th className="has-text-centered">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map(item => (
                            <tr key={item.id}>
                                <td className="has-text-centered">{item.id}</td>
                                <td className="has-text-centered">{item.department}</td>
                                <td className="has-text-centered">{dateFormat(item.date_requested, "mm-dd-yyyy")}</td>
                                <td className="has-text-centered">{item.qty}</td>
                                <td className="has-text-centered">{item.description}</td>
                                <td className="has-text-centered">{item.remarks}</td>
                                <td className="has-text-centered">{item.pending}</td>
                                {item.date_received === null ? <>
                                        <td className="has-text-centered has-text-success">Requested</td>
                                        <td className="has-text-centered"></td>
                                    </> : <>
                                        <td className="has-text-centered has-text-red">Done</td>
                                        <td className="has-text-centered">{dateFormat(item.date_received, "mm-dd-yyyy")}</td>
                                    </>
                                }
                                <td className="has-text-centered">
                                    <Link to={`/tablets/update/${item.id}`} className="button is-primary mr-2">UPDATE</Link>
                                    {/* <button className="button is-danger" onClick={() => handleDelete(item.id)}>DELETE</button> */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )

    function FieldChange(field) {
        if (field === "Date Added")
            field = "date_added"
        else field = "date_received"

        return field;
    }
}

export default Requests;