import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AboutLink = () => {
    const { t } = useTranslation();
    return (
        <Link to="/about" className="m-1 link-underline rounded-1">
            {t('about.title')}
        </Link>
    );
};

export default AboutLink;
