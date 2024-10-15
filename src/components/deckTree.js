import React, { useState } from "react";
import { useDeck } from "../providers/PetContext";
import DeckOverviewPopup from "./popups/deckOverviewPopup";

export default function DeckTree({ decks, showImg }) {
    const [selectedDeckId, setSelectedDeckId] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const { updateDeck } = useDeck();

    const handleDeckClick = (deck_id, deck_name, deck_type, deck_properties, deck_front_layout, deck_back_layout) => {
        setSelectedDeckId(deck_id);
        setShowPopup(true);
        updateDeck({ deck_id: deck_id, deck_name: deck_name, deck_type: deck_type, deck_properties: deck_properties, deck_front_layout: deck_front_layout, deck_back_layout: deck_back_layout});
        document.body.style.overflow = 'hidden';
    };

    const closePopup = () => {
        setShowPopup(false);
        setSelectedDeckId(null);
        document.body.style.overflow = '';
    };

    return (
        <div className="deck-tree-container">
            {decks.length === 0 ? (
                <div className="text-center">
                    {showImg ? (
                        <>
                            <img
                                src="/images/no-deck.png"
                                alt="No Decks Available"
                                className="img-not-found"
                            />
                            <p>Không có deck nào được tạo.</p>
                        </>
                    ) : (
                        <p>Chưa tìm thấy Deck cho mục này</p>
                    )}
                </div>
            ) : (
                <ul className="deck-list">
                    {decks.map((deck) => (
                        <li 
                            key={deck.deck_id} 
                            onClick={() => handleDeckClick(deck.deck_id, deck.deck_name, deck.deck_type, deck.deck_properties, deck.layout_setting_front, deck.layout_setting_back)} 
                            style={{ cursor: 'pointer' }}
                            className="deck-item"
                        >
                            {deck.deck_name}
                        </li>
                    ))}
                </ul>
            )}

            {showPopup && (
                <DeckOverviewPopup onClose={closePopup} deck_id={selectedDeckId} />
            )}
        </div>
    );
}
