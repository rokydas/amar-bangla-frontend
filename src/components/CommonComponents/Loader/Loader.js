import React from 'react';
import loader from '../../../Assets/images/loader.gif'

const Loader = () => {

    return (
        <div className="loader-div">
            <img width="100px" src={loader} alt='loader' />
        </div>
    );
};

export default Loader;