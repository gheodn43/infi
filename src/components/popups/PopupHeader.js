import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
export default function PopupHeader({ title, onClose }) {
    return (
        <div className="modal-header d-flex align-items-center justify-content-between">
            <h4 className="modal-title">{title}</h4>
            <button type="button" className="btn-close text-light ms-auto" onClick={onClose}>
                <FontAwesomeIcon icon={faX} />
            </button>
        </div>
    )
}
