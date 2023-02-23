import { useState, useEffect, useRef } from "react";
import dateFormat from 'dateformat';
import { Link } from "react-router-dom";

const Tablets = () => {
    const apiUrl = process.env.REACT_APP_API_URL + "tablets";
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedDateField, setSelectedDateField] = useState("date_added");
    const [selectedDate, setSelectedDate] = useState("");

    const searchTermRef = useRef(null);
    const dateFieldRef = useRef(null);

    useEffect(() => {
        fetch(apiUrl)
            .then(res => res.json())
            .then(data => setData(data));
    }, [apiUrl]);
    //search item name filter
    const filteredData = data.filter((item) => {
        const itemName = item.item_name.toLowerCase();
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

    //handle delete item
    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this item?");
        if (confirmDelete) {
            fetch(apiUrl + "/" + id, {
                method: "DELETE",
            })
            .then(() => {
                // remove the item from the data array
                setData(data.filter(item => item.id !== id));
            })
            .catch(error => console.error(error));
        }
    }

    return (
        <div className="container mt-6">
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
                                                    <option>Date Purchased</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="column is-one-third">
                                    <input className="input is-normal" type="date" onChange={handleDateChange} ref={dateFieldRef} />
                                </div>

                                <div className="column is-one-third">
                                    <button className="button is-danger" onClick={handleClearFilter} >CLEAR</button>
                                </div>
                            </div>
                        </div>
                        <div className="column is-pulled-right">
                            <Link to={"/tablets/create"} className="button is-primary is-pulled-right">ADD NEW (+)</Link>
                        </div>
                    </div>
                </div>
                <table className="table is-striped is-bordered is-fullwidth mt-2">
                    <thead>
                        <tr>
                            <th className="has-text-centered">Company</th>
                            <th className="has-text-centered">Item Name</th>
                            <th className="has-text-centered">Model</th>
                            <th className="has-text-centered">Serial</th>
                            <th className="has-text-centered">Date Purchased</th>
                            <th className="has-text-centered">Date Added</th>
                            <th className="has-text-centered">Remarks</th>
                            <th className="has-text-centered">Qty</th>
                            <th className="has-text-centered">Price</th>
                            <th className="has-text-centered">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map(item => (
                            <tr key={item.id}>
                                <td className="has-text-centered">{item.company}</td>
                                <td className="has-text-centered">{item.item_name}</td>
                                <td className="has-text-centered">{item.model}</td>
                                <td className="has-text-centered">{item.serial}</td>
                                <td className="has-text-centered">{dateFormat(item.dop, "mm-dd-yyyy")}</td>
                                <td className="has-text-centered">{dateFormat(item.date_added, "mm-dd-yyyy")}</td>
                                <td className="has-text-centered">{item.remarks}</td>
                                <td className="has-text-centered">{item.qty}</td>
                                <td className="has-text-centered">{formatNumber(item.price, 2)}</td>
                                <td className="has-text-centered">
                                    <Link to={`/tablets/update/${item.id}`} className="button is-primary mr-2">UPDATE</Link>
                                    <button className="button is-danger" onClick={() => handleDelete(item.id)}>DELETE</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )

    function formatNumber(num, decimalPlaces) {
        return num.toFixed(decimalPlaces);
    }

    function FieldChange(field) {
        if (field === "Date Added")
            field = "date_added"
        else field = "dop"

        return field;
    }
}

export default Tablets;