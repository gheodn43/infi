import React, { useState, useEffect, useRef } from 'react';
import Logo from '../buttons/logo';
import AboutLink from '../buttons/AboutLink';
import GuideLink from '../buttons/GuideLink';
import LanguageSwitcher from '../buttons/LanguageSwitcher';
import Footer from '../footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const mainLayout = (WrappedComponent) => {
    return (props) => {
        const [isMenuOpen, setIsMenuOpen] = useState(false);
        const menuRef = useRef(null); 
        const toggleRef = useRef(null);

        const toggleMenu = () => {
            setIsMenuOpen(prev => !prev); 
        };

        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target) && !toggleRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        useEffect(() => {
            window.scrollTo(0, 0);
            document.body.style.overflow = '';
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, []);

        useEffect(() => {
            const handleResize = () => {
                if (window.innerWidth >= 576) {
                    setIsMenuOpen(false);
                }
            };
            window.addEventListener('resize', handleResize);
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }, []);

        return (
            <div className="d-flex flex-column">
                <header className="fixed-top infi-bg-dark border-b-1" >
                    <div className="container d-flex justify-content-between align-items-center h-custom">
                        <Logo />
                        <div className="d-flex d-sm-none align-items-center gap-3" ref={toggleRef}>
                            <LanguageSwitcher/>
                            <FontAwesomeIcon
                                icon={faBars}
                                onClick={toggleMenu}
                                className="text-white cursor-pointer icon-size mb-0 ml-2 py-2"
                            />
                        </div>

                        <div className="d-none d-sm-flex align-items-center">
                            <AboutLink />
                            <GuideLink />
                            <LanguageSwitcher />
                        </div>
                    </div>
                    {isMenuOpen && (
                        <div
                            className="infi-bg-dark infi-border text-white p-3 position-fixed"
                            style={{ right: 0, top: '55px', width: '40%', borderRadius: '0 0 0 10px' }}
                            ref={menuRef}
                        >
                            <div className="d-flex flex-column align-items-start">
                                <AboutLink className="mb-2" />
                                <GuideLink className="mb-2" />
                            </div>
                        </div>
                    )}
                </header>
                <main className="flex-fill mt-5 py-5 px-2 px-md-3 px-lg-4 px-xl-5 min-vh-100">
                    <WrappedComponent {...props} />
                </main>
                <Footer/>
            </div>
        );
    };
};

export default mainLayout;
