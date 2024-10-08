import React from 'react';
import cardLayout from '../components/layout/cardLayout';
import CardContent from '../components/contents/CardContent';
const ContentWithCardLayout = cardLayout(CardContent);
export default function CardPage() {
  return <ContentWithCardLayout />;
}
