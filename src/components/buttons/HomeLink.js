import React from 'react';
import { useTranslation } from 'react-i18next';

export default function HomeLink () {
    const { t } = useTranslation();
    return (
        <a href="/" className="btn text-white mb-0">
            {t('link.home')}
        </a>
    );
};

