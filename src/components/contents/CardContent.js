import { useDeck } from "../../providers/PetContext";
import { useEffect, useState } from "react";
import { getCardOfDeck } from "../../localDB/db";
import Card from "../../model/card";
import RenderCard from "../RenderCard";
import { getHeap, selectCardTime, displayNextCard } from "../car.heap";

export default function CardContent() {
    const { deck } = useDeck();
    const [currentCard, setCurrentCard] = useState(null);

    useEffect(() => {
        const fetchCards = async () => {
            const cardList = await getCardOfDeck(deck.deck_id);
            if (cardList && cardList.length > 0) {
                cardList.forEach(item => {
                    const newCard = new Card(
                        item.card.card_id,
                        item.card.deck_id,
                        item.card.front,
                        item.card.back,
                        item.card.difficulty,
                        item.card.delay_value,
                        item.card.step,
                        item.card.avg_comp_time,
                        item.card.status,
                        item.card.again,
                        item.card.hard,
                        item.card.good,
                        item.card.easy,
                        item.card.overdue_at,
                        item.card.created_at
                    ); 
                    selectCardTime(newCard, 0)
                });
            }
            const { status, card } = displayNextCard();
            if (status === 'success') {
                setCurrentCard(card);
            } else if (status === 'empty') {
                console.log("You are done!");
            } 
        };
        if (deck && deck.deck_id) {
            fetchCards();
        }
    }, [deck]);

    const handleNextCard = async (isSavedToHeap, al_card, selected_v) => {
        if (isSavedToHeap) {
            selectCardTime(al_card, selected_v); 
            console.log('save successfully');
        }
        
        const { status, card } = displayNextCard(); 
        if (status === 'success') {
            setCurrentCard(card);
            console.log('get new card');
        } else if (status === 'empty') {
            console.log("You are done!");
            setCurrentCard(null);
        }
    };
    

    return (
        <div className="my-3">
            {currentCard ? (
                <RenderCard card={currentCard} onNextCard={handleNextCard} />
            ) : (
                <div className="container py-5 px-5">
                    <h3 className="text-center">Congratulations! You have finished this deck for now.</h3>
                </div>
            )}
        </div>
    );
}
