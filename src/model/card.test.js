import Card from './card';

describe('Card class - calculateDifficulty', () => {
    let card;
    test('should correctly update delay times and status for good type', () => {
        card = new Card('card_1', 'deck_1', 'front', 'back');

        card.updateDifficulty(card.calculateDifficulty(4.58))  
        // card.a('easy')

        // card.updateDifficulty(card.calculateDifficulty(5))  
        // card.a('good');

        // card.updateDifficulty(card.calculateDifficulty(2))
        // card.a('easy')

        // card.updateDifficulty(card.calculateDifficulty(30)) 
        // card.a('again')

        // expect(card.again).toBe('5m'); 
        // expect(card.easy).toBe('3d'); 
        // expect(card.step).toBe(1);
        // expect(card.status).toBe('LEARNING_CARD');
        expect(card.difficulty).toBe(3); 
    });

    
});
