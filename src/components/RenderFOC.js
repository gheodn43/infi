import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useDeck } from "../providers/PetContext";

export default function RenderFOC({ faceData, face }) {
    const { deck } = useDeck();
    const [FDT, setFDT] = useState(null);
    const [faceLayout, setFaceLayout] = useState(null);
    const [values, setValues] = useState(null);
    const [isFaceLayoutReady, setIsFaceLayoutReady] = useState(false);

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
        }
    }, [faceLayout, FDT, face]);

    if (!isFaceLayoutReady || !faceLayout.alignment) {
        return;
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
        <div className="container py-1 infi-bg-dark infi-border text-responsive rounded-1 overflow-auto" style={{ flexDirection: flexDirection, alignItems: alignItem, flexWrap: 'wrap', gap: '0.5%'}}>
            {blocks.length > 0 ? (
                blocks.map((block, index) => (
                    values[index] ? (
                        <div
                            className="my-1 infi-bg-dark infi-border rounded-1"
                            key={index}
                            style={{
                                textAlign: alignItem,
                                width: window.innerWidth <= 768 ? '100%' : block.width,
                            }}
                        >
                            {/* <pre className="mb-0 py-2">{values[index]}</pre> */}
                            <SyntaxHighlighter className="my-0 rounded-1 h-100 w-100" language="javascript" style={vscDarkPlus}>
                                {values[index]}
                            </SyntaxHighlighter>
                        </div>
                    ) : null
                ))
            ) : (
                values.map((item, index) => (
                    item ? (
                        <div
                            className="my-1 infi-bg-dark infi-border rounded-1"
                            style={{ width: '100%', textAlign: 'center' }}
                            key={index}
                        >
                            <pre className="mb-0 py-2">{item}</pre>
                        </div>
                    ) : null
                ))
            )}


        </div>
    );
}


