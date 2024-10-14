import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const GuideLink = () => {
    const { t } = useTranslation();
    return (
        <Link to="/guide" className="text-white m-1 link-underline rounded-1">
            {t('guide.title')}
        </Link>
    );
};

export default GuideLink;
