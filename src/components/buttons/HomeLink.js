import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function HomeLink () {
    const { t } = useTranslation();
    return (
        <Link to="/" className="btn text-white mb-0">
            {t('link.home')}
        </Link>
    );
};
