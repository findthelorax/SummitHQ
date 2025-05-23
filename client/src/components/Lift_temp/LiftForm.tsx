import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { useSnackbarContext } from '../../contexts/SnackbarContext';
import { useMountain } from '../../contexts/MountainContext';
import { useLifts } from '../../hooks/useLifts';
import { LIFT_TYPE, STATUS } from 'shared/types/enums';

const formatLabel = (value: string) => {
	const labelMap: Record<string, string> = {
		CHAIR: 'Chair',
		GONDOLA: 'Gondola',
        SURFACE: 'Surface',
		T_BAR: 'T-Bar',
		ROPE_TOW: 'Rope Tow',
		MAGIC_CARPET: 'Magic Carpet',
		OTHER: 'Other',
		OPEN: 'Open',
		CLOSED: 'Closed',
		ON_HOLD: 'On Hold',
		UNKNOWN: 'Unknown',
	};
	return labelMap[value] ?? value;
};

const enumToOptions = (e: Record<string, string>) =>
	Object.entries(e).map(([_, value]) => ({
		value,
		label: formatLabel(value),
	}));

const LIFT_TYPE_OPTIONS = enumToOptions(LIFT_TYPE);
const STATUS_OPTIONS = enumToOptions(STATUS);

type LiftInput = {
	name: string;
	type: (typeof LIFT_TYPE)[keyof typeof LIFT_TYPE];
	status: (typeof STATUS)[keyof typeof STATUS];
	capacity: number;
	latitude: number | null;
	longitude: number | null;
	locationId: string;
};

interface LiftFormProps {
	onCreated?: () => void;
}


const LiftForm: React.FC<LiftFormProps> = ({ onCreated }) => {
	const { selectedMountain } = useMountain();
	const { createLift } = useLifts(selectedMountain?.id);
	const [form, setForm] = useState<LiftInput>({
		name: '',
		type: LIFT_TYPE.CHAIR,
		status: STATUS.UNKNOWN,
		capacity: 0,
		latitude: null,
		longitude: null,
		locationId: '',
	});
	const { showSnackbar } = useSnackbarContext();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value, type } = e.target;
		setForm((prev) => ({
			...prev,
			[name]: type === 'number' ? (value === '' ? null : Number(value)) : value,
		}));
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (!selectedMountain) {
			showSnackbar('Please select a mountain first.', 'error');
			return;
		}
		try {
			await createLift(form);
			showSnackbar(`${form.name} lift created successfully`, 'success');
			setForm({
				name: '',
				type: LIFT_TYPE.CHAIR,
				status: STATUS.UNKNOWN,
				capacity: 0,
				latitude: null,
				longitude: null,
				locationId: '',
			});
			if (onCreated) onCreated();
		} catch (error) {
			showSnackbar('Error creating lift', 'error');
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
				<label className="block mb-1 font-semibold">Type</label>
				<select
					name="type"
					value={form.type}
					onChange={handleChange}
					required
					className="w-full border rounded px-3 py-2 dark:bg-gray-700"
				>
					{LIFT_TYPE_OPTIONS.map((opt) => (
						<option key={opt.value} value={opt.value}>
							{opt.label}
						</option>
					))}
				</select>
			</div>
			<div className="mb-4">
				<label className="block mb-1 font-semibold">Status</label>
				<select
					name="status"
					value={form.status}
					onChange={handleChange}
					required
					className="w-full border rounded px-3 py-2 dark:bg-gray-700"
				>
					{STATUS_OPTIONS.map((opt) => (
						<option key={opt.value} value={opt.value}>
							{opt.label}
						</option>
					))}
				</select>
			</div>
			<div className="mb-4">
				<label className="block mb-1 font-semibold">Capacity</label>
				<input
					type="number"
					name="capacity"
					value={form.capacity ?? ''}
					onChange={handleChange}
					required
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
			<div className="mb-4">
				<label className="block mb-1 font-semibold">Location ID</label>
				<input
					type="text"
					name="locationId"
					value={form.locationId}
					onChange={handleChange}
					className="w-full border rounded px-3 py-2"
					placeholder="(optional)"
				/>
			</div>
			<button
				type="submit"
				className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
				disabled={!selectedMountain}
			>
				Add Lift
			</button>
			{!selectedMountain && (
				<div className="text-red-500 text-sm mt-2 text-center">Please select a mountain to add a lift.</div>
			)}
		</form>
	);
};

export default LiftForm;
