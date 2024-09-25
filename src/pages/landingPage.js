import React from 'react';
import mainLayout from '../components/layout/mainLayout';
import IncognitoChecker from '../components/auth/IncognitoChecker';
import FeatsCarousel from '../components/carousels/FeatCarousel';
import MyDecks from '../components/buttons/MyDeckSection';
import ShareWithMe from '../components/buttons/ShareWMeSection';

const ContentWithMainLayout = mainLayout(() => (
  <>
    <IncognitoChecker />
    <div className='mx-lg-5'><FeatsCarousel /></div>
    <div className='mx-lg-5 d-flex flex-column flex-md-row justify-content-center align-items-center gap-2 gap-md-3'>
      <MyDecks />
      <ShareWithMe />
    </div>

  </>
));

export default function LandingPage() {
  return (
    <ContentWithMainLayout />
  );
}
