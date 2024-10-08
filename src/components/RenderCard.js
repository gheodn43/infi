import { useState, useEffect, useRef } from "react";
import RenderFOC from "./RenderFOC";
import CardLevelBtn from "./buttons/CardLevelBtns";
import CardShowAnswerBtn from "./buttons/CardShowAnswerBtn";

export default function RenderCard({ card, onNextCard }) {
    const [cardInfo, setCardInfo] = useState(null);
    const [time, setTime] = useState(0); // Thời gian tính bằng giây
    const [showAnswerBtn, setShowAnswerBtn] = useState(true); // Điều khiển hiển thị
    const [isAnswerShown, setIsAnswerShown] = useState(false); // Xác định đã bấm show đáp án hay chưa
    const [isFrontVisible, setIsFrontVisible] = useState(true); // Trạng thái hiển thị của mặt trước
    const timerRef = useRef(null); // Tham chiếu để lưu interval ID
    const backFaceRef = useRef(null); // Tham chiếu để di chuyển màn hình xuống backFace

    useEffect(() => {
        if (card && card.card) {
            setCardInfo(card.card);
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
            // Màn hình từ md trở lên
            if (backFaceRef.current) {
                backFaceRef.current.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            // Màn hình nhỏ hơn md, switch giữa front và back
            setIsFrontVisible(false);
        }
    };

    const handleToggleFace = () => {
        if (isAnswerShown) {
            setIsFrontVisible(!isFrontVisible);
        }
    };

    if (!cardInfo) {
        return <p>Loading card...</p>;
    }

    const frontFace = <div><RenderFOC faceData={cardInfo.front} face='front' /></div>;
    const backFace = <div ref={backFaceRef}><RenderFOC faceData={cardInfo.back} face='back' /></div>;

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
                    step={cardInfo.step}
                    again={cardInfo.again}
                    hard={cardInfo.hard}
                    good={cardInfo.good}
                    easy={cardInfo.easy}
                />
            )}
        </div>
    );
}
