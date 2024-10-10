import { useState, useEffect, useRef } from "react";
import { updateCardById } from "../localDB/db";
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
    const backFaceRef = useRef(null); 

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

        if (window.innerWidth >= 768) {
            if (backFaceRef.current) {
                backFaceRef.current.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            setIsFrontVisible(false);
        }
    };

    const handleToggleFace = () => {
        if (isAnswerShown) {
            setIsFrontVisible(!isFrontVisible);
        }
    };

    if (!currentCard) {
        return <p>Loading card...</p>;
    }

    const frontFace = <div><RenderFOC faceData={currentCard.front} face='front' /></div>;
    const backFace = <div ref={backFaceRef}><RenderFOC faceData={currentCard.back} face='back' /></div>;

    const handLevelClick = (level, value) => {
        const timeToComp = time.toFixed(2);
        const newDiff = currentCard.calculateDifficulty(timeToComp);
        currentCard.updateDifficulty(newDiff);
        switch (currentCard.step) {
            case 0:
                if (level === 'again' || level === 'hard' || level === 'good') {
                    if (currentCard.status !== 'LEARNING_CARD')
                        currentCard.changeStatusToLearning();
                    const isSavedToHeap = true;
                    onNextCard(isSavedToHeap, currentCard, parseInt(value.slice(0, -1)))
                } else {
                    currentCard.a(level);
                    updateCardById(currentCard.card_id, currentCard);
                    const isSavedToHeap = false;
                    onNextCard(isSavedToHeap)
                }
                break;
            case 1:
                if (level === 'again' || level === 'hard') {
                    if (currentCard.status !== 'LEARNING_CARD')
                        currentCard.changeStatusToLearning();
                    const isSavedToHeap = true;
                    onNextCard(isSavedToHeap, currentCard, parseInt(value.slice(0, -1)))
                } else {
                    currentCard.a(level);
                    updateCardById(currentCard.card_id, currentCard);
                    const isSavedToHeap = false;
                    onNextCard(isSavedToHeap)
                }
                break;
            case 2:
                if (level === 'again') {
                    currentCard.a(level);
                    const isSavedToHeap = true;
                    onNextCard(isSavedToHeap, currentCard, parseInt(value.slice(0, -1)))
                } else {
                    currentCard.a(level);
                    updateCardById(currentCard.card_id, currentCard);
                    const isSavedToHeap = false;
                    onNextCard(isSavedToHeap)
                }
                break;
            default:
                break;
        }
    }
    return (
        <div>
            <p>Time: {time.toFixed(2)} seconds</p>
            <div className="h-70" onClick={handleToggleFace}>
                {window.innerWidth >= 768 ? (
                    <div>
                        {frontFace}
                        {isAnswerShown && (
                            <>
                                <hr className="border-t-4 border-white my-4" />
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
