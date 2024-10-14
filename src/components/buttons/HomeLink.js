import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function HomeLink () {
    const { t } = useTranslation();
    return (
        <Link to="/" className="text-white m-1 text-decoration-none">
            {t('link.home')}
        </Link>
    );
};
