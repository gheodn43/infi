import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignCenter, faAlignRight, faAlignLeft, faArrowRight, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import RenderBlock from "../RenderBlock";
export default function AddCardLayoutSetting({ title, side, blocks, isCustomLayout, onToggleLayout, onBlockSizeClick, onLayoutTypeClick, onAlignmenteClick}) {
    return (
        <div className="mb-4 position-relative flex-grow-1">
            <p className="position-absolute label1-cus mb-0">{title}</p>
            <div className="input-layout d-flex justify-content-center rounded-3">
                {isCustomLayout ? (
                    <div className="container-fluid">
                        <div className="text-black row p-2">
                            <div className="col-xl-8 d-flex rounded-3 gap-1 mb-1">
                                <div
                                    className="bg-secondary rounded-1 d-flex justify-content-center"
                                    style={{ flexBasis: "20%", cursor: "pointer" }}
                                    onClick={() => onBlockSizeClick({ side: side, size: '33%' })}
                                >
                                    <p className="my-auto">Small</p>
                                </div>
                                <div
                                    className="bg-secondary rounded-1 d-flex justify-content-center"
                                    style={{ flexBasis: "30%", cursor: "pointer" }}
                                    onClick={() => onBlockSizeClick({ side: side, size: '66%' })}
                                >
                                    <p className="my-auto">Medium</p>
                                </div>
                                <div
                                    className="bg-secondary rounded-1 d-flex justify-content-center"
                                    style={{ flexBasis: "50%", cursor: "pointer" }}
                                    onClick={() => onBlockSizeClick({ side: side, size: '100%' })}
                                >
                                    <p className="my-auto">Large</p>
                                </div>
                            </div>
                            <div className="col-xl-4 d-flex flex-row gap-1 justify-content-end">
                                <div ><FontAwesomeIcon icon={faArrowRight}
                                    className={`rounded-1 p-1 cursor-pointer ${blocks.layoutType === "horizontally" ? "bg-primary" : "bg-secondary"}`}
                                    onClick={() => onLayoutTypeClick({ side: side, layoutType: 'horizontally' })}
                                /></div>
                                <div ><FontAwesomeIcon icon={faArrowDown}
                                    className={`rounded-1 p-1 cursor-pointer ${blocks.layoutType === "vertically" ? "bg-primary" : "bg-secondary"}`}
                                    onClick={() => onLayoutTypeClick({ side: side, layoutType: 'vertically' })}
                                /></div>
                                <div className="text-white">|</div>
                                <div ><FontAwesomeIcon icon={faAlignLeft}
                                    className={`rounded-1 p-1 cursor-pointer ${blocks.alignment === "left" ? "bg-primary" : "bg-secondary"}`}
                                    onClick={() => onAlignmenteClick({ side: side, alignment: 'left' })}
                                /></div>
                                <div ><FontAwesomeIcon icon={faAlignCenter}
                                    className={`rounded-1 p-1 cursor-pointer ${blocks.alignment === "center" ? "bg-primary" : "bg-secondary"}`}
                                    onClick={() => onAlignmenteClick({ side: side, alignment: 'center' })}
                                /></div>
                                <div ><FontAwesomeIcon icon={faAlignRight}
                                    className={`rounded-1 p-1 cursor-pointer ${blocks.alignment === "right" ? "bg-primary" : "bg-secondary"}`}
                                    onClick={() => onAlignmenteClick({ side: side, alignment: 'right' })}
                                /></div>
                            </div>
                        </div>
                        <div className="p-2">
                            <RenderBlock layoutSetting={blocks} />
                        </div>
                    </div>
                ) : (
                    <p className="my-auto" style={{ cursor: "pointer" }} onClick={onToggleLayout}>
                        Custom
                    </p>
                )}
            </div>
        </div>
    )
}


