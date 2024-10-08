import React, { createContext, useContext, useState } from 'react';
const DeckContext = createContext();
export const useDeck = () => {
    return useContext(DeckContext);
};
export const DeckProvider = ({ children }) => {
    const [deck, setDeck] = useState({
        deck_id: null,
        deck_name: '',
        deck_type: '',
        deck_front_layout: null,
        deck_back_layout: null
    });
    const updateDeck = (deckData) => {
        setDeck(prevDeck => ({
            ...prevDeck, 
            ...deckData
        }));
    };
    return (
        <DeckContext.Provider value={{ deck, updateDeck }}>
            {children}
        </DeckContext.Provider>
    );
};
