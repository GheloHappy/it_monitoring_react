import logo from '../../img/mon-logo.png'

export const PrintRequest = () => {
    // const handlePrint = () => {
    //     window.print();
    // };

    return (
        <div className='container has-background-white'>
            <div className="mr-5 ml-5">
                <div className='rows'>
                    <div className='row'>
                        <div className="columns mt-1">
                            <div className='column is-5 mt-3'>
                                <figure className="image is-256x256">
                                    <img src={logo} />
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
                                        <h1 className='has-text-black is-size-7'>Date Requested: </h1>
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
                    <div className='row mt-1'>
                        <h1 className='has-text-black is-size-5 has-text-centered'>FROM (Department): </h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PrintRequest;