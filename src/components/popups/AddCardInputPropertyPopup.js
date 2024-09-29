import { useState } from "react";
import PopupHeader from "./PopupHeader";
import './popup.css'

export default function AddCardInputPropertyPopup({ properties, onClose, handlePropertySubmit }) {
  const [property, setProperty] = useState('');
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setProperty(value);

    if (value.startsWith('@')) {
      const query = value.slice(1);
      const filtered = properties.filter((prop) => prop.toLowerCase().startsWith(query.toLowerCase()));
      setFilteredProperties(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && property) {
      submitProperty();
    }
  };
  const handleSuggestionClick = (suggestion) => {
    setProperty(`@${suggestion}`);
    setShowSuggestions(false);
  };

  const submitProperty = () => {
    const cleanedProperty = property.startsWith('@') ? property.slice(1) : property;
    handlePropertySubmit(cleanedProperty);
  };

  return (
    <div className="popup-overlay d-flex justify-content-center align-items-center position-fixed top-0 bottom-0 start-0 end-0 bg-dark bg-opacity-75 z-1">
      <div className="modal-content container bg-dark text-light px-4 py-3 rounded w-md-50">
        <PopupHeader title={'Set property'} onClose={onClose} />
        <div className="modal-body mx-0 mx-md-3 mx-lg-5 my-4">
          <label htmlFor="propertyInput" className="position-absolute bg-dark label-cus">Property</label>
          <input
            id="propertyInput"
            type="text"
            value={property}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            autoFocus
            placeholder="Enter @property_name"
            className="rounded-3 input-cus w-100"
          />

          {showSuggestions && filteredProperties.length > 0 && (
            <ul className="suggestion-list position-absolute text-light list-unstyled w-75 rounded d-flex flex-row gap-1">
              {filteredProperties.map((suggestion, index) => (
                <li
                  key={index}
                  className="suggestion-item py-1 px-3 rounded-3 bg-secondary"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="modal-footer border-0 gap-2">
          <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-light"
            disabled={!property} 
            onClick={submitProperty}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
