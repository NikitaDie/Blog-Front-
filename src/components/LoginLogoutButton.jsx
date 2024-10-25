import React from 'react';
import useAuth from "../hooks/useAuth";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLock, faRightToBracket, faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

function LoginLogoutButton() {
    const { authed, userToken, login, logout } = useAuth();
    const navigate = useNavigate();

    const handleAuthAction = () => {
        if (authed) {
            logout();
            toast.success('You have successfully signed out.')
            navigate('/');
        } else {
            navigate('/login');
        }
    };

    return (
        <button className="m-3" data-toggle="tooltip" data-placement="bottom" title={authed ? "Logout" : "Login"}
                onClick={handleAuthAction}
                style={{all: 'unset', cursor: 'pointer'}}
        >
            <FontAwesomeIcon icon={authed ? faRightFromBracket : faRightToBracket} style={{ color: "#fcfcfc", width: '30px', height: '30px' }} />
        </button>
    );

}

export default LoginLogoutButton;
