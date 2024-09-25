import React from 'react';
import mainLayout from '../components/layout/mainLayout';
import IncognitoChecker from '../components/auth/IncognitoChecker';

const ContentWithMainLayout = mainLayout(({ name }) => (
  <>
    <p>Hello {name}</p>
    <IncognitoChecker />
  </>
));

export default function LandingPage() {
  return (
    <ContentWithMainLayout name="maygheo" />
  );
}
