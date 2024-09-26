import React from 'react';
import DeckRoute from '../buttons/DeckRoute';

const deckLayout = (WrappedComponent) => {
    return (props) => {
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

