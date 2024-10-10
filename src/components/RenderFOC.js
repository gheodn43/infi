import { useEffect, useState } from "react";
import { useDeck } from "../providers/PetContext";

export default function RenderFOC({ faceData, face }) {
    const { deck } = useDeck();
    const [FDT, setFDT] = useState(null);
    const [faceLayout, setFaceLayout] = useState(null);
    const [values, setValues] = useState(null);
    const [isFaceLayoutReady, setIsFaceLayoutReady] = useState(false); // Thêm trạng thái để theo dõi khi faceLayout đã sẵn sàng

    useEffect(() => {
        setFDT(faceData);
        if (face === 'front') {
            setFaceLayout(deck?.deck_front_layout || {});
        } else {
            setFaceLayout(deck?.deck_back_layout || {});
        }
    }, [faceData, face, deck]);
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
        <div className="d-flex container text-responsive py-1 rounded-2" style={{flexDirection: flexDirection, alignItems: alignItem, flexWrap: 'wrap', gap: '0.5%', background: '#282828'}}>
            {blocks.length > 0 ? (
                blocks.map((block, index) => (
                    <div className="my-1 bg-black rounded-2" key={index} 
                    style={{
                        textAlign: alignItem,
                        width: window.innerWidth <= 768 ? '100%' : block.width
                    }}>
                        <p className="text-center mb-0 py-2">{values[index]}</p>
                    </div>
                ))
            ) : (
                values.map(item => (
                    <div style={{ width: '100%', textAlign: 'center', padding: '2px' }}>
                       <p>{item}</p>
                    </div>
                ))
            )}

        </div>
    );
}


