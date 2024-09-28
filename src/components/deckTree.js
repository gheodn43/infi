import React, { useState } from "react";
import DeckOverviewPopup from "./popups/deckOverviewPopup";

export default function DeckTree({ decks }) {
    const [selectedDeckId, setSelectedDeckId] = useState(null); // State to track the selected deck
    const [showPopup, setShowPopup] = useState(false); // State to track popup visibility

    const handleDeckClick = (deck_id) => {
        setSelectedDeckId(deck_id); // Set the clicked deck's ID
        setShowPopup(true); // Show the popup
    };

    const closePopup = () => {
        setShowPopup(false); // Close the popup
        setSelectedDeckId(null); // Clear selected deck
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
