import React from 'react';
import { Link } from "react-router-dom";

const RedirectButton = ({ buttonText, linkPath }) => {
    return (
        <Link className="btn btn-outline-light m-3" to={linkPath}>
            {buttonText}
        </Link>
    );
}

export default RedirectButton;