import React from 'react';
import { useTranslation } from 'react-i18next';

export default function ShareWithMeLink () {
    const { t } = useTranslation();
    return (
        <a href="/deck/share-with-me" className="btn text-white mb-0">
            {t('shareWithMe.title')}
        </a>
    );
};

