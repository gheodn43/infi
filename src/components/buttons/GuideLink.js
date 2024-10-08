import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const GuideLink = () => {
    const { t } = useTranslation();
    return (
        <Link to="/guide" className="btn text-white mb-0 link-underline">
            {t('guide.title')}
        </Link>
    );
};

export default GuideLink;
