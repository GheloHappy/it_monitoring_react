const AddTablet = () => {
    return (
        <div className="container">
            <div className="columns is-centered">
                <div className="column mt-2 box has-text-centered" id="form">
                    <h1 className="title is-3 has-text-white ">Add new Tablet / Accessories</h1>
                    <div className="columns is-centered">
                        <div className="column is-three-quarters is-6 is-narrow"> 
                            <div className="field">
                                <div className="control">
                                    <label className="label is-medium has-text-white has-text-left">Company</label>
                                    <div className="select is-fullwidth">
                                        <select>
                                            <option> </option>
                                            <option>Monheim</option>
                                            <option>Maryland</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <label className="label is-medium has-text-white has-text-left">Item Name</label>
                                    <input className="input" type="text" placeholder="Enter Item Name"/>
                                </div>                  
                            </div>
                            <div className="field">
                                <div className="control">
                                    <label className="label is-medium has-text-white has-text-left">Model</label>
                                    <input className="input" type="text" placeholder="Enter Model"/>
                                </div>                  
                            </div>
                            <div className="field">
                                <div className="control">
                                    <label className="label is-medium has-text-white has-text-left">Serial</label>
                                    <input className="input" type="text" placeholder="Enter Serial"/>
                                </div>                  
                            </div>
                            <div className="field">
                                <div className="control">
                                    <label className="label is-medium has-text-white has-text-left">Serial</label>
                                    <input className="input" type="text" placeholder="Enter Serial"/>
                                </div>                  
                            </div>
                            <div className="field">
                                <div className="control">
                                    <label className="label is-medium has-text-white has-text-left">Date Purchased</label>
                                    <input className="input" type="date"/>
                                </div>                  
                            </div>
                            <div className="field">
                                <div className="control">
                                    <label className="label is-medium has-text-white has-text-left">Others</label>
                                    <input className="input" type="text"/>
                                </div>                  
                            </div>
                            <div className="field">
                                <div className="control">
                                    <label className="label is-medium has-text-white has-text-left">Remarks</label>
                                    <input className="input" type="text"/>
                                </div>                  
                            </div>
                            <div className="field">
                                <div className="control">
                                    <label className="label is-medium has-text-white has-text-left">Price</label>
                                    <input className="input" type="number"/>
                                </div>                  
                            </div>
                            <button className="button is-info mt-5 is-fullwidth is-medium"
                            >ADD</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AddTablet;