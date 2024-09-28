import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faChevronDown, faAlignCenter, faAlignRight, faAlignLeft, faArrowRight, faArrowDown } from "@fortawesome/free-solid-svg-icons";

export default function AddCardPopup({ deck, onClose }) {
    const [properties, setProperties] = useState(deck.deck_properties);
    const [isLayoutSettingVisible, setIsLayoutSettingVisible] = useState(false);
    const [isCardContentVisible, setIsCardContentVisible] = useState(true);
    const [isCustomLayoutFront, setIsCustomLayoutFront] = useState(false);
    const [isCustomLayoutBack, setIsCustomLayoutBack] = useState(false);

    const toggleLayoutSettingVisibility = () => {
        setIsLayoutSettingVisible(!isLayoutSettingVisible);
    };
    const toggleCardContentVisibility = () => {
        setIsCardContentVisible(!isCardContentVisible);
    };
    const toggleCustomLayoutBack = () => {
        setIsCustomLayoutBack(!isCustomLayoutBack);
    };
    const toggleCustomLayoutFront = () => {
        setIsCustomLayoutFront(!isCustomLayoutFront);
    };


    return (
        <div className="popup-overlay d-flex justify-content-center align-items-center position-fixed top-0 bottom-0 start-0 end-0 bg-light bg-opacity-10 z-2">
            <div className="modal-content container bg-dark text-light px-4 py-3 rounded h-75 position-relative overflow-hidden">
                <div className="modal-header d-flex align-items-center justify-content-between">
                    <h4 className="modal-title">Add Card to Deck: {deck.deck_name}</h4>
                    <button type="button" className="btn-close text-light ms-auto" onClick={onClose}>
                        <FontAwesomeIcon icon={faX} />
                    </button>
                </div>
                <div className="modal-body overflow-auto mt-3" style={{ maxHeight: 'calc(100% - 60px)' }}>
                    <div className="d-flex flex-column">
                        <div className="mb-4 d-flex flex-row align-items-center gap-2">
                            <p className="mb-0 h5">Layout setting</p>
                            <FontAwesomeIcon
                                icon={faChevronDown}
                                className={isLayoutSettingVisible ? 'rotate-180' : ''}
                                style={{ cursor: 'pointer' }}
                                onClick={toggleLayoutSettingVisibility}
                            />
                        </div>
                        {isLayoutSettingVisible && (
                            <div className="mt-2">
                                <div className="mb-4 position-relative col-lg-6">
                                    <p className="position-absolute label1-cus mb-0">Front</p>
                                    <div className=" input-layout d-flex justify-content-center rounded-3">
                                        {isCustomLayoutFront ? (
                                            <div className="container-fluid">
                                                <div className="text-black row p-2">
                                                    <div className="col-xl-8 d-flex rounded-3 gap-1 mb-1">
                                                        <div className="bg-secondary rounded-1 d-flex justify-content-center" style={{ flexBasis: '20%' }}>
                                                            <p className="my-auto" style={{ cursor: 'pointer' }}>Small</p>
                                                        </div>
                                                        <div className="bg-secondary rounded-1 d-flex justify-content-center" style={{ flexBasis: '30%' }}>
                                                            <p className="my-auto" style={{ cursor: 'pointer' }}>Medium</p>
                                                        </div>
                                                        <div className="bg-secondary rounded-1 d-flex justify-content-center" style={{ flexBasis: '50%' }}>
                                                            <p className="my-auto" style={{ cursor: 'pointer' }}>Large</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-4 d-flex flex-row gap-1 justify-content-end">
                                                        <div ><FontAwesomeIcon icon={faArrowRight} className="rounded-1 bg-secondary p-1" /></div>
                                                        <div ><FontAwesomeIcon icon={faArrowDown} className="rounded-1 bg-secondary p-1" /></div>
                                                        <div className="text-white">|</div>
                                                        <div ><FontAwesomeIcon icon={faAlignLeft} className="rounded-1 bg-secondary p-1" /></div>
                                                        <div ><FontAwesomeIcon icon={faAlignCenter} className="rounded-1 bg-secondary p-1" /></div>
                                                        <div ><FontAwesomeIcon icon={faAlignRight} className="rounded-1 bg-secondary p-1" /></div>
                                                    </div>
                                                </div>
                                                <div className="px-2">blocks are selected will display here</div>
                                            </div>
                                        ) : (
                                            <p className="my-auto" style={{ cursor: 'pointer' }} onClick={toggleCustomLayoutFront}>Custom</p>
                                        )}
                                    </div>
                                </div>
                                <div className="mb-4 position-relative col-lg-6">
                                    <p className="position-absolute label1-cus mb-0">Front</p>
                                    <div className=" input-layout d-flex justify-content-center rounded-3">
                                        {isCustomLayoutBack ? (
                                            <div className="container-fluid">
                                                <div className="text-black row p-2">
                                                    <div className="col-xl-8 d-flex rounded-3 gap-1 mb-1">
                                                        <div className="bg-secondary rounded-1 d-flex justify-content-center" style={{ flexBasis: '20%' }}>
                                                            <p className="my-auto" style={{ cursor: 'pointer' }}>Small</p>
                                                        </div>
                                                        <div className="bg-secondary rounded-1 d-flex justify-content-center" style={{ flexBasis: '30%' }}>
                                                            <p className="my-auto" style={{ cursor: 'pointer' }}>Medium</p>
                                                        </div>
                                                        <div className="bg-secondary rounded-1 d-flex justify-content-center" style={{ flexBasis: '50%' }}>
                                                            <p className="my-auto" style={{ cursor: 'pointer' }}>Large</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-4 d-flex flex-row gap-1 justify-content-end">
                                                        <div ><FontAwesomeIcon icon={faArrowRight} className="rounded-1 bg-secondary p-1" /></div>
                                                        <div ><FontAwesomeIcon icon={faArrowDown} className="rounded-1 bg-secondary p-1" /></div>
                                                        <div className="text-white">|</div>
                                                        <div ><FontAwesomeIcon icon={faAlignLeft} className="rounded-1 bg-secondary p-1" /></div>
                                                        <div ><FontAwesomeIcon icon={faAlignCenter} className="rounded-1 bg-secondary p-1" /></div>
                                                        <div ><FontAwesomeIcon icon={faAlignRight} className="rounded-1 bg-secondary p-1" /></div>
                                                    </div>
                                                </div>
                                                <div className="px-2">blocks are selected will display here</div>
                                            </div>
                                        ) : (
                                            <p className="my-auto" style={{ cursor: 'pointer' }} onClick={toggleCustomLayoutBack}>Custom</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="mb-5 d-flex flex-row align-items-center gap-2">
                        <p className="mb-0 h5">Card's content</p>
                        <FontAwesomeIcon
                            icon={faChevronDown}
                            className={isCardContentVisible ? 'rotate-180' : ''}
                            style={{ cursor: 'pointer' }}
                            onClick={toggleCardContentVisibility}
                        />
                    </div>
                </div>
                <div className="modal-footer bg-dark position-absolute w-100 start-0 bottom-0 d-flex justify-content-end gap-2 py-3 px-4">
                    <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
                        Finish
                    </button>
                </div>
            </div>
        </div>
    );
}
