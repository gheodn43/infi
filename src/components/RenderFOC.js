import { useEffect, useState } from "react";
import { useDeck } from "../providers/PetContext";

export default function RenderFOC({ faceData, face }) {
    const { deck } = useDeck();
    const [FDT, setFDT] = useState(null);
    const [faceLayout, setFaceLayout] = useState(null);
    const [values, setValues] = useState(null);
    const [isFaceLayoutReady, setIsFaceLayoutReady] = useState(false); // Thêm trạng thái để theo dõi khi faceLayout đã sẵn sàng

    // useEffect đầu tiên để thiết lập FDT và faceLayout
    useEffect(() => {
        setFDT(faceData);
        if (face === 'front') {
            setFaceLayout(deck?.deck_front_layout || {});
        } else {
            setFaceLayout(deck?.deck_back_layout || {});
        }
    }, [faceData, face, deck]);

    // useEffect thứ hai để lấy giá trị từ layout khi faceLayout đã sẵn sàng
    useEffect(() => {
        if (faceLayout) {
            const getValuesFromLayout = (layout, cardData) => {
                if (layout.blocks.length === 0) {
                    return cardData.map(item => item.value)
                } else {
                    return layout.blocks.map(block => {
                        const cardProperty = cardData.find(item =>
                            item.property === block.property
                        );
                        return cardProperty ? cardProperty.value : null;
                    });
                }
            }
            const values = getValuesFromLayout(faceLayout, FDT);
            setValues(values);
            setIsFaceLayoutReady(true);
            console.log(values)
        }
    }, [faceLayout, FDT, face]);

    if (!isFaceLayoutReady || !faceLayout.alignment) {
        return <p>Loading layout...</p>;
    }

    let alignItem;
    switch (faceLayout.alignment) {
        case 'left':
            alignItem = 'start';
            break;
        case 'center':
            alignItem = 'center';
            break;
        default:
            alignItem = 'end';
            break;
    }

    const flexDirection = faceLayout.layoutType === 'vertically' ? 'column' : 'row';
    const blocks = faceLayout.blocks || [];

    return (
        <div className="container text-responsive" style={{ display: 'flex', flexDirection: flexDirection, alignItems: alignItem, flexWrap: 'wrap' }}>
            {blocks.length > 0 ? (
                blocks.map((block, index) => (
                    <div key={index} style={{ width: block.width, textAlign: alignItem, padding: '2px' }}>
                        <p>{values[index]}</p>
                    </div>
                ))
            ) : (
                values.map(item => (
                    <div style={{ width: '100%', textAlign: alignItem, padding: '2px' }}>
                       <p>{item}</p>
                    </div>
                ))
            )}

        </div>
    );
}


