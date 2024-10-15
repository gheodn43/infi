import { useState, useEffect, useRef } from "react";
import { Status } from "../model/card";
import { updateCardById, updateDeckAfterLearning } from "../localDB/db";
import RenderFOC from "./RenderFOC";
import CardLevelBtn from "./buttons/CardLevelBtns";
import CardShowAnswerBtn from "./buttons/CardShowAnswerBtn";

export default function RenderCard({ card, onNextCard }) {
    const [currentCard, setCurrentCard] = useState(null);
    const [time, setTime] = useState(0);
    const [showAnswerBtn, setShowAnswerBtn] = useState(true);
    const [isAnswerShown, setIsAnswerShown] = useState(false);
    const [isFrontVisible, setIsFrontVisible] = useState(true); 
    const timerRef = useRef(null); 
    const cardContainerLgRef = useRef(null);

    useEffect(() => {
        if (card) {
            setCurrentCard(card);
            setShowAnswerBtn(true);
            setIsAnswerShown(false);
            setIsFrontVisible(true);
            startCounter();
        }

        return () => {
            stopCounter();
        };
    }, [card]);

    const startCounter = () => {
        stopCounter();
        setTime(0);
        timerRef.current = setInterval(() => {
            setTime((prevTime) => {
                const newTime = prevTime + 0.01;
                return newTime >= 59.59 ? 59.59 : newTime;
            });
        }, 10);
    };

    const stopCounter = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    const handleStopCounter = () => {
        stopCounter();
        setShowAnswerBtn(false);
        setIsAnswerShown(true);

        setTimeout(() => {
            if (window.innerWidth >= 768 && cardContainerLgRef.current) {
                cardContainerLgRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
            } else {
                setIsFrontVisible(false);
            }
        }, 100);
    };

    const handleToggleFace = () => {
        if (isAnswerShown) {
            setIsFrontVisible(!isFrontVisible);
        }
    };

    if (!currentCard) {
        return null; // Return null instead of nothing
    }

    const frontFace = <div><RenderFOC faceData={currentCard.front} face='front' /></div>;
    const backFace = <div><RenderFOC faceData={currentCard.back} face='back' /></div>;

    const handLevelClick = (level, value) => {
        const timeToComp = time.toFixed(2);
        const newDiff = currentCard.calculateDifficulty(timeToComp);
        currentCard.updateDifficulty(newDiff);
        switch (currentCard.step) {
            case 0:
                if (level === 'again' || level === 'hard' || level === 'good') {
                    if (currentCard.status !== 'LEARNING_CARD'){
                        currentCard.changeStatusToLearning();
                        updateDeckAfterLearning(currentCard.deck_id, Status.NEW_CARD, Status.LEARNING_CARD, 1);
                    }
                    const isSavedToHeap = true;
                    onNextCard(isSavedToHeap, currentCard, parseInt(value.slice(0, -1)));
                } else {
                    if (currentCard.status === Status.LEARNING_CARD) updateDeckAfterLearning(currentCard.deck_id, Status.LEARNING_CARD, Status.COOLING_CARD, 1);
                    else updateDeckAfterLearning(currentCard.deck_id, Status.NEW_CARD, Status.COOLING_CARD, 1);
                    currentCard.a(level);
                    updateCardById(currentCard.card_id, currentCard);
                    const isSavedToHeap = false;
                    onNextCard(isSavedToHeap);
                }
                break;
            case 1:
                if (level === 'again' || level === 'hard') {
                    if (currentCard.status !== 'LEARNING_CARD'){
                        updateDeckAfterLearning(currentCard.deck_id, Status.REVIEW_CARD, Status.LEARNING_CARD, 1);
                        currentCard.changeStatusToLearning();
                    }
                    const isSavedToHeap = true;
                    onNextCard(isSavedToHeap, currentCard, parseInt(value.slice(0, -1)));
                } else {
                    if (currentCard.status === Status.LEARNING_CARD) updateDeckAfterLearning(currentCard.deck_id, Status.LEARNING_CARD, Status.COOLING_CARD, 1);
                    else updateDeckAfterLearning(currentCard.deck_id, Status.REVIEW_CARD, Status.COOLING_CARD, 1);
                    currentCard.a(level);
                    updateCardById(currentCard.card_id, currentCard);
                    const isSavedToHeap = false;
                    onNextCard(isSavedToHeap);
                }
                break;
            case 2:
                if (level === 'again') {
                    currentCard.a(level);
                    if (currentCard.status !== 'LEARNING_CARD'){
                        updateDeckAfterLearning(currentCard.deck_id, Status.REVIEW_CARD, Status.LEARNING_CARD, 1);
                    }
                    const isSavedToHeap = true;
                    onNextCard(isSavedToHeap, currentCard, parseInt(value.slice(0, -1)));
                } else {
                    if (currentCard.status === Status.LEARNING_CARD) updateDeckAfterLearning(currentCard.deck_id, Status.LEARNING_CARD, Status.COOLING_CARD, 1);
                    else updateDeckAfterLearning(currentCard.deck_id, Status.REVIEW_CARD, Status.COOLING_CARD, 1);
                    currentCard.a(level);
                    updateCardById(currentCard.card_id, currentCard);
                    const isSavedToHeap = false;
                    onNextCard(isSavedToHeap);
                }
                break;
            default:
                break;
        }
    }

    return (
        <div className="h-100 container" onClick={handleToggleFace}>
            <div ref={cardContainerLgRef}>
                {window.innerWidth >= 768 ? (
                    <div>
                        {frontFace}
                        {isAnswerShown && (
                            <>
                                <div className="py-4" />
                                {backFace}
                            </>
                        )}
                    </div>
                ) : (
                    <div>
                        {isFrontVisible ? frontFace : backFace}
                    </div>
                )}
            </div>
            {showAnswerBtn ? (
                <CardShowAnswerBtn onStopCounter={handleStopCounter} />
            ) : (
                <CardLevelBtn
                    again={currentCard.again}
                    hard={currentCard.hard}
                    good={currentCard.good}
                    easy={currentCard.easy}
                    onLevelClick={handLevelClick}
                />
            )}
        </div>
    );
}
