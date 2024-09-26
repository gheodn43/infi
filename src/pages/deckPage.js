import React from 'react';
import mainLayout from '../components/layout/mainLayout';
import deckLayout from '../components/layout/deckLayout';
import DeckContent from '../components/contents/DeckContent';
const ContentWithDeckLayout = deckLayout(DeckContent);
const ContentWithMainLayout = mainLayout(ContentWithDeckLayout);

export default function DeckPage() {
  return <ContentWithMainLayout />;
}
