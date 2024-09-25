import React from 'react';
import HomeLink from '../buttons/HomeLink';
import DeckLink from '../buttons/DeckLink';

const deckLayout = (WrappedComponent) => {
    return (props) => {
        return (
            <div className="d-flex flex-column">
                <div className="px-lg-3 d-wrapper gap-3 bg-primary-cus rounded-1">
                    <HomeLink />
                    <span>/</span>
                    <DeckLink />
                    <span>/</span>
                </div>
                <main className="content flex-fill">
                    <WrappedComponent {...props} />
                </main>
            </div>
        );
    };
};

export default deckLayout;

