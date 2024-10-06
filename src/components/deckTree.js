import React, { useState } from "react";
import DeckOverviewPopup from "./popups/deckOverviewPopup";

export default function DeckTree({ decks, showImg }) {
    const [selectedDeckId, setSelectedDeckId] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const handleDeckClick = (deck_id) => {
        setSelectedDeckId(deck_id);
        setShowPopup(true);
        document.body.style.overflow = 'hidden'; // Ngăn cuộn trang khi popup mở
    };

    const closePopup = () => {
        setShowPopup(false);
        setSelectedDeckId(null);
        document.body.style.overflow = ''; // Khôi phục cuộn trang khi popup đóng
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
                            onClick={() => handleDeckClick(deck.deck_id)} 
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
