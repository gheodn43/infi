import React from 'react';
import mainLayout from '../components/layout/mainLayout';
import deckLayout from '../components/layout/deckLayout';
import ShareWithMe from '../components/contents/ShareWithMeContent';
const ContentWithDeckLayout = deckLayout(ShareWithMe);
const ContentWithMainLayout = mainLayout(ContentWithDeckLayout);

export default function ShareWithMePage() {
  return <ContentWithMainLayout />;
}
