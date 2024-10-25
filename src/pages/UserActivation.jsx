import React from 'react';
import {Link, Navigate, useLocation} from "react-router-dom";

function UserActivation() {
    const location = useLocation();

    if (!location.state || !location.state.fromComponent) {
        return <Navigate to="/home"></Navigate>
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center text-center" style={{height: '100vh'}}>
            <h1>You account has been successfully created! <br/>Check your E-mail for verification link!</h1>
            <div style={{width: '500px'}}>
                <div className="d-flex justify-content-center">
                    <div className="p-2 w-100">
                        <Link className="btn btn-primary btn-lg w-100" to="/home">Home</Link>
                    </div>
                    <div className="p-2 w-100">
                        <Link className="btn btn-primary btn-lg w-100" to="/login">Log In</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserActivation;
