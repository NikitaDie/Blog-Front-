import React from 'react';
import {Bounce, ToastContainer} from "react-toastify";

const Background = ({ children }) => {
    return (
        <div>
            <div
                style={{
                    backgroundImage: 'url(/images/2021-soptim-betonwand-rapport5-15.webp)',
                    width: '100%',
                    height: '100vh'
                }}
                className="d-flex flex-column justify-content-between "
            >
                {children}
            </div>
        </div>

    );
};

export default Background;
