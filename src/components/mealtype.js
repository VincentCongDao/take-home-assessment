import React, { useState, useEffect, useRef } from "react";
import Tag from "./tag";

const MealType = ({
  options,
  value,
  onChange,
  selectedTags,
  addTag,
  removeTag,
}) => {
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    // Check if options is not undefined and value is not null
    if (options && value) {
      const filtered = options.filter((tag) =>
        tag.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions([]);
    }
  }, [value, options]);

  const handleInputChange = (e) => {
    onChange(e.target.value);
    setShowOptions(true);
  };

  const handleOptionClick = (option) => {
    addTag(option);
    onChange("");
    setShowOptions(false);
  };
  const handleInputFocus = () => {
    setShowOptions(true);
  };
  const handleInputBlur = () => {
    setTimeout(() => setShowOptions(false), 100);
  };
  const wrapperRef = useRef(null);
  return (
    <div className="multi-filter-wrapper" ref={wrapperRef}>
      <input
        placeholder="Search By Types"
        type="text"
        value={value}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
      <div className="selected-tags-container">
        {selectedTags.map((tag, index) => (
          <Tag key={index} text={tag} onRemove={removeTag} />
        ))}
      </div>
      {showOptions && (
        <ul className="multi-filter-container">
          {options
            .filter((option) =>
              option.toLowerCase().includes(value.toLowerCase())
            )
            .map((option, index) => (
              <li
                key={index}
                onClick={() => handleOptionClick(option)}
                className="multi-filter"
              >
                {option}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default MealType;
