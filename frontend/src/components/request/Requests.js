import { useState, useEffect, useRef } from "react";
import dateFormat from 'dateformat';
import { Link } from "react-router-dom";
//import { jsPDF } from "jspdf";

const Requests = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedDateField, setSelectedDateField] = useState("date_added");
    const [selectedDate, setSelectedDate] = useState("");

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
    const sortedData = filteredData
        .filter(item => item.description) // Filter out items where item_name is undefined
        //.sort((a, b) => a.description.localeCompare(b.description));
        .sort((a, b) => new Date(b.date_requested) - new Date(a.date_requested));
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
        setSelectedDateField("date_requested");
        setSelectedDate("");
        searchTermRef.current.value = "";
        dateFieldRef.current.value = "";
    };

    // const generatePDF = () => {
    //     var header = new Image();
    //     header.src = require('../../img/header.png');
    //     const doc = new jsPDF();

    //     header.onload = function () {
    //         doc.setFontSize(12);
    //         const imageWidth = doc.internal.pageSize.getWidth(); // Get the width of the page
    //         const imageHeight = (header.height * imageWidth) / header.width; // Calculate height based on aspect ratio

    //         doc.addImage(header, 'PNG', 10, 10, 100, 50);

    //         // Insert values from your system dynamically
    //         //   let startY = 20;
    //         //   data.forEach(item => {
    //         //     doc.text(`ID: ${item.id}`, 10, startY);
    //         //     doc.text(`Department: ${item.department}`, 30, startY);
    //         //     startY += 10; // Increment startY for the next item
    //         //   });

    //         // Save or open the PDF document
    //         doc.save("test.pdf");
    //     };
    // };

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
                                                    <option>Date Requested</option>
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
                            <th className="has-text-centered">Purpose</th>
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
                                <td className="has-text-centered">{item.purpose}</td>
                                <td className="has-text-centered">{item.pending}</td>
                                {item.date_received === null ? <>
                                    <td className="has-text-centered has-text-success">Requested</td>
                                    <td className="has-text-centered"></td>
                                    <td className="has-text-centered">
                                        <Link to={`/requests/update/${item.id}`} className="button is-primary mr-2 mt-1">UPDATE</Link>
                                        <Link to={`/requests/print/${item.id}`} className="button is-info mr-2 mt-1" target="_blank" rel="noopener noreferrer">PRINT</Link>
                                        {/* <button className="button is-info mt-1" onClick={generatePDF}>PRINT</button> */}
                                    </td>
                                </> : <>
                                    <td className="has-text-centered has-text-danger">Done</td>
                                    <td className="has-text-centered">{dateFormat(item.date_received, "mm-dd-yyyy")}</td>
                                </>
                                }

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