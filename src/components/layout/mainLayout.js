import React from 'react';
import Logo from '../buttons/logo';
import AboutLink from '../buttons/AboutLink'; 
import GuideLink from '../buttons/GuideLink'; 
import LanguageSwitcher from '../buttons/LanguageSwitcher';

const mainLayout = (WrappedComponent) => {
    return (props) => {
        return (
            <div className="d-flex flex-column">
                <header className="bg-dark fixed-top">
                    <div className="container d-flex justify-content-between align-items-center h-custom">
                        <Logo />
                        <div>
                            <AboutLink />
                            <GuideLink />
                            <LanguageSwitcher />
                        </div>
                    </div>
                </header>
                <main className="flex-fill mt-5 pt-5 px-2 px-md-3 px-lg-4 px-xl-5">
                    <WrappedComponent {...props} />
                </main>
                <footer className="bg-dark fixed-bottom">
                    <p className="text-center text-white py-3">Footer</p>
                </footer>
            </div>
        );
    };
};

export default mainLayout;
