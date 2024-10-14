import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || 'en');

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'vi' : 'en';
    i18n.changeLanguage(newLanguage);
    setCurrentLanguage(newLanguage);
  };

  return (
    <div onClick={toggleLanguage} className="d-flex justify-content-center align-items-center infi-border LanguageSwitcher py-1 rounded-3 cursor-pointer">
      <FontAwesomeIcon icon={faGlobe} className="mr-2" />
      {currentLanguage === 'en' ? 'VI' : 'ENG'}
    </div>
  );
}

export default LanguageSwitcher;
