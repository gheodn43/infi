import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function MyDeckLink () {
    const { t } = useTranslation();
    return (
        <Link to="/deck/my-decks" className="btn text-white mb-0">
            {t('mydecks.title')}
        </Link>
    );
};
