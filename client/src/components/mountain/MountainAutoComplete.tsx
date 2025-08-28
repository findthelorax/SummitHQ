import React, { useState, useRef, useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import type { MountainDTO } from '../../types/index';

type MountainAutocompleteProps = {
    options: MountainDTO[];
    selectedValue: MountainDTO | null;
    setSelectedValue: (mountain: MountainDTO | null) => void;
    label?: string;
    className?: string;
};

const getDisplayString = (m: MountainDTO) => m.name;

const MountainAutocomplete: React.FC<MountainAutocompleteProps> = ({
    options,
    selectedValue,
    setSelectedValue,
    label = 'Select a mountain',
    className = '',
}) => {
    const [inputValue, setInputValue] = useState(
        selectedValue ? getDisplayString(selectedValue) : ''
    );
    const [showDropdown, setShowDropdown] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setInputValue(selectedValue ? getDisplayString(selectedValue) : '');
    }, [selectedValue]);

    const filteredOptions =
        inputValue.trim() === '' || (selectedValue && inputValue === getDisplayString(selectedValue))
            ? options
            : options.filter((option) => getDisplayString(option).toLowerCase().includes(inputValue.toLowerCase()));

    const handleSelect = (mountain: MountainDTO) => {
        setInputValue(getDisplayString(mountain));
        setSelectedValue(mountain);
        setShowDropdown(false);
    };

    return (
        <div className={`relative ${className}`}>
            <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value);
                    setShowDropdown(true);
                    setSelectedValue(null);
                }}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 120)}
                placeholder={label}
                className="input"
                autoComplete="off"
                required
            />
            <button
                type="button"
                className="absolute inset-y-0 right-2 flex items-center m-1 justify-center"
                tabIndex={-1}
                onMouseDown={(e) => {
                    e.preventDefault();
                    setShowDropdown((prev) => !prev);
                    inputRef.current?.focus();
                }}
            >
                {showDropdown ? <FaChevronUp style={{ color: 'var(--primary)' }} /> : <FaChevronDown style={{ color: 'var(--primary)' }} />}
            </button>
            {showDropdown && filteredOptions.length > 0 && (
                <ul className="dropdown-list">
                    {filteredOptions.map((option) => (
                        <li
                            key={option.id}
                            className={
                                'dropdown-option' +
                                (selectedValue && option.id === selectedValue.id ? ' selected' : '')
                            }
                            onMouseDown={() => handleSelect(option)}
                        >
                            <div style={{ fontWeight: 500 }}>{option.name}</div>
                            {(option.city || option.state) && (
                                <div
                                    style={{
                                        fontSize: '0.85em',
                                        color: '#888',
                                        marginLeft: 16,
                                        marginTop: 2,
                                    }}
                                >
                                    {[option.city, option.state].filter(Boolean).join(', ')}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
            {showDropdown && filteredOptions.length === 0 && (
                <div className="dropdown-no-options">
                    No Mountains Available
                </div>
            )}
        </div>
    );
};

export default MountainAutocomplete;