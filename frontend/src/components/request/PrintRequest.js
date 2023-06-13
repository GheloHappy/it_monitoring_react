import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import logo from '../../img/mon-logo.png'
import moment from "moment";

export const PrintRequest = () => {
    const { id } = useParams();
    const apiUrl = process.env.REACT_APP_API_URL + "requests/ref/" + id;
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                setData(data);
            });
    }, [apiUrl]);

    const firstItem = data[0] || {};
    const { department, purpose, input_user: notedBy } = firstItem;

    return (
        <div className='container has-background-white'>
            <div className="mr-5 ml-5">
                <div className='rows'>
                    <div className='row'>
                        <div className="columns mt-1">
                            <div className='column is-5 mt-3'>
                                <figure className="image is-256x256">
                                    <img src={logo} alt='monheim logo' />
                                </figure>
                            </div>
                            <div className='column is-3 mt-5'>
                                <div className='rows'>
                                    <div className='row'>
                                        <h1 className='has-text-black is-size-7 has-text-centered'>Monheim Bldg. II,</h1>
                                    </div>
                                    <div className='row mt-1'>
                                        <h1 className='has-text-black is-size-7 has-text-centered'>Baltao Cpd. Ortigas Ave., </h1>
                                    </div>
                                    <div className='row mt-1'>
                                        <h1 className='has-text-black is-size-7 has-text-centered'>Taytay, Rizal</h1>
                                    </div>
                                    <div className='row mt-1'>
                                        <h1 className='has-text-black is-size-7 has-text-centered'>660.4733 / 658.5017 loc 108</h1>
                                    </div>
                                </div>
                            </div>
                            <div className='column is-4 mt-5'>
                                <div className='rows'>
                                    <div className='row'>
                                        <h1 className='has-text-black is-size-7'>
                                            Date Requested: {data ? <span>{moment(data.date_requested).format("MM/DD/YYYY")}</span> : null}
                                        </h1>
                                    </div>
                                    <div className='row mt-1'>
                                        <h1 className='has-text-black is-size-7'>Date Needed: </h1>
                                    </div>
                                    <div className='row mt-1'>
                                        <h1 className='has-text-black is-size-7'>P.O. #: </h1>
                                    </div>
                                    <div className='row mt-1'>
                                        <h1 className='has-text-black is-size-7'>P.R. #: </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row mt-1'>
                        <h1 className='has-text-black is-size-5 has-text-centered custom-border'> PURCHASE REQUEST FORM</h1>
                    </div>
                    <div className='row custom-border'>
                        <h1 className='has-text-black is-size-6 has-text-centered'>FROM (Department): {department}</h1>
                    </div>
                    <div className="row">
                        <table className="table is-striped is-bordered is-fullwidth ">
                            <thead>
                                <tr>
                                    <th className="has-text-centered">ON HAND</th>
                                    <th className="has-text-centered">QTY</th>
                                    <th className="has-text-centered">UOM</th>
                                    <th className="has-text-centered">BRAND</th>
                                    <th className="has-text-centered">DESCRIPTION/s</th>
                                    <th className="has-text-centered">END INV</th>
                                    <th className="has-text-centered">UNIT PRICE</th>
                                    <th className="has-text-centered">TOTAL AMOUNT</th>
                                    <th className="has-text-centered">REMARKS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* <tr key={data}>
                                    <td className="has-text-centered"></td>
                                    <td className="has-text-centered">{data.qty}</td>
                                    <td className="has-text-centered"></td>
                                    <td className="has-text-centered"></td>
                                    <td className="has-text-centered">{data.description}</td>
                                    <td className="has-text-centered"></td>
                                    <td className="has-text-centered"></td>
                                    <td className="has-text-centered"></td>
                                    <td className="has-text-centered">{data.remarks}</td>
                                </tr> */}
                                {data.map(item => (
                                    <tr key={item.id}>
                                        <td className="has-text-centered"></td>
                                        <td className="has-text-centered">{item.qty}</td>
                                        <td className="has-text-centered"></td>
                                        <td className="has-text-centered"></td>
                                        <td className="has-text-centered">{item.description}</td>
                                        <td className="has-text-centered"></td>
                                        <td className="has-text-centered"></td>
                                        <td className="has-text-centered"></td>
                                        <td className="has-text-centered">{item.remarks}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className='row'>
                        <h1 className='has-text-black is-size-6 has-text-left custom-border'>Purpose / Project : {purpose}</h1>
                    </div>
                    <div className='row mt-1'>
                        <div className="columns">
                            <div className="column">
                                <h1 className="has-text-black is-size-7 has-text-left ">PREPARED BY : {notedBy && <span className="is-underlined is-size-6">{notedBy}</span>}</h1>
                            </div>
                            <div className="column">
                                <h1 className="has-text-black is-size-7 has-text-left">NOTED BY : ________________________________</h1>
                                <h1 className="has-text-black is-size-7 has-text-centered">Supervisor/ Manager</h1>
                            </div>
                            <div className="column">
                                <h1 className="has-text-black is-size-7 has-text-left">________________________________________________</h1>
                                <h1 className="has-text-black is-size-7 has-text-centered">Purchasing Officer</h1>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="columns">
                            <div className="column">
                                <h1 className="has-text-black is-size-7 has-text-left mt-2">NOTED BY : __________________________________________</h1>
                                <h1 className="has-text-black is-size-7 has-text-centered">Signature Over Printed Name</h1>
                            </div>
                            <div className="column">
                                <h1 className="has-text-black is-size-7 has-text-left mt-2">APPROVED BY : _________________________________________________</h1>
                                <h1 className="has-text-black is-size-7 has-text-centered">BOD</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PrintRequest;