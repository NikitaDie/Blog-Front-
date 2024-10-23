import React from 'react';

const Header = ({ pageHeader, children }) => {
    // Filter children with the attribute "header"
    const headerChildren = React.Children.toArray(children).filter(child =>
        React.isValidElement(child) && child && child.props['data-header']
    );

    // Filter other children
    const otherChildren = React.Children.toArray(children).filter(child =>
        React.isValidElement(child) && !child.props['data-header']
    );

    return (
        <div className="flex-grow-1 d-flex flex-column bg-white w-75 mx-auto h-100 overflow-y-auto">
            <div className="d-flex flex-row justify-content-between align-items-start align-content-start">
                <h2 className="m-2 mb-3" style={{borderBottom: '2px solid DeepSkyBlue'}}>
                    {pageHeader}
                    <span style={{color: 'deeppink'}}>.</span>
                </h2>
                {headerChildren}
            </div>

            {otherChildren}
        </div>
    );
};

export default Header;
