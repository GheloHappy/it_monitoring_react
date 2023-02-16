import { useState, useEffect } from "react";
//import { useNavigate } from "react-router";
import dateFormat from 'dateformat';
import AddTablet from "./AddTablet";

const Tablets = () => {
    const [data, setData] = useState([]);
    const [activeButton, setActiveButton] = useState("history");

    useEffect(() => {
        fetch("http://192.168.1.75:4999/tablets")
            .then(res => res.json())
            .then(data => setData(data));
    }, []);

    const handleButtonClick = (button) => {
        setActiveButton(button);
    };

    return (
        <div>
            <div className="container mt-6">
                <div className="columns">
                    <div className="column">
                        <button
                            id="btnHistory"
                            className={`button is-primary mt-5 is-medium is-fullwidth ${
                                activeButton === "history" ? "is-active" : ""
                            }`}
                            onClick={() => handleButtonClick("history")}
                        >
                            History
                        </button>
                    </div>
                    <div className="column">
                        <button
                            id="btnAdd"
                            className={`button is-info mt-5 is-medium is-fullwidth ${
                                activeButton === "add" ? "is-active" : ""
                            }`}
                            onClick={() => handleButtonClick("add")}
                        >
                            Add
                        </button>
                    </div>
                    <div className="column">
                        <button
                            id="btnUpdate"
                            className={`button is-danger mt-5 is-medium is-fullwidth ${
                                activeButton === "update" ? "is-active" : ""
                            }`}
                            onClick={() => handleButtonClick("update")}
                        >
                            Update
                        </button>
                    </div>
                    <div className="column">
                        <button
                            id="btnRelRet"
                            className={`button is-warning mt-5 is-medium is-fullwidth ${
                                activeButton === "relRet" ? "is-active" : ""
                            }`}
                            onClick={() => handleButtonClick("relRet")}
                        >
                            Release/Return
                        </button>
                    </div>
                </div>
            </div>
            {activeButton === "add" && (
                <AddTablet />
            )}
            {activeButton === "history" && 
                <div className="container">
                    <table className="table is-striped is-bordered is-fullwidth mt-2">
                        <thead>
                            <tr>
                                <th className="has-text-centered">Company</th>
                                <th className="has-text-centered">Name</th>
                                <th className="has-text-centered">MoP</th>
                                <th className="has-text-centered">Serial</th>
                                <th className="has-text-centered">DoP</th>
                                <th className="has-text-centered">Others</th>
                                <th className="has-text-centered">Remarks</th>
                                <th className="has-text-centered">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => (
                                <tr key={item.id}>
                                    <td className="has-text-centered">{item.company}</td>
                                    <td className="has-text-centered">{item.assigned_name}</td>
                                    <td className="has-text-centered">{item.mode}</td>
                                    <td className="has-text-centered">{item.serial}</td>
                                    <td className="has-text-centered">{dateFormat(item.date_purchased, "mm-dd-yyyy")}</td>
                                    <td className="has-text-centered">{item.others}</td>
                                    <td className="has-text-centered">{item.remarks}</td>
                                    <td className="has-text-centered">{formatNumber(item.price, 2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )

    function formatNumber(num, decimalPlaces) {
        return num.toFixed(decimalPlaces);
    }
}

export default Tablets;