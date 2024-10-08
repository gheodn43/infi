import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignCenter, faAlignRight, faAlignLeft, faArrowRight, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import RenderBlock from "../RenderBlock";
export default function AddCardLayoutSetting({ title, side, blocks, isCustomLayout, onToggleLayout, onBlockSizeClick, onLayoutTypeClick, onAlignmenteClick }) {
    const SMALL_SIZE_BLOCK = '33%';
    const MEDIUM_SIZE_BLOCK = '66%';
    const LARGE_SIZZE_BLOCK = '100%';
    const LAYOUT_HORIZONTALLY = 'horizontally';
    const LAYOUT_VERTICALLY = 'vertically';
    const ALIGN_LEFT = 'left';
    const ALIGN_CENTER = 'center';
    const ALIGN_RIGHT = 'right'

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
                                    onClick={() => onBlockSizeClick({ side: side, size: SMALL_SIZE_BLOCK })}
                                >
                                    <p className="my-auto">Small</p>
                                </div>
                                <div
                                    className="bg-secondary rounded-1 d-flex justify-content-center"
                                    style={{ flexBasis: "30%", cursor: "pointer" }}
                                    onClick={() => onBlockSizeClick({ side: side, size: MEDIUM_SIZE_BLOCK })}
                                >
                                    <p className="my-auto">Medium</p>
                                </div>
                                <div
                                    className="bg-secondary rounded-1 d-flex justify-content-center"
                                    style={{ flexBasis: "50%", cursor: "pointer" }}
                                    onClick={() => onBlockSizeClick({ side: side, size: LARGE_SIZZE_BLOCK })}
                                >
                                    <p className="my-auto">Large</p>
                                </div>
                            </div>
                            <div className="col-xl-4 d-flex flex-row gap-1 justify-content-end">
                                <div ><FontAwesomeIcon icon={faArrowRight}
                                    className={`rounded-1 p-1 cursor-pointer ${blocks.layoutType === LAYOUT_HORIZONTALLY ? "bg-primary" : "bg-secondary"}`}
                                    onClick={() => onLayoutTypeClick({ side: side, layoutType: LAYOUT_HORIZONTALLY })}
                                /></div>
                                <div ><FontAwesomeIcon icon={faArrowDown}
                                    className={`rounded-1 p-1 cursor-pointer ${blocks.layoutType === LAYOUT_VERTICALLY ? "bg-primary" : "bg-secondary"}`}
                                    onClick={() => onLayoutTypeClick({ side: side, layoutType: LAYOUT_VERTICALLY })}
                                /></div>
                                <div className="text-white">|</div>
                                <div ><FontAwesomeIcon icon={faAlignLeft}
                                    className={`rounded-1 p-1 cursor-pointer ${blocks.alignment === ALIGN_LEFT ? "bg-primary" : "bg-secondary"}`}
                                    onClick={() => onAlignmenteClick({ side: side, alignment: ALIGN_LEFT })}
                                /></div>
                                <div ><FontAwesomeIcon icon={faAlignCenter}
                                    className={`rounded-1 p-1 cursor-pointer ${blocks.alignment === ALIGN_CENTER ? "bg-primary" : "bg-secondary"}`}
                                    onClick={() => onAlignmenteClick({ side: side, alignment: ALIGN_CENTER })}
                                /></div>
                                <div ><FontAwesomeIcon icon={faAlignRight}
                                    className={`rounded-1 p-1 cursor-pointer ${blocks.alignment === ALIGN_RIGHT ? "bg-primary" : "bg-secondary"}`}
                                    onClick={() => onAlignmenteClick({ side: side, alignment: ALIGN_RIGHT })}
                                /></div>
                            </div>
                        </div>
                        <div className="p-2">
                            <RenderBlock layoutSetting={blocks} />
                        </div>
                    </div>
                ) : (

                        <p className="my-auto cursor-pointer py-3 px-5 w-100 text-center" onClick={onToggleLayout}>
                            Custom
                        </p>
            
                )}
            </div>
        </div>
    )
}


