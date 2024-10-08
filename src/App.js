import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DeckProvider } from './providers/PetContext';
import LandingPage from './pages/landingPage';
import AboutUsPage from './pages/aboutUsPage';
import GuidePage from './pages/guidePage';
import DeckPage from './pages/deckPage';
import MyDeckPage from './pages/myDeckPage';
import ShareWithMePage from './pages/shareWithMePage';
import CardPage from './pages/cardPage';

function App() {
  return (
    <DeckProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<LandingPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/guide" element={<GuidePage />} />
          <Route path="/deck" element={<DeckPage />} />
          <Route path="/deck/my-decks" element={<MyDeckPage />} />
          <Route path="/deck/share-with-me" element={<ShareWithMePage />} />
          <Route path="/deck/my-decks/study" element={<CardPage />} />
          <Route path="/deck/share-with-me/study" element={<CardPage />} />

        </Routes>
      </Router>
    </DeckProvider>
  );
}

export default App;
