import React from 'react';

const Background = ({ children }) => {
    return (
        <div
            style={{
                backgroundImage: 'url(/images/2021-soptim-betonwand-rapport5-15.webp)',
                width: '100%',
                // MaxHeight: '100vh',
                height: '100vh'
            }}
            className="d-flex flex-column justify-content-between "
        >
            {children}
        </div>
    );
};

export default Background;
