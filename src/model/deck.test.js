// deck.test.js
import Deck from "./deck";

describe('Deck Class', () => {
    let deck;

    beforeEach(() => {
        deck = new Deck(1, "deckChild", "deck_parent1::deckparent2");
    });

    test('should create a Deck with initial values', () => {
        expect(deck.deck_id).toBe(1);
        expect(deck.deck_name).toBe("deckChild");
        expect(deck.parent_deck_path).toBe("deck_parent1::deckparent2");
        expect(deck.deck_status).toBe("ACTIVE");
        expect(deck.deck_path).toBe("deck_parent1::deckparent2::deckChild");
        expect(deck.deck_properties).toEqual([]);
        expect(deck.deck_last_update).toBeDefined();
    });

    test('should update deck_name and deck_path correctly', () => {
        deck.setDeckName("newDeckName");
        expect(deck.deck_name).toBe("newDeckName");
        expect(deck.deck_path).toBe("deck_parent1::deckparent2::newDeckName");
        expect(deck.deck_last_update).toBeDefined();
    });

    test('should block the deck and update the status', () => {
        deck.block();
        expect(deck.deck_status).toBe("BLOCKED");
        expect(deck.deck_last_update).toBeDefined();
    });

    test('should activate the deck and update the status', () => {
        deck.block(); // Chặn trước
        deck.active(); // Kích hoạt lại
        expect(deck.deck_status).toBe("ACTIVE");
        expect(deck.deck_last_update).toBeDefined(); // Kiểm tra dấu thời gian đã cập nhật
    });

    test('should add properties correctly', () => {
        deck.addProperty("property1");
        expect(deck.getProperties()).toContain("property1");
        expect(deck.deck_last_update).toBeDefined(); // Kiểm tra dấu thời gian đã cập nhật
    });

    test('should remove properties correctly', () => {
        deck.addProperty("property1");
        deck.removeProperty("property1");
        expect(deck.getProperties()).not.toContain("property1");
        expect(deck.deck_last_update).toBeDefined(); // Kiểm tra dấu thời gian đã cập nhật
    });

    test('should return deck info correctly', () => {
        const info = deck.getInfo();
        expect(info.deck_id).toBe(1);
        expect(info.deck_name).toBe("deckChild");
        expect(info.deck_path).toBe("deck_parent1::deckparent2::deckChild");
        expect(info.deck_properties).toEqual([]);
    });
});
