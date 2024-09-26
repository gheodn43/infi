export default function DeckTree({ decks }) {
    return (
        <div>
            {decks.length === 0 ? (
                <div className='text-center'>
                    <img src='/images/no-deck.png' alt='No Decks Available' className='img-not-found' />
                    <p>Không có deck nào được tạo.</p>
                </div>
            ) : (
                <ul>
                    {decks.map(deck => (
                        <li key={deck.deck_id}>
                            {deck.deck_name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}