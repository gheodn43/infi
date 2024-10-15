import React, { useEffect, useState } from "react";
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
            const getValuesFromLayout = (layout, cardData, properties) => {
                const combinedValues = layout.blocks.map(block => {
                    const cardProperty = cardData.find(item => item.property === block.property);
                    const matchingProperty = properties.find(prop => prop.property_name === block.property);
                    return cardProperty ? {
                        value: cardProperty.value,
                        type: matchingProperty ? matchingProperty.property_type : 'normal',
                        language: matchingProperty ? matchingProperty.language : null
                    } : null;
                });
            
                // Thêm các thuộc tính mặc định từ cardData nếu chúng không có trong layout.blocks
                cardData.forEach(item => {
                    const isInLayout = layout.blocks.some(block => block.property === item.property);
                    if (!isInLayout) {
                        const matchingProperty = properties.find(prop => prop.property_name === item.property);
                        combinedValues.push({
                            value: item.value,
                            type: matchingProperty ? matchingProperty.property_type : 'normal',
                            language: matchingProperty ? matchingProperty.language : null
                        });
                    }
                });
                return combinedValues.filter(item => item !== null);
            };
            
            const values = getValuesFromLayout(faceLayout, FDT, deck.deck_properties || []);
            setValues(values);
            setIsFaceLayoutReady(true);
        }
    }, [faceLayout, FDT, face, deck.properties]);

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
        <div className="container py-1 infi-bg-dark infi-border text-responsive rounded-1 overflow-auto"
            style={{ flexDirection: flexDirection, alignItems: alignItem, flexWrap: 'wrap', gap: '0.5%' }}>
            {blocks.length > 0 ? (
                blocks.map((block, index) => (
                    values[index] && values[index].value ? (
                        <React.Fragment key={index}>
                            {values[index].type === 'code' ? (
                                <div className="position-relative my-1 infi-bg-dark infi-border rounded-1" key={index} style={{ textAlign: 'start', width: window.innerWidth <= 768 ? '100%' : block.width }}>
                                        <div className="position-absolute infi-bg-dark px-3 py-1 fw-bold rounded-1 infi-border" style={{right: 5, top: 5}}>{values[index].language}</div>
                                    <SyntaxHighlighter className="my-0 rounded-1 h-100 w-100 text-sm" language={values[index].language || 'javascript'} style={vscDarkPlus}>
                                        {values[index].value}
                                    </SyntaxHighlighter>
                                </div>
                            ) : (
                                <div className="my-1 infi-bg-dark infi-border rounded-1" key={index} style={{ textAlign: alignItem, width: window.innerWidth <= 768 ? '100%' : block.width }}>
                                    <pre className="mb-0 py-2 px-3" style={{ whiteSpace: 'pre-wrap' }}>{values[index].value}</pre>
                                </div>
                            )}
                        </React.Fragment>
                    ) : null
                ))
            ) : (
                values.map((item, index) => (
                    item && item.value ? (
                        <div className="my-1 infi-bg-dark infi-border rounded-1" style={{ width: '100%', textAlign: 'center' }} key={index} >
                            <pre className="mb-0 py-2 px-3" style={{ whiteSpace: 'pre-wrap' }}>{item.value}</pre>
                        </div>
                    ) : null
                ))
            )}
        </div>
    );
}
