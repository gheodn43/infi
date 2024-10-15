import { useState } from "react";
import PopupHeader from "./PopupHeader";

export default function AddCardInputPropertyPopup({ properties, onClose, handlePropertySubmit }) {
  const [property, setProperty] = useState('');
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [propertyType, setPropertyType] = useState('normal'); // default type is normal
  const [language, setLanguage] = useState('javascript'); // default language for code

  const handleInputChange = (event) => {
    const value = event.target.value;
    setProperty(value);

    if (value.startsWith('@')) {
      const query = value.slice(1);
      const filtered = properties.filter((prop) => prop.property_name.toLowerCase().startsWith(query.toLowerCase()));
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

  const handlePropertyTypeChange = (event) => {
    setPropertyType(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const submitProperty = () => {
    const cleanedProperty = property.startsWith('@') ? property.slice(1) : property;
    const submission = {
      property_name: cleanedProperty,
      property_type: propertyType,
      language: propertyType === 'code' ? language : null,
    };
    handlePropertySubmit(submission);
  };

  const supportedLanguages = [
    'javascript',
    'typescript',
    'python',
    'java',
    'csharp',
    'cpp',
    'html',
    'css',
    'ruby',
    'php',
    'json',
    'markdown',
    'sql',
    'bash',
  ];

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
            <ul className="position-absolute text-light list-unstyled w-75 rounded d-flex flex-row gap-1" style={{ top: "3rem" }}>
              {filteredProperties.map((suggestion, index) => (
                <li
                  key={index}
                  className="suggestion-item py-1 px-3 rounded-3 bg-secondary"
                  onClick={() => handleSuggestionClick(suggestion.property_name)}
                >
                  {suggestion.property_name}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-5">
            <hr />
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="property_type"
                id="flexRadioDefault2"
                value="normal"
                checked={propertyType === 'normal'}
                onChange={handlePropertyTypeChange}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                <div>
                  <p className="mb-0 fw-semibold">Normal text</p>
                  <p className="text-secondary fw-light mb-0">Regular text (sentences, descriptions).</p>
                </div>
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="property_type"
                id="flexRadioDefault1"
                value="code"
                checked={propertyType === 'code'}
                onChange={handlePropertyTypeChange}
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                <div>
                  <p className="mb-0 fw-semibold">Source code</p>
                  <p className="text-secondary fw-light mb-0">Source code with special programming syntax.</p>
                </div>
              </label>
            </div>
          </div>
          
          {propertyType === 'code' && (
            <div className="px-4 mt-3">
              <select
                id="languageSelect"
                className="form-select bg-dark text-light"
                aria-label="Select code language"
                value={language}
                onChange={handleLanguageChange}
              >
                {supportedLanguages.map((lang, index) => (
                  <option key={index} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
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
