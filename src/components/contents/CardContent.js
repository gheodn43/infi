import { useDeck } from "../../providers/PetContext";
import { useEffect, useState } from "react";
import { getCardOfDeck, updateCardById } from "../../localDB/db";
import {Card} from "../../model/card";
import RenderCard from "../RenderCard";
import { clearHeap, getHeap, selectCardTime, displayNextCard } from "../car.heap";
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from "react-i18next";

export default function CardContent() {
    const { t } = useTranslation();
    const { deck } = useDeck();
    const [currentCard, setCurrentCard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [counter, setCounter] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchCards = async () => {
            setLoading(true);
            const cardList = await getCardOfDeck(deck.deck_id);
            if (cardList && cardList.length > 0) {
                cardList.forEach(card => {
                    const newCard = new Card(
                        card.card_id,
                        card.deck_id,
                        card.front,
                        card.back,
                        card.difficulty,
                        card.delay_value,
                        card.step,
                        card.avg_comp_time,
                        card.status,
                        card.again,
                        card.hard,
                        card.good,
                        card.easy,
                        card.overdue_at,
                        card.created_at
                    );
                    selectCardTime(newCard, 0);
                });
            }
            const { status, card } = displayNextCard();
            if (status === 'success') {
                setCurrentCard(card);
            } else if (status === 'empty') {
                setCurrentCard(null);
            }
            setLoading(false);
        };
    
        if (deck && deck.deck_id) {
            clearHeap();
            fetchCards();
        }
    }, [deck]);
    

    useEffect(() => {
        if(currentCard){
            const handleBeforeUnload = (event) => {
                const confirmationMessage = t('cardContent.exitMessageDefault');
                event.returnValue = confirmationMessage;
                return confirmationMessage;
            };
    
            window.addEventListener('beforeunload', handleBeforeUnload);
    
            return () => {
                window.removeEventListener('beforeunload', handleBeforeUnload);
            };
        }
        return;
    }, [currentCard,t]);

    const handleNextCard = async (isSavedToHeap, al_card, selected_v) => {
        if (isSavedToHeap) {
            selectCardTime(al_card, selected_v);
        }
        const { status, card } = displayNextCard();
        if (status === 'success') {
            setCurrentCard(card);
            setCounter(prev => prev + 1);
        } else if (status === 'empty') {
            setCurrentCard(null);
        }
    };

    const handleExit = async () => {
        if (currentCard) {
            const waitingCardCount = getHeap().length + 1;
            const confirmationMessage = `${waitingCardCount} ${t('cardContent.exitMessage')}`;
            if (window.confirm(confirmationMessage)) {
                updateCardById(currentCard.card_id, currentCard);
                const waitingCards = getHeap();
                if (waitingCards.length > 0) {
                    waitingCards.map(item => updateCardById(item.card.card_id, item.card));
                }
                const newUrl = location.pathname.replace('/study', '');
                navigate(newUrl);
            }
        } else {
            const newUrl = location.pathname.replace('/study', '');
            navigate(newUrl);
        }
    };

    return (
        <div className="my-3">
            <div className='p-2 d-flex justify-content-end fixed-top'>
                <div className='px-2 py-1 infi-bg-gray infi-border rounded-2 cursor-pointer' onClick={handleExit}>
                    {t('cardContent.exitBtn')}
                </div>
            </div>
    
            {loading ? (
                <div className="container py-5 px-5">
                    {/* <h3 className="text-center">{t('cardContent.loading')}</h3> */}
                </div>
            ) : currentCard ? (
                <RenderCard key={counter} card={currentCard} onNextCard={handleNextCard} />
            ) : (
                <div className="container py-5 px-5">
                    <h3 className="text-center">{t('cardContent.congratulations')}</h3>
                </div>
            )}
        </div>
    );
    
}
