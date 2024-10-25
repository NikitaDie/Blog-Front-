import React from 'react';
import ButtonRedirect from './RedirectButton';
import LoginLogoutButton from "./LoginLogoutButton";

const Header = ({ buttonText, linkPath }) => {
    return (
        <header className="d-flex justify-content-between bg-dark align-items-center top-0 position-sticky z-3">
            <div>
                <img src="/images/logo.svg" width={190} alt="Soptim Logo" className="p-4 mt-1" />
                <h1 className="text-white d-inline align-middle fs-3">Prakti-Blog
                    <span style={{ color: 'deeppink' }}>.</span>
                </h1>
            </div>
            <div className="d-flex align-items-center">
                <ButtonRedirect buttonText={buttonText} linkPath={linkPath} />
                <LoginLogoutButton />
            </div>
        </header>
    );
};

export default Header;
