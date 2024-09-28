import Card from './card';

describe('Card class - calculateDifficulty', () => {
    let card;
    test('should correctly calculate and update difficulty', () => {
        card = new Card('card_1', 'deck_1', 'front', 'back', 3); // Độ khó ban đầu là 3
        
        card.updateDifficulty(card.calculateDifficulty(15))   
        card.updateDifficulty(card.calculateDifficulty(5));
        expect(card.difficulty).toBe(3); 
    });

    test('should correctly update delay times and status for good type', () => {
        card = new Card('card_1', 'deck_1', 'front', 'back');

        card.updateDifficulty(card.calculateDifficulty(15))  
        card.a('easy')

        card.updateDifficulty(card.calculateDifficulty(5))  
        card.a('good');

        card.updateDifficulty(card.calculateDifficulty(2))  //dif = 2
        card.a('easy')

        card.updateDifficulty(card.calculateDifficulty(30))  //7.333 - 9.25 => dif = 3
        card.a('again')

        expect(card.again).toBe('5m'); 
        expect(card.easy).toBe('3d'); 
        expect(card.step).toBe(1);
        expect(card.status).toBe('LEARNING_CARD');
        expect(card.difficulty).toBe(3); 
    });

    test('should correctly update delay times and status for good type', () => {
        card = new Card('card_1', 'deck_1', 'front', 'back');

        card.updateDifficulty(card.calculateDifficulty(15))  
        card.a('easy');

        card.updateDifficulty(card.calculateDifficulty(5))  
        card.a('good');

        card.updateDifficulty(card.calculateDifficulty(2))  //dif = 2
        card.a('easy')

        card.updateDifficulty(card.calculateDifficulty(30))  //7.333 - 9.25 => dif = 3
        card.a('hard')

        expect(card.again).toBe('10m'); 
        expect(card.easy).toBe('20d'); 
        expect(card.step).toBe(2);
        expect(card.status).toBe('COOLING_CARD');
        expect(card.difficulty).toBe(3); 
    });
    
});
