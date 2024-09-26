import React, { useState } from 'react';
import CreateDeckCustomPopup from '../popups/CreateDeckCustomPopup';
import CreateDeckImportFilePopup from '../popups/CreateDeckImportFIlePopup';
import { useTranslation } from 'react-i18next';

export default function CreateDeckButtons() {
    const [showCustomPopup, setShowCustomPopup] = useState(false);
    const [showImportPopup, setShowImportPopup] = useState(false);
    const { t } = useTranslation();

    const handleCreateDeckClick = () => {
        setShowCustomPopup(true);
    };

    const handleUploadFileClick = () => {
        setShowImportPopup(true);
    };

    const closeCustomPopup = () => {
        setShowCustomPopup(false);
    };

    const closeImportPopup = () => {
        setShowImportPopup(false);
    };

    return (
        <div className="w-100 d-flex flex-row gap-4 align-content-center justify-content-center">
            <div className="btn btn-light" onClick={handleCreateDeckClick}>
            {t('createdeckcustom.createbtn')}
            </div>
            <div className="btn btn-light" onClick={handleUploadFileClick}>
            {t('createdeckuploadfile.uploadbtn')}
            </div>
            {showCustomPopup && (
                <CreateDeckCustomPopup onClose={closeCustomPopup} />
            )}
            {showImportPopup && (
                <CreateDeckImportFilePopup onClose={closeImportPopup} />
            )}
        </div>
    );
}
