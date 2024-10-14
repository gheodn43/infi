import React, { useReducer, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDeck } from "../../providers/PetContext";
import PopupHeader from "./PopupHeader";
import AddCardLayoutSetting from "./AddCardLayoutSetting";
import AddCardInputPropertyPopup from "./AddCardInputPropertyPopup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { addCard, updateDeckAfterAddCard } from "../../localDB/db";

const initialState = {
    properties: [],
    isLayoutSettingVisible: false,
    isCardContentVisible: true,
    isCustomLayoutFront: false,
    isCustomLayoutBack: false,
    selectedBlockSize: null,
    isPopupVisible: false,
    frontBlocks: null,
    backBlocks: null,
    usingProperties: [],
    quantityAdded: 0,
    messageError: null
};

// Khai báo reducer function
function reducer(state, action) {
    switch (action.type) {
        case "SET_PROPERTIES":
            return { ...state, properties: action.payload };
        case "TOGGLE_LAYOUT_SETTING":
            return { ...state, isLayoutSettingVisible: !state.isLayoutSettingVisible };
        case "TOGGLE_CARD_CONTENT":
            return { ...state, isCardContentVisible: !state.isCardContentVisible };
        case "SET_CUSTOM_LAYOUT_FRONT":
            return { ...state, isCustomLayoutFront: action.payload, frontBlocks: action.blocks };
        case "SET_CUSTOM_LAYOUT_BACK":
            return { ...state, isCustomLayoutBack: action.payload, backBlocks: action.blocks };
        case "SET_SELECTED_BLOCK_SIZE":
            return { ...state, selectedBlockSize: action.payload, isPopupVisible: true };
        case "CLOSE_POPUP":
            return { ...state, isPopupVisible: false };
        case "ADD_PROPERTY":
            return {
                ...state,
                properties: state.properties.includes(action.payload)
                    ? state.properties
                    : [...state.properties, action.payload],
            };
        case "UPDATE_FRONT_BLOCKS":
            return { ...state, frontBlocks: action.payload };
        case "UPDATE_BACK_BLOCKS":
            return { ...state, backBlocks: action.payload };
        case "UPDATE_USING_PROPERTIES":
            return { ...state, usingProperties: action.payload };
        case "INCREASE_QUALITY_ADDED":
            return { ...state, quantityAdded: state.quantityAdded + 1 };
        case "SET_MESSAGE_ERR":
            return { ...state, messageError: action.payload };
        default:
            return state;
    }
}

// Helper function để tạo usingProperties từ frontBlocks và backBlocks
const createUsingProperties = (frontBlocks, backBlocks) => {
    const updatedUsingProperties = [];

    // Duyệt qua frontBlocks trước
    if (frontBlocks && Array.isArray(frontBlocks.blocks)) {

        if (frontBlocks.blocks.length === 0) {
            updatedUsingProperties.push({
                property_name: 'Front',
                property_value: "",
                used_at: "front",
            });
        } else {
            frontBlocks.blocks.forEach((block) => {
                updatedUsingProperties.push({
                    property_name: block.property,
                    property_value: "",
                    used_at: "front",
                });
            });
        }
    }

    // Sau đó duyệt qua backBlocks
    if (backBlocks && Array.isArray(backBlocks.blocks)) {
        if (backBlocks.blocks.length === 0) {
            updatedUsingProperties.push({
                property_name: 'Back',
                property_value: "",
                used_at: "back",
            });
        } else {
            backBlocks.blocks.forEach((block) => {
                const existingPropertyIndex = updatedUsingProperties.findIndex(
                    (prop) => prop.property_name === block.property
                );

                if (existingPropertyIndex !== -1) {
                    updatedUsingProperties[existingPropertyIndex].used_at += ", back";
                } else {
                    updatedUsingProperties.push({
                        property_name: block.property,
                        property_value: "",
                        used_at: "back",
                    });
                }
            });
        }
    }

    return updatedUsingProperties;
};



const updateUsingProperties = (property_name, used_at, currentUsingProperties) => {
    const defaultPropertyIndex = currentUsingProperties.findIndex(
        (prop) => (prop.property_name === 'Front' && used_at === 'front') ||
            (prop.property_name === 'Back' && used_at === 'back')
    );

    if (defaultPropertyIndex !== -1) {
        const existingPropertyIndex = currentUsingProperties.findIndex(
            (prop) => prop.property_name === property_name
        )
        if (existingPropertyIndex !== -1) {
            // nếu tồn tại thì xóa đi thuộc tính mặc định tại defaultPropertyIndex
            const currentUsedAt = currentUsingProperties[existingPropertyIndex].used_at;
            if (!currentUsedAt.includes(used_at)) {
                currentUsingProperties[existingPropertyIndex].used_at += `, ${used_at}`;
            }
        } else {
            currentUsingProperties[defaultPropertyIndex].property_name = property_name;
            const currentUsedAt = currentUsingProperties[defaultPropertyIndex].used_at;
            if (!currentUsedAt.includes(used_at)) {
                currentUsingProperties[defaultPropertyIndex].used_at += `, ${used_at}`;
            }
        }

    } else {
        // Kiểm tra xem thuộc tính mới có tồn tại không và xử lý thêm vào
        const existingPropertyIndex = currentUsingProperties.findIndex(
            (prop) => prop.property_name === property_name
        );

        if (existingPropertyIndex !== -1) {
            const currentUsedAt = currentUsingProperties[existingPropertyIndex].used_at;
            if (!currentUsedAt.includes(used_at)) {
                currentUsingProperties[existingPropertyIndex].used_at += `, ${used_at}`;
            }
        } else {
            currentUsingProperties.push({
                property_name: property_name,
                property_value: "",
                used_at: used_at,
            });
        }
    }
    return currentUsingProperties;
};


export default function AddCardPopup({ deck, onClose }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [messageVisible, setMessageVisible] = useState(false);
    const { updateDeck } = useDeck();
    const { t } = useTranslation();

    useEffect(() => {
        if (deck.layout_setting_front !== null) {
            if (deck.layout_setting_front.blocks.length > 0)
                dispatch({ type: "SET_CUSTOM_LAYOUT_FRONT", payload: true, blocks: deck.layout_setting_front });
            else
                dispatch({ type: "SET_CUSTOM_LAYOUT_FRONT", payload: false, blocks: deck.layout_setting_front });
        }

        if (deck.layout_setting_back !== null) {
            if (deck.layout_setting_back.blocks.length > 0)
                dispatch({ type: "SET_CUSTOM_LAYOUT_BACK", payload: true, blocks: deck.layout_setting_back });
            else
                dispatch({ type: "SET_CUSTOM_LAYOUT_BACK", payload: false, blocks: deck.layout_setting_back });

        }
        dispatch({ type: "SET_PROPERTIES", payload: deck.deck_properties });
        const updatedUsingProperties = createUsingProperties(deck.layout_setting_front, deck.layout_setting_back);
        dispatch({ type: "UPDATE_USING_PROPERTIES", payload: updatedUsingProperties });
    }, [deck]);

    useEffect(() => {
        if (state.messageError) {
            setMessageVisible(true);
            const timer = setTimeout(() => {
                setMessageVisible(false);
                dispatch({ type: "SET_MESSAGE_ERR", payload: "" });
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [state.messageError]);

    const handleBlockSizeClick = (size) => {
        dispatch({ type: "SET_SELECTED_BLOCK_SIZE", payload: size });
    };

    const handleChangeLayoutType = (newLayoutType) => {
        if (newLayoutType.side === "front") {
            dispatch({
                type: "UPDATE_FRONT_BLOCKS",
                payload: { ...state.frontBlocks, layoutType: newLayoutType.layoutType },
            });
        } else {
            dispatch({
                type: "UPDATE_BACK_BLOCKS",
                payload: { ...state.backBlocks, layoutType: newLayoutType.layoutType },
            });
        }
    };

    const handleChangAlignment = (newAlignment) => {
        if (newAlignment.side === "front") {
            dispatch({
                type: "UPDATE_FRONT_BLOCKS",
                payload: { ...state.frontBlocks, alignment: newAlignment.alignment },
            });
        } else {
            dispatch({
                type: "UPDATE_BACK_BLOCKS",
                payload: { ...state.backBlocks, alignment: newAlignment.alignment },
            });
        }
    };

    const handlePropertySubmit = (newProperty) => {
        if (!newProperty) return;
        let updatedBlocks;
        let updatedUsingProperties = [...state.usingProperties];
        if (state.selectedBlockSize.side === "front") {
            updatedBlocks = [...state.frontBlocks.blocks, { width: state.selectedBlockSize.size, property: newProperty }];
            dispatch({ type: "UPDATE_FRONT_BLOCKS", payload: { ...state.frontBlocks, blocks: updatedBlocks } });
            updatedUsingProperties = updateUsingProperties(newProperty, "front", updatedUsingProperties);
        } else {
            updatedBlocks = [...state.backBlocks.blocks, { width: state.selectedBlockSize.size, property: newProperty }];
            dispatch({ type: "UPDATE_BACK_BLOCKS", payload: { ...state.backBlocks, blocks: updatedBlocks } });
            updatedUsingProperties = updateUsingProperties(newProperty, "back", updatedUsingProperties);
        }

        dispatch({ type: "ADD_PROPERTY", payload: newProperty });
        dispatch({ type: "CLOSE_POPUP" });
        dispatch({ type: "UPDATE_USING_PROPERTIES", payload: updatedUsingProperties });
    };

    const handleInputChange = (propertyName, value) => {
        const index = state.usingProperties.findIndex(prop => prop.property_name === propertyName);
        if (index !== -1) {
            const updatedProperties = [...state.usingProperties];
            updatedProperties[index] = { ...updatedProperties[index], property_value: value };
            dispatch({ type: "UPDATE_USING_PROPERTIES", payload: updatedProperties });
        }
    };

    const handleAddCardIntoDeck = async () => {
        const response = await addCard(deck.deck_id, state.usingProperties, t);
        if (response.status === 200) {
            const resetUsingProperties = state.usingProperties.map(prop => ({
                ...prop,
                property_value: ""
            }));
            dispatch({ type: "UPDATE_USING_PROPERTIES", payload: resetUsingProperties });
            dispatch({ type: "INCREASE_QUALITY_ADDED" })
        } else {
            dispatch({ type: "SET_MESSAGE_ERR", payload: response.message })
        }
    }
    const handleFinish = async () => {
        if (state.quantityAdded > 0) {
            await updateDeckAfterAddCard(deck.deck_id, state.properties, state.frontBlocks, state.backBlocks, state.quantityAdded);
            updateDeck({
                deck_front_layout: state.frontBlocks,
                deck_back_layout: state.backBlocks
            });
        }
        onClose();
    }
    return (
        <div className="popup-overlay d-flex justify-content-center align-items-center position-fixed top-0 bottom-0 start-0 end-0 bg-light bg-opacity-10 z-2">
            <div className="modal-content container text-light px-4 py-3 rounded h-sm-75 position-relative overflow-hidden" style={{ backgroundColor: window.innerWidth < 576 ? 'black' : '#212529' }}>
                <PopupHeader title={`${t('addCard.title')} ${deck.deck_name}`} onClose={onClose} />
                <div className="modal-body overflow-auto mt-3 mb-5 cursor-pointer" style={{ maxHeight: 'calc(100% - 60px)' }}>
                    <div className="d-flex flex-column">
                        <div className="mb-4 d-flex flex-row align-items-center gap-2" onClick={() => dispatch({ type: "TOGGLE_LAYOUT_SETTING" })}>
                            <p className="mb-0 text-reponsive fw-bold">{t('addCard.layoutProperty')}</p>
                            <FontAwesomeIcon
                                icon={faChevronDown}
                                className={`${state.isLayoutSettingVisible ? 'rotate-180' : ''} cursor-pointer`}
                            />
                        </div>
                        {state.isLayoutSettingVisible && (
                            <div className="mt-2 px-1 d-flex flex-column flex-lg-row gap-1">
                                <AddCardLayoutSetting
                                    title="Front"
                                    side="front"
                                    blocks={state.frontBlocks}
                                    isCustomLayout={state.isCustomLayoutFront}
                                    onToggleLayout={() => dispatch({ type: "SET_CUSTOM_LAYOUT_FRONT", payload: true, blocks: deck.layout_setting_front })}
                                    onBlockSizeClick={handleBlockSizeClick}
                                    onLayoutTypeClick={handleChangeLayoutType}
                                    onAlignmenteClick={handleChangAlignment}
                                />
                                <AddCardLayoutSetting
                                    title="Back"
                                    side="back"
                                    blocks={state.backBlocks}
                                    isCustomLayout={state.isCustomLayoutBack}
                                    onToggleLayout={() => dispatch({ type: "SET_CUSTOM_LAYOUT_BACK", payload: true, blocks: deck.layout_setting_back })}
                                    onBlockSizeClick={handleBlockSizeClick}
                                    onLayoutTypeClick={handleChangeLayoutType}
                                    onAlignmenteClick={handleChangAlignment}
                                />
                            </div>
                        )}
                    </div>
                    <div className="d-flex flex-column">
                        <div className="mb-4 d-flex flex-row align-items-center gap-2 cursor-pointer" onClick={() => dispatch({ type: "TOGGLE_CARD_CONTENT" })}>
                            <p className="mb-0 text-reponsive fw-bold">{t('addCard.cardContent')}</p>
                            <FontAwesomeIcon
                                icon={faChevronDown}
                                className={`${state.isCardContentVisible ? 'rotate-180' : ''} cursor-pointer`}
                            />
                        </div>
                        {state.isCardContentVisible && (
                            <div className="px-1">
                                {state.usingProperties.map(usingProperty => (
                                    <div className="position-relative mb-4" key={usingProperty.property_name}>
                                        <label
                                            htmlFor={usingProperty.property_name}
                                            className="position-absolute label-cus"
                                            style={{ backgroundColor: window.innerWidth < 576 ? 'black' : '#212529' }}
                                        >
                                            {usingProperty.property_name}
                                            {usingProperty.used_at.includes('front') && usingProperty.used_at.includes('back')
                                                ? ' [F, B]'
                                                : usingProperty.used_at.includes('front')
                                                    ? ' [F]'
                                                    : usingProperty.used_at.includes('back')
                                                        ? ' [B]'
                                                        : ''}
                                        </label>
                                        <textarea
                                            id={usingProperty.property_name}
                                            value={usingProperty.property_value}
                                            placeholder={`${t('addCard.contentPlacehoder')} ${usingProperty.property_name}`}
                                            className="rounded-3 input-cus w-100"
                                            onChange={(e) => handleInputChange(usingProperty.property_name, e.target.value)}
                                        />
                                    </div>
                                ))}
                            </div>

                        )}
                    </div>
                    {state.isPopupVisible && (
                        <AddCardInputPropertyPopup
                            properties={state.properties}
                            onClose={() => dispatch({ type: "CLOSE_POPUP" })}
                            handlePropertySubmit={handlePropertySubmit}
                        />
                    )}
                </div>

                <div className="modal-footer position-absolute w-100 start-0 bottom-0 d-flex justify-content-end gap-2 py-3 px-2"
                    style={{ backgroundColor: window.innerWidth < 576 ? 'black' : '#212529' }}>
                    {messageVisible && (
                        <div className="position-absolute d-flex justify-content-center w-100 py-1 px-3 bg-danger message-error fade-out" style={{ top: '-3rem' }}>

                            <p className="mb-0 text-center">{state.messageError}</p>
                        </div>
                    )}
                    <button type="button" className="btn btn-light fw-normal px-4" onClick={handleFinish}>{t('addCard.finishBtn')}</button>
                    <button type="button" className="btn btn-primary px-5" onClick={handleAddCardIntoDeck}> {t('addCard.addBtn')}</button>
                </div>
            </div>
        </div>
    );
}
