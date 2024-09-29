import Dexie from 'dexie';
import Deck from '../model/deck';
import Card from '../model/card';
import { v4 as uuidv4 } from 'uuid';

const db = new Dexie('DeckDatabase');
db.version(1).stores({
    decks: 'deck_id, deck_name, parent_deck_path, deck_status, deck_path, deck_type, new_count, learning_count, overdue_count, cooling_count, deck_properties, layout_setting_front, layout_setting_back, deck_last_update',
    cards: 'card_id, deck_id, front, back, difficulty, delay_value, step, avg_comp_time, status, again, hard, good, easy, overdue_at, created_at'
});

const addDeck = async (deck_name, deck_type) => {
    const names = deck_name.split('::');
    let parentPath = '';

    for (let i = 0; i < names.length; i++) {
        const currentName = names[i].trim();
        const currentPath = parentPath ? `${parentPath}::${currentName}` : currentName;

        const existingDeck = await db.decks
            .where('deck_path').equals(currentPath)
            .and(deck => deck.deck_type === deck_type)
            .first();
        if (existingDeck) {
            return `Deck with path "${currentPath}" and type "${deck_type}" already exists.`;
        }
        if (!existingDeck) {
            const newDeck = new Deck(
                uuidv4(),
                currentName,
                parentPath || null,
                deck_type,
                []
            );
            await db.decks.add(newDeck.getInfo());
        }
        parentPath = currentPath;
    }
    return 'successfully';
};


const getDeck = async (deck_id) => {
    return await db.decks.get(deck_id);
};

const deleteDeck = async (deck_id) => {
    return await db.decks.delete(deck_id);
};

const getAllDecks = async () => {
    return await db.decks.toArray();
};

const getDeckWithType = async (deck_type) => {
    return await db.decks.where('deck_type').equals(deck_type).toArray();
};

export { db, addDeck, getDeck, deleteDeck, getAllDecks, getDeckWithType };
