import React, { useState, useEffect } from "react";
import PopupHeader from "./PopupHeader";
import AddCardLayoutSetting from "./AddCardLayoutSetting";
import AddCardInputPropertyPopup from "./AddCardInputPropertyPopup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown} from "@fortawesome/free-solid-svg-icons";

export default function AddCardPopup({ deck, onClose }) {
    const [properties, setProperties] = useState(deck.deck_properties);
    const [isLayoutSettingVisible, setIsLayoutSettingVisible] = useState(false);
    const [isCardContentVisible, setIsCardContentVisible] = useState(true);
    const [isCustomLayoutFront, setIsCustomLayoutFront] = useState(false);
    const [isCustomLayoutBack, setIsCustomLayoutBack] = useState(false);
    const [selectedBlockSize, setSelectedBlockSize] = useState(null);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const layoutDefault = {
        layoutType: "vertically", //vertically horizontally
        alignment: "center", //left center right
        blocks: []
    }
    const [frontBlocks, setFrontBlocks] = useState(layoutDefault);
    const [backBlocks, setBackBlocks] = useState(layoutDefault);

    useEffect(() => {
        if (deck.layout_setting_front !== null) {
            setIsCustomLayoutFront(true);
            setFrontBlocks(deck.layout_setting_front);
        } else {
            setIsCustomLayoutFront(false);
        }

        if (deck.layout_setting_back !== null) {
            setIsCustomLayoutBack(true);
            setBackBlocks(deck.layout_setting_back);
        } else {
            setIsCustomLayoutBack(false);
        }
    }, []);
    const toggleLayoutSettingVisibility = () => {
        setIsLayoutSettingVisible(!isLayoutSettingVisible);
    };
    const toggleCardContentVisibility = () => {
        setIsCardContentVisible(!isCardContentVisible);
    };
    const toggleCustomLayoutBack = () => {
        setBackBlocks(layoutDefault);
        setIsCustomLayoutBack(true);
    };
    const toggleCustomLayoutFront = () => {
        setFrontBlocks(layoutDefault);
        setIsCustomLayoutFront(true);

    };
    const handleBlockSizeClick = (size) => {
        setSelectedBlockSize(size);
        setIsPopupVisible(true);
    };
    const handleChangeLayoutType = (newLayoutType) =>{
        if(newLayoutType.side === "front"){
            setFrontBlocks({ ...frontBlocks, layoutType: newLayoutType.layoutType });
        }else{
            setBackBlocks({ ...backBlocks, layoutType: newLayoutType.layoutType });
        }
    }
    const handleChangAlignment = (newAlignment) =>{
        if(newAlignment.side === "front"){
            setFrontBlocks({ ...frontBlocks, alignment: newAlignment.alignment });
            console.log(frontBlocks)
        }else{
            setBackBlocks({ ...backBlocks, alignment: newAlignment.alignment });
        }
    }
    const handleCloseChildPopup = () => {
        setIsPopupVisible(false);
    }
    const handlePropertySubmit = (newProperty) => {
        if (!newProperty) return;
        let updatedBlocks;
        if(selectedBlockSize.side === "front"){
            updatedBlocks = [...frontBlocks.blocks, { width: selectedBlockSize.size, property: newProperty }];
            setFrontBlocks({ ...frontBlocks, blocks: updatedBlocks });
        }else{
            updatedBlocks = [...backBlocks.blocks, { width: selectedBlockSize.size, property: newProperty }];
            setBackBlocks({ ...backBlocks, blocks: updatedBlocks });
        }
        if (!properties.includes(newProperty)) {
            setProperties([...properties, newProperty]);
        }
        handleCloseChildPopup();
    };

    return (
        <div className="popup-overlay d-flex justify-content-center align-items-center position-fixed top-0 bottom-0 start-0 end-0 bg-light bg-opacity-10 z-2">
            <div className="modal-content container bg-dark text-light px-4 py-3 rounded h-75 position-relative overflow-hidden">
                <PopupHeader title={`Add Card to Deck: ${deck.deck_name}`} onClose={onClose} />
                <div className="modal-body overflow-auto mt-3" style={{ maxHeight: 'calc(100% - 60px)' }}>
                    <div className="d-flex flex-column">
                        <div className="mb-4 d-flex flex-row align-items-center gap-2">
                            <p className="mb-0 h5">Layout setting</p>
                            <FontAwesomeIcon icon={faChevronDown} className={isLayoutSettingVisible ? 'rotate-180' : ''} style={{ cursor: 'pointer' }} onClick={toggleLayoutSettingVisibility}/>
                        </div>
                        {isLayoutSettingVisible && (
                            <div className="mt-2 d-flex flex-column flex-lg-row gap-1">
                                <AddCardLayoutSetting title="Front" side="front" blocks={frontBlocks} isCustomLayout={isCustomLayoutFront} 
                                onToggleLayout={toggleCustomLayoutFront} onBlockSizeClick={handleBlockSizeClick} onLayoutTypeClick={handleChangeLayoutType}  onAlignmenteClick={handleChangAlignment}/>
                                <AddCardLayoutSetting title="Back" side="back" blocks={backBlocks} isCustomLayout={isCustomLayoutBack} 
                                onToggleLayout={toggleCustomLayoutBack} onBlockSizeClick={handleBlockSizeClick} onLayoutTypeClick={handleChangeLayoutType}  onAlignmenteClick={handleChangAlignment}/>
                            </div>
                        )}
                    </div>
                    <div className="mb-5 d-flex flex-row align-items-center gap-2">
                        <p className="mb-0 h5">Card's content</p>
                        <FontAwesomeIcon icon={faChevronDown} className={isCardContentVisible ? 'rotate-180' : ''} style={{ cursor: 'pointer' }} onClick={toggleCardContentVisibility}/>
                    </div>
                    {isPopupVisible && (
                        <AddCardInputPropertyPopup properties={properties} onClose={handleCloseChildPopup} handlePropertySubmit={handlePropertySubmit}/>
                    )}
                </div>
                <div className="modal-footer bg-dark position-absolute w-100 start-0 bottom-0 d-flex justify-content-end gap-2 py-3 px-4">
                    <button type="button" className="btn btn-outline-secondary" onClick={onClose}> Finish </button>
                </div>
            </div>
        </div>
    );
}
