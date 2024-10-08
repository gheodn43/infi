import { useEffect, useState } from "react";
import { useDeck } from "../providers/PetContext";

export default function RenderFOC({ faceData, face }) {
    const { deck } = useDeck();
    const [FDT, setFDT] = useState(null);
    const [faceLayout, setFaceLayout] = useState(null);

    useEffect(() => {
        setFDT(faceData);
        if (face === 'front') {
            setFaceLayout(deck?.deck_front_layout || {}); // Thêm kiểm tra deck
        } else {
            setFaceLayout(deck?.deck_back_layout || {}); // Thêm kiểm tra deck
        }
    }, [faceData, face, deck]);

    if (!faceLayout || !faceLayout.alignment) {
        // Nếu chưa có faceLayout hoặc faceLayout.alignment thì không render
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
    const blocks = faceLayout.blocks || []; // Thêm kiểm tra blocks

    return (
        <div className="container" style={{ display: 'flex', flexDirection: flexDirection, alignItems: alignItem, flexWrap: 'wrap' }}>
            {blocks.map((block, index) => (
                <div key={index} style={{ width: block.width, textAlign: alignItem, padding: '2px' }}>
                    <div className="bg-secondary rounded-3 px-2">
                        @{block.property}
                    </div>
                </div>
            ))}
        </div>
    );
}
