import React, { useEffect } from 'react';
import DeckRoute from '../buttons/DeckRoute';

const deckLayout = (WrappedComponent) => {
    return (props) => {
        useEffect(() => {
            window.scrollTo(0, 0);
        }, []);
        return (
            <div className="d-flex flex-column">
                <DeckRoute/>
                <main className="content flex-fill">
                    <WrappedComponent {...props} />
                </main>
            </div>
        );
    };
};

export default deckLayout;

