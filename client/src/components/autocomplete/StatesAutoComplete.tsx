import React, { useState, useRef } from 'react';

const states = [
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
};

const StatesAutocomplete: React.FC<StatesAutocompleteProps> = ({ state, setState }) => {
    const [inputValue, setInputValue] = useState(state || '');
    const [showDropdown, setShowDropdown] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const filteredStates = inputValue
        ? states.filter((s) => s.toLowerCase().startsWith(inputValue.toLowerCase()))
        : states;

    const handleSelect = (selected: string) => {
        setInputValue(selected);
        setState(selected);
        setShowDropdown(false);
    };

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
                placeholder="State"
                className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"
                autoComplete="new-password"
                required
            />
            {showDropdown && filteredStates.length > 0 && (
                <ul className="absolute z-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded w-full max-h-60 overflow-y-auto shadow mt-1">
                    {filteredStates.map((s) => (
                        <li
                            key={s}
                            className={`px-4 py-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-700 ${
                                s === state ? 'font-bold' : ''
                            }`}
                            onMouseDown={() => handleSelect(s)}
                        >
                            {s}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default StatesAutocomplete;