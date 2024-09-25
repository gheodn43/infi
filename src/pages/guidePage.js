import React from 'react';
import mainLayout from '../components/layout/mainLayout';
import GuideContent from '../components/contents/GuideContent';
const ContentWithMainLayout = mainLayout(GuideContent);

export default function GuidePage() {
  return <ContentWithMainLayout />;
}
