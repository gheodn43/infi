import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import './IncognitoChecker.css'; 

const IncognitoChecker = () => {
  const [isIncognito, setIsIncognito] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const { t } = useTranslation();

  const checkIncognito = async () => {
    try {
      const { quota } = await navigator.storage.estimate();
      if (quota <= 100000 * 1024 * 1024) {
        setIsIncognito(true);
        setShowPopup(true); // Hiển thị popup nếu ở chế độ ẩn danh
      }
    } catch (error) {
      console.error('Error checking incognito mode:', error);
      setIsIncognito(false);
    }
  };

  useEffect(() => {
    checkIncognito();
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      {isIncognito && showPopup && (
        <div className="incognito-overlay">
          <div className="incognito-popup bg-dark">
            <FontAwesomeIcon icon={faX} className="close-btn" onClick={handleClosePopup}/>
            <h2>{t('incognito.title')}</h2>
            <p>{t('incognito.message')}</p>
            <button className="understood-btn bg-white" onClick={handleClosePopup}>
              {t('incognito.button')}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default IncognitoChecker;
