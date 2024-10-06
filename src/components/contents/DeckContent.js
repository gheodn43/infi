import { getDeckWithType } from '../../localDB/db';
import DeckTree from '../deckTree';
import { useLiveQuery } from 'dexie-react-hooks';

export default function DeckContent() {
    const myDecks = useLiveQuery(() => getDeckWithType('PRIVATE'));
    const shareWme = useLiveQuery(() => getDeckWithType('SHARE_WITH_ME'));

    // Kiểm tra xem dữ liệu đang được tải hay không
    const isLoadingMyDecks = myDecks === undefined;
    const isLoadingShareWme = shareWme === undefined;

    return (
        <div className='container my-3 d-flex flex-column gap-2'>
            <div className=''>
                <h4 className='text-start border-b-2'>
                    My Deck {myDecks?.length > 1 ? `- ${myDecks.length} decks` : myDecks?.length === 1 ? '- 1 deck' : ''}
                </h4>
                {myDecks ? <DeckTree decks={myDecks} showImg={false}/> : <p>Loading...</p>}
            </div>
            <div className=''>
                <h4 className='text-start border-b-2'>
                    Share With Me {shareWme?.length > 1 ? `- ${shareWme.length} decks` : shareWme?.length === 1 ? '- 1 deck' : ''}
                </h4>
                {shareWme ? <DeckTree decks={shareWme} showImg={false}/> : <p>Loading...</p>}
            </div>
        </div>
    );
}
