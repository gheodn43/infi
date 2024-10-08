import React, { useEffect } from 'react';
import { useDeck } from '../../providers/PetContext';
const cardLayout = (WrappedComponent) => {
    
    return (props) => {
        const { deck } = useDeck();
        useEffect(() => {
            window.scrollTo(0, 0);
        }, []);
        return (
            <div className="d-flex flex-column h-max-100 overflow-auto">
                <div className='d-flex justify-content-between align-items-center px-3 py-2 w-100' style={{background: "#333645"}}>
                    <div className='d-flex align-items-end gap-1'>
                        <img src='/images/infi-logo.png' alt='infi logo - Spaced repetition' style={{height: "30px"}}/>
                        <h5 className='fw-bold mb-0'>Infi</h5>
                    </div>
                    <h5 className=''>{deck.deck_name}</h5>
                    <div className='px-2 py-1 bg-secondary rounded-2'>
                        Exit
                    </div>
                </div>
                <main className="content flex-fill">
                    <WrappedComponent {...props} />
                </main>
            </div>
        );
    };
};

export default cardLayout;

