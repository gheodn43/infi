import React from 'react';
import { useTranslation } from 'react-i18next';

export default function MyDeckLink () {
    const { t } = useTranslation();
    return (
        <a href="/deck/my-decks" className="btn text-white mb-0">
            {t('mydecks.title')}
        </a>
    );
};

