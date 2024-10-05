import React, { useReducer, useEffect } from "react";
import PopupHeader from "./PopupHeader";
import AddCardLayoutSetting from "./AddCardLayoutSetting";
import AddCardInputPropertyPopup from "./AddCardInputPropertyPopup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

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
        case "UPDATE_USING_PROPERTIES": // Case để cập nhật usingProperties
            return { ...state, usingProperties: action.payload };
        default:
            return state;
    }
}

// Helper function để tạo usingProperties từ frontBlocks và backBlocks
const createUsingProperties = (frontBlocks, backBlocks) => {
    const updatedUsingProperties = [];

    // Xử lý backBlocks
    if (backBlocks && backBlocks.blocks) {
        backBlocks.blocks.forEach((block) => {
            updatedUsingProperties.push({
                property_name: block.property,
                property_value: "",
                used_at: "back",
            });
        });
    }
    if (frontBlocks && frontBlocks.blocks) {
        frontBlocks.blocks.forEach((block) => {
            const existingPropertyIndex = updatedUsingProperties.findIndex(
                (prop) => prop.property_name === block.property
            );

            if (existingPropertyIndex !== -1) {
                updatedUsingProperties[existingPropertyIndex].used_at += ", front";
            } else {
                updatedUsingProperties.push({
                    property_name: block.property,
                    property_value: "", // Giá trị ban đầu là rỗng
                    used_at: "front",
                });
            }
        });
    }

    return updatedUsingProperties;
};

const updateUsingProperties = (property_name, used_at, currentUsingProperties) => {
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
    return currentUsingProperties;
};


export default function AddCardPopup({ deck, onClose }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (deck.layout_setting_front !== null) {
            dispatch({
                type: "SET_CUSTOM_LAYOUT_FRONT",
                payload: true,
                blocks: deck.layout_setting_front,
            });
        }

        if (deck.layout_setting_back !== null) {
            dispatch({
                type: "SET_CUSTOM_LAYOUT_BACK",
                payload: true,
                blocks: deck.layout_setting_back,
            });
        }
        dispatch({ type: "SET_PROPERTIES", payload: deck.deck_properties });
    }, [deck]);

    // Cập nhật usingProperties khi frontBlocks và backBlocks thay đổi
    useEffect(() => {
        const updatedUsingProperties = createUsingProperties(state.frontBlocks, state.backBlocks);
        dispatch({ type: "UPDATE_USING_PROPERTIES", payload: updatedUsingProperties });
    }, [state.frontBlocks, state.backBlocks]);

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
        const updatedProperties = state.usingProperties.map(prop =>
            prop.property_name === propertyName ? { ...prop, property_value: value } : prop
        );
        dispatch({ type: "UPDATE_USING_PROPERTIES", payload: updatedProperties });
    };


    return (
        <div className="popup-overlay d-flex justify-content-center align-items-center position-fixed top-0 bottom-0 start-0 end-0 bg-light bg-opacity-10 z-2">
            <div className="modal-content container bg-dark text-light px-4 py-3 rounded h-md-75 position-relative overflow-hidden">
                <PopupHeader title={`Add Card to Deck: ${deck.deck_name}`} onClose={onClose} />
                <div className="modal-body overflow-auto mt-3 mb-5" style={{ maxHeight: 'calc(100% - 60px)' }}>
                    <div className="d-flex flex-column">
                        <div className="mb-4 d-flex flex-row align-items-center gap-2">
                            <p className="mb-0 h5">Layout & Properties</p>
                            <FontAwesomeIcon
                                icon={faChevronDown}
                                className={`${state.isLayoutSettingVisible ? 'rotate-180' : ''} cursor-pointer`}
                                onClick={() => dispatch({ type: "TOGGLE_LAYOUT_SETTING" })}
                            />
                        </div>
                        {state.isLayoutSettingVisible && (
                            <div className="mt-2 px-1 d-flex flex-column flex-lg-row gap-1">
                                <AddCardLayoutSetting
                                    title="Front"
                                    side="front"
                                    blocks={state.frontBlocks}
                                    isCustomLayout={state.isCustomLayoutFront}
                                    onToggleLayout={() => dispatch({ type: "SET_CUSTOM_LAYOUT_FRONT", payload: true })}
                                    onBlockSizeClick={handleBlockSizeClick}
                                    onLayoutTypeClick={handleChangeLayoutType}
                                    onAlignmenteClick={handleChangAlignment}
                                />
                                <AddCardLayoutSetting
                                    title="Back"
                                    side="back"
                                    blocks={state.backBlocks}
                                    isCustomLayout={state.isCustomLayoutBack}
                                    onToggleLayout={() => dispatch({ type: "SET_CUSTOM_LAYOUT_BACK", payload: true })}
                                    onBlockSizeClick={handleBlockSizeClick}
                                    onLayoutTypeClick={handleChangeLayoutType}
                                    onAlignmenteClick={handleChangAlignment}
                                />
                            </div>
                        )}
                    </div>
                    <div className="d-flex flex-column">
                        <div className="mb-4 d-flex flex-row align-items-center gap-2">
                            <p className="mb-0 h5">Card's content</p>
                            <FontAwesomeIcon
                                icon={faChevronDown}
                                className={`${state.isCardContentVisible ? 'rotate-180' : ''} cursor-pointer`}
                                onClick={() => dispatch({ type: "TOGGLE_CARD_CONTENT" })}
                            />
                        </div>
                        {state.isCardContentVisible && (
                            <div className="px-1">
                                {state.usingProperties.map(usingProperty => (
                                    <div className="position-relative mb-4" key={usingProperty.property_name}>
                                        <label
                                            htmlFor={usingProperty.property_name}
                                            className="position-absolute bg-dark label-cus"
                                        >
                                            {usingProperty.property_name}
                                        </label>
                                        <input
                                            id={usingProperty.property_name}
                                            type="text"
                                            value={usingProperty.property_value}
                                            autoFocus
                                            placeholder={`Enter content for ${usingProperty.property_name}`}
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
                <div className="modal-footer bg-dark position-absolute w-100 start-0 bottom-0 d-flex justify-content-end gap-2 py-3 px-2">
                    <button className="btn btn-light text-dark px-4 rounded-pill" onClick={onClose}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
