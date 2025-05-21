import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import React, { useState } from 'react';

const states = [
	'Alabama',
	'Alaska',
	'Arizona',
	'Arkansas',
	'California',
	'Colorado',
	'Connecticut',
	'Delaware',
	'Florida',
	'Georgia',
	'Hawaii',
	'Idaho',
	'Illinois',
	'Indiana',
	'Iowa',
	'Kansas',
	'Kentucky',
	'Louisiana',
	'Maine',
	'Maryland',
	'Massachusetts',
	'Michigan',
	'Minnesota',
	'Mississippi',
	'Missouri',
	'Montana',
	'Nebraska',
	'Nevada',
	'New Hampshire',
	'New Jersey',
	'New Mexico',
	'New York',
	'North Carolina',
	'North Dakota',
	'Ohio',
	'Oklahoma',
	'Oregon',
	'Pennsylvania',
	'Rhode Island',
	'South Carolina',
	'South Dakota',
	'Tennessee',
	'Texas',
	'Utah',
	'Vermont',
	'Virginia',
	'Washington',
	'West Virginia',
	'Wisconsin',
	'Wyoming',
];

type StateAutocompleteProps = {
	state: string;
	setState: (state: string) => void;
};

const StateAutocomplete: React.FC<StateAutocompleteProps> = ({ state, setState }) => {
	const [query, setQuery] = useState('');
	const filteredStates = states.filter((s) => s.toLowerCase().includes(query.toLowerCase()));

	return (
		<div>
			<Combobox value={state} onChange={setState}>
				<ComboboxInput
					className="w-full border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"
					onChange={(e) => setQuery(e.target.value)}
					displayValue={(s) => s as string}
					placeholder="State"
					required
				/>
				<ComboboxOptions className="bg-white dark:bg-gray-800 border rounded mt-1 max-h-60 overflow-auto">
					{filteredStates.length === 0 && <div className="px-4 py-2 text-gray-500">No states found</div>}
					{filteredStates.map((s) => (
						<ComboboxOption
							key={s}
							value={s}
							className={({ active }) =>
								`px-4 py-2 cursor-pointer ${active ? 'bg-blue-100 dark:bg-blue-700' : ''}`
							}
						>
							{s}
						</ComboboxOption>
					))}
				</ComboboxOptions>
			</Combobox>
		</div>
	);
};

export default StateAutocomplete;