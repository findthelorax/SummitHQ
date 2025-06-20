import React, { useState, useRef, useEffect, useCallback } from 'react';

export const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
    'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
    'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
    'West Virginia', 'Wisconsin', 'Wyoming',
];

type StatesAutocompleteProps = {
    state: string;
    setState: (state: string) => void;
    placeholder?: string;
};

const DropdownItem: React.FC<{
    value: string;
    isSelected: boolean;
    onSelect: (value: string) => void;
}> = ({ value, isSelected, onSelect }) => (
    <li
        className={`dropdown-option${isSelected ? ' selected' : ''}`}
        onMouseDown={() => onSelect(value)}
    >
        {value}
    </li>
);

const StatesAutocomplete: React.FC<StatesAutocompleteProps> = ({
    state,
    setState,
    placeholder = 'State',
}) => {
    const [inputValue, setInputValue] = useState(state || '');
    const [showDropdown, setShowDropdown] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setInputValue(state || '');
    }, [state]);

    const filteredStates = inputValue
        ? states.filter((s) => s.toLowerCase().startsWith(inputValue.toLowerCase()))
        : states;

    const handleSelect = useCallback(
        (selected: string) => {
            setInputValue(selected);
            setState(selected);
            setShowDropdown(false);
        },
        [setState]
    );

    return (
        <div className="relative">
            <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value);
                    setShowDropdown(true);
                    setState('');
                }}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 120)}
                onKeyDown={(e) => {
                    if (
                        e.key === 'Tab' &&
                        showDropdown &&
                        filteredStates.length > 0 &&
                        inputValue.toLowerCase() !== filteredStates[0].toLowerCase()
                    ) {
                        e.preventDefault();
                        handleSelect(filteredStates[0]);
                    }
                }}
                placeholder={placeholder}
                className="input"
                autoComplete="new-password"
                required
            />
            {showDropdown && filteredStates.length > 0 && (
                <ul className="dropdown-list">
                    {filteredStates.map((s) => (
                        <DropdownItem
                            key={s}
                            value={s}
                            isSelected={s === state}
                            onSelect={handleSelect}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default StatesAutocomplete;