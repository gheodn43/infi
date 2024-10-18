import React, { useState } from "react";
import { useDeck } from "../providers/PetContext";
import DeckOverviewPopup from "./popups/deckOverviewPopup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteDeck } from "../localDB/db";
export default function DeckTree({ decks, showImg }) {
    const [selectedDeckId, setSelectedDeckId] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const { updateDeck, deck } = useDeck();

    const handleDeckClick = (deck_id, deck_name, deck_type, deck_properties, deck_front_layout, deck_back_layout) => {
        setSelectedDeckId(deck_id);
        setShowPopup(true);
        updateDeck({ deck_id: deck_id, deck_name: deck_name, deck_type: deck_type, deck_properties: deck_properties, deck_front_layout: deck_front_layout, deck_back_layout: deck_back_layout });
        document.body.style.overflow = 'hidden';
    };

    const closePopup = () => {
        setShowPopup(false);
        setSelectedDeckId(null);
        document.body.style.overflow = '';
    };

    const handleDelete = async (deck_id) => {
        const response = await deleteDeck(deck_id);
        console.log(response.status)
    }
    const handleDownload = async (deck_id) => {
        console.log(deck_id);
    }
    return (
        <div className="deck-tree-container my-5">
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
                <ul>
                    {decks.map((deckItem) => (
                        <li
                            key={deckItem.deck_id}
                            style={{ listStyleType: 'none' }}
                            className={`py-1 px-3 rounded-2 text-light ${deckItem.deck_id === deck.deck_id ? 'bg-dark' : 'bg-black'}`}
                        >
                            <div className="d-flex justify-content-between align-items-center">
                                <p
                                    className="mb-0"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleDeckClick(deckItem.deck_id, deckItem.deck_name, deckItem.deck_type, deckItem.deck_properties, deckItem.layout_setting_front, deckItem.layout_setting_back)}
                                >
                                    {deckItem.deck_name}
                                </p>
                                <div className="d-flex gap-2">
                                    <FontAwesomeIcon
                                        icon={faDownload}
                                        className="text-light"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handleDownload(deckItem.deck_id)} />
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        className="text-danger"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handleDelete(deckItem.deck_id)} />
                                </div>
                            </div>
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
