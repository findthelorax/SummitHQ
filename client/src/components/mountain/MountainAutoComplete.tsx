import React, { useState, useRef } from 'react';
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
	const [inputValue, setInputValue] = useState(
		selectedValue
			? `${selectedValue.name}${selectedValue.city ? ' - ' + selectedValue.city : ''}${
					selectedValue.state ? ', ' + selectedValue.state : ''
			  }`
			: ''
	);
	const [showDropdown, setShowDropdown] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const getDisplayString = (m: Mountain) =>
		`${m.name}${m.city ? ' - ' + m.city : ''}${m.state ? ', ' + m.state : ''}`;

	const filteredOptions =
		inputValue.trim() === '' || (selectedValue && inputValue === getDisplayString(selectedValue))
			? options
			: options.filter((option) => getDisplayString(option).toLowerCase().includes(inputValue.toLowerCase()));

	const handleSelect = (mountain: Mountain) => {
		setInputValue(
			`${mountain.name}${mountain.city ? ' - ' + mountain.city : ''}${
				mountain.state ? ', ' + mountain.state : ''
			}`
		);
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
				className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
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
				{showDropdown ? <FaChevronUp className="text-blue-600" /> : <FaChevronDown className="text-blue-600" />}
			</button>
			{showDropdown && filteredOptions.length > 0 && (
				<ul className="absolute z-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded w-full max-h-60 overflow-y-auto shadow mt-1">
					{filteredOptions.map((option) => (
						<li
							key={option.id}
							className={`px-4 py-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-700 ${
								selectedValue && option.id === selectedValue.id ? 'font-bold' : ''
							}`}
							onMouseDown={() => handleSelect(option)}
						>
							{`${option.name}${option.city ? ' - ' + option.city : ''}${
								option.state ? ', ' + option.state : ''
							}`}
						</li>
					))}
				</ul>
			)}
			{showDropdown && filteredOptions.length === 0 && (
				<div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border rounded shadow-lg px-4 py-2 text-gray-500">
					No Mountains Available
				</div>
			)}
		</div>
	);
};

export default MountainAutocomplete;
