import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AboutLink = () => {
    const { t } = useTranslation();
    return (
        <Link to="/about" className="btn text-white mb-0 link-underline">
            {t('about.title')}
        </Link>
    );
};

export default AboutLink;
