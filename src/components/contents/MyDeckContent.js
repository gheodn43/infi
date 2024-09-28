import React from 'react';
import CreateDeckButtons from '../buttons/CreateDeckButton';
import { getDeckWithType } from '../../localDB/db'; 
import DeckTree from '../deckTree';
import { useLiveQuery } from 'dexie-react-hooks';

const MyDeckContent = () => {
  const decks = useLiveQuery(() => getDeckWithType('PRIVATE'));

  return (
    <div className='container my-3'>
      <h4 className='text-center'>My Decks</h4>
      {decks ? <DeckTree decks={decks} /> : <p>Loading...</p>}
      <CreateDeckButtons />
    </div>
  );
};

export default MyDeckContent;
