import React, { useEffect } from 'react';
import { useDeck } from '../../providers/PetContext';
const cardLayout = (WrappedComponent) => {
    
    return (props) => {
        const { deck } = useDeck();
        useEffect(() => {
            window.scrollTo(0, 0);
            document.body.style.overflow = '';
        }, []);
        return (
            <div className="d-flex flex-column" style={{height: "100vh", padding: "75px 0 100px 0"}}>
                <div className='d-flex fixed-top justify-content-between align-items-center px-3 w-100 infi-bg-dark border-b-1' style={{height: '56px'}}>
                    <div className='d-flex align-items-end gap-1'>
                        <img src='/images/infi-logo.png' alt='infi logo - Spaced repetition' style={{height: "30px"}}/>
                        <h5 className='fw-bold mb-0'>Infi</h5>
                    </div>
                    <h5 className=''>{deck.deck_name}</h5>
                    <div className='px-4 py-1'></div>
                </div>
                <main className='h-100 overflow-auto'>
                    <WrappedComponent {...props} />
                </main>
            </div>
        );
    };
};

export default cardLayout;

