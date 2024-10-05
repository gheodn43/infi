import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
export default function PopupHeader({ title, onClose }) {
    return (
        <div className="modal-header d-flex align-items-center justify-content-between">
            <h4 className="modal-title">{title}</h4>
            <div className="text-light ms-auto cursor-pointer" onClick={onClose}>
                <FontAwesomeIcon icon={faX} />
            </div>
        </div>
    )
}
