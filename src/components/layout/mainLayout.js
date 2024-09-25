import React, { useState, useEffect, useRef } from 'react';
import Logo from '../buttons/logo';
import AboutLink from '../buttons/AboutLink'; 
import GuideLink from '../buttons/GuideLink'; 
import LanguageSwitcher from '../buttons/LanguageSwitcher';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const mainLayout = (WrappedComponent) => {
    return (props) => {
        const [isMenuOpen, setIsMenuOpen] = useState(false);
        const menuRef = useRef(null); // Create a ref for the menu
        const toggleRef = useRef(null); // Create a ref for the toggle icon

        const toggleMenu = () => {
            setIsMenuOpen(prev => !prev); // Toggle the menu state
        };

        const handleClickOutside = (event) => {
            // Check if the click is outside the menu and the toggle icon
            if (menuRef.current && !menuRef.current.contains(event.target) && !toggleRef.current.contains(event.target)) {
                setIsMenuOpen(false); // Close the menu if clicking outside
            }
        };

        useEffect(() => {
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, []);

        useEffect(() => {
            const handleResize = () => {
                if (window.innerWidth >= 576) {
                    setIsMenuOpen(false); // Close the menu on resizing to larger screens
                }
            };
            window.addEventListener('resize', handleResize);
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }, []);

        return (
            <div className="d-flex flex-column">
                <header className="bg-dark fixed-top">
                    <div className="container d-flex justify-content-between align-items-center h-custom">
                        <Logo />
                        {/* Menu for small screens */}
                        <div className="d-block d-sm-none" ref={toggleRef}>
                            <FontAwesomeIcon 
                                icon={faBars} 
                                onClick={toggleMenu} 
                                className="text-white cursor-pointer icon-size mb-0" 
                            />
                        </div>
                        {/* Menu for larger screens */}
                        <div className="d-none d-sm-flex">
                            <AboutLink />
                            <GuideLink />
                            <LanguageSwitcher />
                        </div>
                    </div>
                    {/* Display menu when clicking on faBars */}
                    {isMenuOpen && (
                        <div 
                            className="bg-dark text-white p-3 position-fixed" 
                            style={{ right: 0, top: '56px', width: '50%' }} 
                            ref={menuRef} // Attach the ref here
                        >
                            <div className="d-flex flex-column align-items-start">
                                <AboutLink className="mb-2" />
                                <GuideLink className="mb-2" />
                                <LanguageSwitcher />
                            </div>
                        </div>
                    )}
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
