import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { mountainApi } from '../../api/MountainAPI';
import { useMountain } from '../../contexts/MountainContext';
import { useSnackbarContext } from '../../contexts/SnackbarContext';
import StateAutocomplete from '../AutoComplete/StatesAutoComplete';

type MountainInput = {
	name: string;
	city: string;
	state: string;
	latitude: number | null;
	longitude: number | null;
	height: number | null;
	phoneNumber?: string;
	address?: string;
	zipcode?: string;
	openingDate?: string;
	closingDate?: string;
};

const MountainForm: React.FC = () => {
	const [form, setForm] = useState<MountainInput>({
		name: '',
		city: '',
		state: '',
		latitude: null,
		longitude: null,
		height: null,
		phoneNumber: '',
		address: '',
		zipcode: '',
		openingDate: '',
		closingDate: '',
	});
	const { fetchMountains } = useMountain();
	const { showSnackbar } = useSnackbarContext();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type } = e.target;
		setForm((prev) => ({
			...prev,
			[name]: type === 'number' ? (value === '' ? null : Number(value)) : value,
		}));
	};

	const handleStateChange = (state: string) => {
		setForm((prev) => ({ ...prev, state }));
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			await mountainApi.createMountain(form);
			setForm({
				name: '',
				city: '',
				state: '',
				latitude: null,
				longitude: null,
				height: null,
				phoneNumber: '',
				address: '',
				zipcode: '',
				openingDate: '',
				closingDate: '',
			});
			await fetchMountains();
			showSnackbar(`${form.name} created successfully`, 'success');
		} catch (error) {
			showSnackbar('Error creating mountain', 'error');
		}
	};

	return (
		<form className="bg-white dark:bg-gray-800 rounded shadow p-6 max-w-md mx-auto" onSubmit={handleSubmit}>
			<div className="mb-4">
				<label className="block mb-1 font-semibold">Name</label>
				<input
					type="text"
					name="name"
					value={form.name}
					onChange={handleChange}
					required
					className="w-full border rounded px-3 py-2"
				/>
			</div>
			<div className="mb-4">
				<label className="block mb-1 font-semibold">Address</label>
				<input
					type="text"
					name="address"
					value={form.address}
					onChange={handleChange}
					className="w-full border rounded px-3 py-2"
				/>
			</div>
			<div className="mb-4">
				<label className="block mb-1 font-semibold">City</label>
				<input
					type="text"
					name="city"
					value={form.city}
					onChange={handleChange}
					required
					className="w-full border rounded px-3 py-2"
				/>
			</div>
			<div className="mb-4">
				<label className="block mb-1 font-semibold">State</label>
				<StateAutocomplete state={form.state} setState={handleStateChange} />
			</div>
			<div className="mb-4">
				<label className="block mb-1 font-semibold">Zipcode</label>
				<input
					type="text"
					name="zipcode"
					value={form.zipcode}
					onChange={handleChange}
					className="w-full border rounded px-3 py-2"
				/>
			</div>
			<div className="mb-4">
				<label className="block mb-1 font-semibold">Height (ft)</label>
				<input
					type="number"
					name="height"
					value={form.height ?? ''}
					onChange={handleChange}
					className="w-full border rounded px-3 py-2"
				/>
			</div>
			<div className="mb-4">
				<label className="block mb-1 font-semibold">Phone Number</label>
				<input
					type="tel"
					name="phoneNumber"
					value={form.phoneNumber}
					onChange={handleChange}
					className="w-full border rounded px-3 py-2"
				/>
			</div>
			<div className="mb-4">
				<label className="block mb-1 font-semibold">Opening Date</label>
				<input
					type="date"
					name="openingDate"
					value={form.openingDate}
					onChange={handleChange}
					className="w-full border rounded px-3 py-2"
				/>
			</div>
			<div className="mb-4">
				<label className="block mb-1 font-semibold">Closing Date</label>
				<input
					type="date"
					name="closingDate"
					value={form.closingDate}
					onChange={handleChange}
					className="w-full border rounded px-3 py-2"
				/>
			</div>
			<div className="mb-4">
				<label className="block mb-1 font-semibold">Latitude</label>
				<input
					type="number"
					name="latitude"
					value={form.latitude ?? ''}
					onChange={handleChange}
					step="any"
					className="w-full border rounded px-3 py-2"
					placeholder="(optional)"
				/>
			</div>
			<div className="mb-4">
				<label className="block mb-1 font-semibold">Longitude</label>
				<input
					type="number"
					name="longitude"
					value={form.longitude ?? ''}
					onChange={handleChange}
					step="any"
					className="w-full border rounded px-3 py-2"
					placeholder="(optional)"
				/>
			</div>

			<button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
				Add Mountain
			</button>
		</form>
	);
};

export default MountainForm;
