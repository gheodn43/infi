import React from 'react';
import mainLayout from '../components/layout/mainLayout';
import IncognitoChecker from '../components/auth/IncognitoChecker';
import FeatsCarousel from '../components/carousels/FeatCarousel';

const ContentWithMainLayout = mainLayout(() => (
  <>
    <IncognitoChecker />
    <div className='mx-lg-5'><FeatsCarousel /></div>
  </>
));

export default function LandingPage() {
  return (
    <ContentWithMainLayout/>
  );
}
