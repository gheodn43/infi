import { useDeck } from "../../providers/PetContext";
import { useState, useEffect } from "react";
import { getCardOfDeck } from "../../localDB/db";
import RenderCard from "../RenderCard";

import { getHeap, selectCardTime, displayNextCard } from "../car.heap";

export default function CardContent() {
    const { deck } = useDeck();
    const [cards, setCards] = useState([]);
    const [currentCard, setCurrentCard] = useState(null);
    useEffect(() => {
        async function fetchCards() {
            const cardList = await getCardOfDeck(deck.deck_id);
            setCards(cardList);
        }

        if (deck && deck.deck_id) {
            fetchCards();
        }
    }, [deck]);

    // Xử lý khi người dùng chọn giá trị cho card
    const handleNextCard = (al_card, selected_v) => {
        selectCardTime(al_card, selected_v); // Thêm vào heap với thời gian đã chọn
        // Nếu còn card trong danh sách ban đầu thì lấy card tiếp theo
        if (cards.length > 1) {
            setCards(cards.slice(1)); // Lấy card tiếp theo trong danh sách
        } else {
            // Khi hết danh sách ban đầu, bắt đầu lấy từ heap
            const nextCardFromHeap = displayNextCard();
            if (nextCardFromHeap) {
                setCurrentCard(nextCardFromHeap);
            } else {
                setCurrentCard(null); // Không còn thẻ nào để hiển thị
            }
        }
    };

    // Chọn card hiện tại để hiển thị: ưu tiên card từ danh sách, nếu không thì từ heap
    const cardToRender = cards.length > 0 ? cards[0] : currentCard;

    return (
        <div className="my-3">
            {cardToRender ? (
                <RenderCard card={cardToRender} onNextCard={handleNextCard} />
            ) : (
                <p>No cards available</p>
            )}
        </div>
    );
}
