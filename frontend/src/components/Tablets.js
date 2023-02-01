import { useState, useEffect } from "react";
//import { useNavigate } from "react-router";
import dateFormat from 'dateformat';

const Tablets = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("http://192.168.1.75:4999/tablets")
        .then(res => res.json())
        .then(data => setData(data));
    }, []);
    return (
        <div className="container">
            <table className="table is-striped is-bordered is-fullwidth mt-5">
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
                        <td className="has-text-centered">{formatNumber(item.price,2)}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>     
    )

    function formatNumber(num, decimalPlaces) {
        return num.toFixed(decimalPlaces);
    }
}

export default Tablets;