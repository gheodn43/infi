import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function ShareWithMeLink () {
    const { t } = useTranslation();
    return (
        <Link to="/deck/share-with-me" className="btn text-white mb-0">
             {t('shareWithMe.title')}
        </Link>
    );
};