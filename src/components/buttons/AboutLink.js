import React from 'react';
import { useTranslation } from 'react-i18next';

const AboutLink = () => {
    const { t } = useTranslation();
    return (
        <a href="/about" className="btn text-white mb-0 link-underline">
            {t('about.title')}
        </a>
    );
};

export default AboutLink;
