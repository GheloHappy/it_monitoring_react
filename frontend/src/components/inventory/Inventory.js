import { useState, useEffect, useRef } from "react";
import dateFormat from 'dateformat';

const Inventory = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("")
    const searchTermRef = useRef(null);

    useEffect(() => {
        fetch(apiUrl + "inventory")
            .then(res => res.json())
            .then(data => {
                setData(data);
            });
    }, [apiUrl]);

    //search item name filter
    const filteredData = data.filter((item) => {
        const itemName = item.item_name.toLowerCase();
        const searchTermLowerCase = searchTerm.toLowerCase();
        return itemName.includes(searchTermLowerCase);
    });

    const sortedData = filteredData.sort((a, b) => a.item_name.localeCompare(b.item_name));
    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    }

    return (
        <div className="mt-6 mr-5 ml-5">
            <div className="rows is-centered">
                <div className="row">
                    <input className="input is-normal mt-5" type="text" placeholder="Search item name"
                         onChange={handleSearchTermChange} ref={searchTermRef} />
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
                                <td className="has-text-centered">{item.total_qty}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Inventory;