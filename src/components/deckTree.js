import React, { useState } from "react";
import DeckOverviewPopup from "./popups/deckOverviewPopup";

export default function DeckTree({ decks }) {
    const [selectedDeckId, setSelectedDeckId] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const handleDeckClick = (deck_id) => {
        setSelectedDeckId(deck_id);
        setShowPopup(true);
        document.body.style.overflow = 'hidden';
    };

    const closePopup = () => {
        setShowPopup(false);
        setSelectedDeckId(null);
        document.body.style.overflow = '';
    };

    return (
        <div >
            {decks.length === 0 ? (
                <div className="text-center">
                    <img
                        src="/images/no-deck.png"
                        alt="No Decks Available"
                        className="img-not-found"
                    />
                    <p>Không có deck nào được tạo.</p>
                </div>
            ) : (
                <ul>
                    {decks.map((deck) => (
                        <li key={deck.deck_id} onClick={() => handleDeckClick(deck.deck_id)} style={{ cursor: 'pointer' }}>
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
