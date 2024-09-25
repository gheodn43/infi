import React from 'react';
import mainLayout from '../components/layout/mainLayout';
import AboutUsContent from '../components/contents/AboutUsContent';
const ContentWithMainLayout = mainLayout(AboutUsContent);

export default function AboutUsPage() {
  return <ContentWithMainLayout />;
}
