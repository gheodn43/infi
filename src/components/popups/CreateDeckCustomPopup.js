import React, { useState } from "react";
import PopupHeader from "./PopupHeader";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { addDeck } from "../../localDB/db";

export default function CreateDeckCustomPopup({ onClose }) {
    const { t } = useTranslation();
    const [deckName, setDeckName] = useState("");
    const [error, setError] = useState("");

    const handleOutsideClick = (event) => {
        if (event.target.classList.contains("popup-overlay")) {
            onClose();
        }
    };

    const handleInputChange = (event) => {
        setDeckName(event.target.value);
    };

    const handleCreateDeck = async () => {
        try {
            const message = await addDeck(deckName, 'PRIVATE');
            if (message === 'successfully') onClose();
            setError(`${deckName} `)
        } catch (error) {
            console.error("Error adding deck:", error);
        }
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && deckName) {
            handleCreateDeck();
        }
    };

    return (
        <div className="popup-overlay d-flex justify-content-center align-items-center position-fixed top-0 bottom-0 start-0 end-0 bg-dark bg-opacity-75 z-1" onClick={handleOutsideClick}>
            <div className="modal-content container bg-dark text-light px-4 py-3 rounded w-md-50">
                <PopupHeader title={t('createdeckcustom.title')} onClose={onClose} />
                <div className="modal-body mx-0 mx-md-3 mx-lg-5 my-4">
                    <div className="position-relative">
                        <label htmlFor="deckName" className="position-absolute bg-dark label-cus">Deck Name</label>
                        <input
                            type="text"
                            className="rounded-3 input-cus w-100"
                            placeholder="eg: exam1::sub1"
                            id="deckName"
                            required
                            autoFocus
                            value={deckName}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        />
                        {error && (
                            <div className="px-2 py-1 mt-2 bg-danger d-flex align-items-center rounded-2">
                                <FontAwesomeIcon icon={faTriangleExclamation} className="me-2" />
                                <p className="mb-0">{error} {t('createdeckcustom.error')}</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="modal-footer border-0 gap-2">
                    <button type="button" className="btn btn-outline-secondary" onClick={onClose}>{t('createdeckcustom.cancelbtn')}</button>
                    <button type="button" className="btn btn-light" disabled={!deckName} onClick={handleCreateDeck}>{t('createdeckcustom.createbtn')}</button>
                </div>
            </div>
        </div>
    );
}
