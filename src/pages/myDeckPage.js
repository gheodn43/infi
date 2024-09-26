import React from 'react';
import mainLayout from '../components/layout/mainLayout';
import deckLayout from '../components/layout/deckLayout';
import MyDeckContent from '../components/contents/MyDeckContent';
const ContentWithDeckLayout = deckLayout(MyDeckContent);
const ContentWithMainLayout = mainLayout(ContentWithDeckLayout);

export default function MyDeckPage() {
  return <ContentWithMainLayout />;
}
