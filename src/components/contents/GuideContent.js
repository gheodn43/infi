import React from 'react';
import { useTranslation } from 'react-i18next';

const GuideContent = () => {
    const { t } = useTranslation();
  return (
    <div>
      <h1>{t('guide.title')}</h1>
      <p>{t('guide.content')}</p>
    </div>
  );
};

export default GuideContent;