import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate và useLocation
import PopupHeader from "./PopupHeader";
import AddCardPopup from "./AddCardPopup";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { getDeck } from "../../localDB/db";
import { useLiveQuery } from "dexie-react-hooks";

export default function DeckOverviewPopup({ onClose, deck_id }) {
    const { t } = useTranslation();
    const [isAddCardOpen, setIsAddCardOpen] = useState(false);
    const deck = useLiveQuery(() => getDeck(deck_id));
    const navigate = useNavigate();
    const location = useLocation();

    const handleOutsideClick = (event) => {
        if (event.target.classList.contains("popup-overlay") && !isAddCardOpen) {
            onClose();
        }
    };

    const openAddCardPopup = () => {
        setIsAddCardOpen(true);
    };

    const closeAddCardPopup = () => {
        setIsAddCardOpen(false);
    };

    const handleStudy = () => {
        const currentPath = location.pathname;
        navigate(`${currentPath}/study`);
    };

    return (
        <div
            className="popup-overlay d-flex justify-content-center align-items-center position-fixed top-0 bottom-0 start-0 end-0 bg-dark bg-opacity-25 z-1"
            onClick={handleOutsideClick}
        >
            <div className="modal-content container bg-dark text-light px-4 py-3 rounded w-md-50">
                <PopupHeader title={deck ? deck.deck_name : t("loading")} onClose={onClose} />
                <div className="modal-body mx-0 mx-md-3 mx-lg-5 my-3 d-flex flex-md-row">
                    {deck ? (
                        <>
                            <div className="w-50 d-flex flex-row align-content-center justify-content-between gap-3 gap-md-5">
                                <div>
                                    <p>{t("deckoverview.new_card")}:</p>
                                    <p>{t("deckoverview.learning_card")}:</p>
                                    <p>{t("deckoverview.review_card")}:</p>
                                    <p onClick={openAddCardPopup} className="link-underline-info text-center text-primary" style={{ cursor: 'pointer' }}>
                                        <FontAwesomeIcon icon={faPlus} className="mr-2" />
                                        {t("deckoverview.addcard_link")}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-primary text-bold">{deck.new_count}</p>
                                    <p className="text-danger text-bold">{deck.learning_count}</p>
                                    <p className="text-success text-bold">{deck.overdue_count}</p>
                                </div>
                            </div>
                            <div className="flex-grow-1 text-end align-content-center">
                                <button type="button" className="btn btn-light" disabled={!deck} onClick={handleStudy}>
                                    {t("deckoverview.studybtn")}
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="w-100 d-flex flex-row justify-content-between align-items-center">
                            <div className="skeleton w-75">
                                <div className="skeleton-line mb-2" style={{ width: '60%', height: '1.2rem', backgroundColor: '#444' }}></div>
                                <div className="skeleton-line mb-2" style={{ width: '80%', height: '1.2rem', backgroundColor: '#444' }}></div>
                                <div className="skeleton-line" style={{ width: '40%', height: '1.2rem', backgroundColor: '#444' }}></div>
                            </div>
                            <div className="skeleton-button" style={{ width: '100px', height: '40px', backgroundColor: '#444', borderRadius: '4px' }}></div>
                        </div>
                    )}
                </div>

                {isAddCardOpen && (
                    <AddCardPopup deck={deck} onClose={closeAddCardPopup} />
                )}
            </div>
        </div>
    );
}
