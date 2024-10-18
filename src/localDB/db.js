import Dexie from 'dexie';
import Deck from '../model/deck';
import {Card, Status} from '../model/card';
import { v4 as uuidv4 } from 'uuid';

const db = new Dexie('DeckDatabase');
db.version(1).stores({
    decks: 'deck_id, deck_name, parent_deck_path, deck_status, deck_path, deck_type, new_count, learning_count, overdue_count, cooling_count, deck_properties, layout_setting_front, layout_setting_back, deck_last_update',
    cards: 'card_id, deck_id, front, back, difficulty, delay_value, step, avg_comp_time, status, again, hard, good, easy, overdue_at, created_at'
});

const addDeck = async (deck_path, deck_type) => {
    const layoutDefault = {
        layoutType: "vertically",
        alignment: "center",
        blocks: []
    };
    const names = deck_path.split('::');
    let parentPath = '';
    const deck_properties = [];
    const layout_setting_front = layoutDefault;
    const layout_setting_back = layoutDefault;

    for (let i = 0; i < names.length; i++) {
        const currentName = names[i].trim();
        const currentPath = parentPath ? `${parentPath}::${currentName}` : currentName;

        // Kiểm tra xem deck đã tồn tại với path và type tương ứng hay chưa
        const existingDeck = await db.decks
            .where('deck_path').equals(currentPath)
            .and(deck => deck.deck_type === deck_type)
            .first();
        
        if (!existingDeck) {
            // Tạo deck mới nếu chưa tồn tại
            const newDeck = new Deck(
                uuidv4(),
                currentName,
                parentPath || null,
                deck_type,
                deck_properties,
                layout_setting_front,
                layout_setting_back
            );
            await db.decks.add(newDeck.getInfo());
        }

        // Cập nhật parentPath cho lần lặp tiếp theo
        parentPath = currentPath;
    }

    return 'successfully';
};

const deleteDeck = async (deck_id) => {
    const deck = await db.decks.get(deck_id);
    if (!deck) {
        return { status: 404, message: 'Deck not found' };
    }
    const { deck_path } = deck;
    const decksToDelete = await db.decks
        .where('deck_path')
        .startsWith(deck_path)
        .toArray();
    for (const deckToDelete of decksToDelete) {
        await db.cards.where('deck_id').equals(deckToDelete.deck_id).delete();
    }
    await db.decks
        .where('deck_path')
        .startsWith(deck_path)
        .delete();
    return { status: 200, message: 'Deck and its associated cards deleted successfully' };
};

const updateDeckAfterAddCard = async (deckId, properties, frontBlocks, backBlocks, quantityAdded) => {
    const deck = await db.decks.get(deckId);
    if (!deck) {
        return { status: 404, message: 'Deck not found' };
    }
    const newCount = deck.new_count + quantityAdded;
    await db.decks.update(deckId, {
        deck_properties: properties,
        layout_setting_front: frontBlocks,
        layout_setting_back: backBlocks,
        new_count: newCount,
        deck_last_update: new Date().toISOString()
    });
    return { status: 200, message: 'Deck updated successfully' };
};
const updateDeckAfterLearning = async (deckId, from, to, count) => {
    const deck = await db.decks.get(deckId);
    if (!deck) {
        throw new Error(`Deck with ID "${deckId}" not found.`);
    }
    switch (from) {
        case Status.NEW_CARD:
            if (to === Status.LEARNING_CARD){
                await db.decks.update(deckId, {
                    new_count: deck.new_count -= count,
                    learning_count: deck.learning_count += count,
                    deck_last_update: new Date().toISOString()
                });
            }else if (to === Status.COOLING_CARD) {
                await db.decks.update(deckId, {
                    new_count: deck.new_count -= count,
                    cooling_count: deck.cooling_count += count,
                    deck_last_update: new Date().toISOString()
                });
            }
            break;
        case Status.LEARNING_CARD:
            await db.decks.update(deckId, {
                learning_count: deck.learning_count -= count,
                cooling_count: deck.cooling_count += count,
                deck_last_update: new Date().toISOString()
            });
            break;
        case Status.REVIEW_CARD:
            if (to === Status.LEARNING_CARD){
                await db.decks.update(deckId, {
                    overdue_count: deck.overdue_count -= count,
                    learning_count: deck.learning_count += count,
                    deck_last_update: new Date().toISOString()
                });
            }
            else if (to === Status.COOLING_CARD) {
                await db.decks.update(deckId, {
                    overdue_count: deck.overdue_count -= count,
                    cooling_count: deck.cooling_count += count,
                    deck_last_update: new Date().toISOString()
                });
            }
            break;
        default:
            break;
    }
}

const updateDeckWhenOverdue = async (deckId, count) => {
    const deck = await db.decks.get(deckId);
    if (!deck) {
        throw new Error(`Deck with ID "${deckId}" not found.`);
    }
    await db.decks.update(deckId, {
        cooling_count: deck.cooling_count -= count,
        overdue_count: deck.overdue_count += count,
        deck_last_update: new Date().toISOString()
    });
};

const addCard = async (deck_id, usingProperties, t) => {
    const frontProperties = [];
    const backProperties = [];
    usingProperties.forEach(({ property_name, property_value, used_at }) => {
        if (property_value) {
            if (used_at.includes('front')) {
                frontProperties.push({
                    property: property_name,
                    value: property_value
                });
            }
            if (used_at.includes('back')) {
                backProperties.push({
                    property: property_name,
                    value: property_value
                });
            }
        }
    });
    if (frontProperties.length === 0) {
        return { status: 400, message: t('addCard.lackOfFrontErr') };
    }
    if (backProperties.length === 0) {
        return { status: 400, message: t('addCard.lackOfBackErr') };
    }
    const newCard = new Card(
        uuidv4(),
        deck_id,
        frontProperties,
        backProperties
    );

    await db.cards.add(newCard.getInfo());
    return { status: 200, message: 'Card added successfully' };
};


//NEW_CARD LEARNING_CARD, REVIEW_CARD, COOLING_CARD
const getCardOfDeck = async (deck_id) => {
    const currentDeck = await db.decks.get(deck_id);
    if (!currentDeck) {
        return []; // Trả về mảng rỗng nếu không tìm thấy deck
    }

    const allDecks = await db.decks
        .where('deck_path')
        .startsWith(currentDeck.deck_path)
        .toArray();
    const deckIds = allDecks.map(deck => deck.deck_id);
    const allCards = await db.cards
        .where('deck_id')
        .anyOf(deckIds)
        .toArray();

    const filteredCards = allCards.filter(card => card.status !== Status.COOLING_CARD);
    // Sắp xếp các card theo thứ tự ưu tiên
    const sortedCards = filteredCards.sort((a, b) => {
        const statusPriority = {
            'LEARNING_CARD': 1,
            'REVIEW_CARD': 2,
            'NEW_CARD': 3
        };
        return statusPriority[a.status] - statusPriority[b.status];
    });

    return sortedCards;
};


const updateCardById = async (card_id, updatedCard) => {
    const card = await db.cards.get(card_id);
    if (!card) {
        throw new Error(`Card with ID "${card_id}" not found.`);
    }
    await db.cards.update(card_id, {
        ...updatedCard
    });
    return { status: 200, message: 'Card updated successfully' };
};

const checkOverdueCard = async() => {
    try {
        const now = new Date().toISOString();
        const overdueCards = await db.cards
            .where('status')
            .equals(Status.COOLING_CARD)
            .and(card => card.overdue_at && card.overdue_at <= now)
            .toArray();
        if(overdueCards.length > 0){
            const overdueCountMap = new Map();
            for (const card of overdueCards) {
                await db.cards.update(card.card_id, { status: Status.REVIEW_CARD });
                
                const currentCount = overdueCountMap.get(card.deck_id) || 0;
                overdueCountMap.set(card.deck_id, currentCount + 1);
            }
            
            for (const [deckId, count] of overdueCountMap) {
                await updateDeckWhenOverdue(deckId, count);
            }
            console.log(`${overdueCards.length} card(s) updated to REVIEW_CARD status`);
        }
    } catch (error) {
        console.error('Error checking overdue cards:', error);
    }
}



const getDeck = async (deck_id) => {
    const currentDeck = await db.decks.get(deck_id);
    if (!currentDeck) {
        return null; // Trả về null nếu không tìm thấy deck
    }

    let totalNewCount = currentDeck.new_count || 0;
    let totalLearningCount = currentDeck.learning_count || 0;
    let totalOverdueCount = currentDeck.overdue_count || 0;

    const childDecks = await db.decks
        .where('deck_path')
        .startsWith(`${currentDeck.deck_path}::`)
        .toArray();
    for (const childDeck of childDecks) {
        totalNewCount += childDeck.new_count || 0;
        totalLearningCount += childDeck.learning_count || 0;
        totalOverdueCount += childDeck.overdue_count || 0;
    }
    return {
        ...currentDeck,
        new_count: totalNewCount,
        learning_count: totalLearningCount,
        overdue_count: totalOverdueCount
    };
};


const getAllDecks = async () => {
    return await db.decks.toArray();
};

const getDeckWithType = async (deck_type) => {
    return await db.decks.where('deck_type').equals(deck_type).toArray();
};

export { db, addDeck, updateDeckAfterAddCard, updateDeckAfterLearning, getDeck, deleteDeck, getAllDecks, getDeckWithType, addCard, getCardOfDeck, updateCardById, checkOverdueCard};
