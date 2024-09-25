import React from 'react';
import { useTranslation } from 'react-i18next';

const GuideLink = () => {
    const { t } = useTranslation();
    return (
        <a href="/guide" className="btn text-white mb-0 link-underline">
            {t('guide.title')}
        </a>
    );
};

export default GuideLink;
