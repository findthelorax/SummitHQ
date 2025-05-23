import React, { useState } from 'react';
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import type { Mountain } from 'shared/types';

type MountainAutocompleteProps = {
    options: Mountain[];
    selectedValue: Mountain | null;
    setSelectedValue: (mountain: Mountain | null) => void;
    label?: string;
	className?: string;
};

const MountainAutocomplete: React.FC<MountainAutocompleteProps> = ({
    options,
    selectedValue,
    setSelectedValue,
    label = 'Select a mountain',
	className = '',
}) => {
    const [query, setQuery] = useState('');

    const filteredOptions =
        query === ''
            ? options
            : options.filter((option) =>
                `${option.name} ${option.city ?? ''} ${option.state ?? ''}`
                    .toLowerCase()
                    .includes(query.toLowerCase())
            );

    return (
        <Combobox
            value={selectedValue}
            onChange={setSelectedValue}
        >
            {({ open }) => (
                <div className={`relative ${className}`}>
                    <ComboboxInput
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                        displayValue={(mountain: Mountain | null) =>
                            mountain
                                ? `${mountain.name}${mountain.city ? ' - ' + mountain.city : ''}${
                                    mountain.state ? ', ' + mountain.state : ''
                                }`
                                : ''
                        }
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={label}
                        required
                    />
                    <ComboboxButton
                        className="absolute inset-y-0 right-2 flex items-center m-1 justify-center"
                        type="button"
                    >
                        {open ? (
                            <FaChevronUp className="text-blue-600" />
                        ) : (
                            <FaChevronDown className="text-blue-600" />
                        )}
                    </ComboboxButton>
                    {filteredOptions.length > 0 && open && (
                        <ComboboxOptions className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border rounded shadow-lg max-h-60 overflow-auto">
                            {filteredOptions.map((option) => (
                                <ComboboxOption
                                    key={option.id}
                                    value={option}
                                    className={({ active }) =>
                                        `px-4 py-2 cursor-pointer ${
                                            active ? 'bg-blue-100 dark:bg-blue-700 text-blue-900 dark:text-white' : ''
                                        }`
                                    }
                                >
                                    {`${option.name}${option.city ? ' - ' + option.city : ''}${
                                        option.state ? ', ' + option.state : ''
                                    }`}
                                </ComboboxOption>
                            ))}
                        </ComboboxOptions>
                    )}
                    {filteredOptions.length === 0 && query !== '' && open && (
                        <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border rounded shadow-lg px-4 py-2 text-gray-500">
                            No {label.toLowerCase()}s available
                        </div>
                    )}
                </div>
            )}
        </Combobox>
    );
};

export default MountainAutocomplete;