import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { equipmentApi } from '../../api/EquipmentAPI';
import { EQUIPMENT_STATUS } from 'shared/types/enums';
import { useMountain } from '../../contexts/MountainContext';

type EquipmentInputPayload = {
	name: string;
	type: string;
	number?: number;
	description?: string;
	status?: string;
	picture?: string;
	cost?: number;
	latitude?: number | null;
	longitude?: number | null;
	mountainId?: string;
	locationId?: string | null;
};

const formatLabel = (value: string) => {
	const labelMap: Record<string, string> = {
		OPERATIONAL: 'Operational',
		IN_SERVICE: 'In Service',
		OUT_OF_SERVICE: 'Out of Service',
		IN_USE: 'In Use',
		CLEANING: 'Cleaning',
		NEEDS_INSPECTION: 'Needs Inspection',
		PENDING_REPAIR: 'Pending Repair',
		UNDER_MAINTENANCE: 'Under Maintenance',
		LOST: 'Lost',
		DAMAGED: 'Damaged',
		RETIRED: 'Retired',
		STANDBY: 'Standby',
	};
	return labelMap[value] ?? value.charAt(0) + value.slice(1).toLowerCase().replace(/_/g, ' ');
};

const enumToOptions = (e: Record<string, string>) =>
	Object.entries(e).map(([_, value]) => ({
		value,
		label: formatLabel(value),
	}));

const EQUIPMENT_STATUS_OPTIONS = enumToOptions(EQUIPMENT_STATUS);

const emptyForm: EquipmentInputPayload = {
	name: '',
	type: '',
	number: undefined,
	description: '',
	status: EQUIPMENT_STATUS.OPERATIONAL,
	picture: '',
	cost: undefined,
	latitude: null,
	longitude: null,
};

const EquipmentForm: React.FC<{ onCreated?: () => void }> = ({ onCreated }) => {
	const { selectedMountain } = useMountain();
	console.log("🚀 ~ selectedMountain:", selectedMountain)
	const [form, setForm] = useState<EquipmentInputPayload>(emptyForm);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value, type } = e.target;
		setForm((prev) => ({
			...prev,
			[name]:
				type === 'number'
					? value === ''
						? undefined
						: Number(value)
					: name === 'latitude' || name === 'longitude' || name === 'cost' || name === 'number'
					? value === ''
						? null
						: Number(value)
					: value,
		}));
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		setSuccess(null);
		try {
			const payload: EquipmentInputPayload = {
				...form,
				...(selectedMountain?.id ? { mountainId: selectedMountain.id } : {}),
				console.log("🚀 ~ handleSubmit ~ selectedMountain.id:", selectedMountain.id)
				console.log("🚀 ~ handleSubmit ~ selectedMountain:", selectedMountain)
			};
			console.log("🚀 ~ handleSubmit ~ payload:", payload)
			if (payload.mountainId === '') delete payload.mountainId;
			await equipmentApi.createEquipment(payload);
			setForm(emptyForm);
			setSuccess('Equipment added successfully!');
			if (onCreated) onCreated();
		} catch (err) {
			setError('Error adding equipment');
		} finally {
			setLoading(false);
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
				<input
					type="text"
					name="type"
					value={form.type}
					onChange={handleChange}
					className="w-full border rounded px-3 py-2"
				/>
			</div>
			<div className="mb-4">
				<label className="block mb-1 font-semibold">Number</label>
				<input
					type="number"
					name="number"
					value={form.number ?? ''}
					onChange={handleChange}
					className="w-full border rounded px-3 py-2"
					placeholder="(optional)"
				/>
			</div>
			<div className="mb-4">
				<label className="block mb-1 font-semibold">Status</label>
				<select
					name="status"
					value={form.status}
					onChange={handleChange}
					className="w-full border dark:bg-gray-800 rounded px-3 py-2"
				>
					{EQUIPMENT_STATUS_OPTIONS.map((opt) => (
						<option key={opt.value} value={opt.value}>
							{opt.label}
						</option>
					))}
				</select>
			</div>
			<div className="mb-4">
				<label className="block mb-1 font-semibold">Description</label>
				<input
					type="text"
					name="description"
					value={form.description}
					onChange={handleChange}
					className="w-full border rounded px-3 py-2"
					placeholder="(optional)"
				/>
			</div>
			<div className="mb-4">
				<label className="block mb-1 font-semibold">Picture URL</label>
				<input
					type="text"
					name="picture"
					value={form.picture}
					onChange={handleChange}
					className="w-full border rounded px-3 py-2"
					placeholder="(optional)"
				/>
			</div>
			<div className="mb-4">
				<label className="block mb-1 font-semibold">Cost</label>
				<input
					type="number"
					name="cost"
					value={form.cost ?? ''}
					onChange={handleChange}
					className="w-full border rounded px-3 py-2"
					placeholder="(optional)"
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
			{error && <div className="text-red-600 mb-2">{error}</div>}
			{success && <div className="text-green-600 mb-2">{success}</div>}
			<button
				type="submit"
				className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
				disabled={loading}
			>
				{loading ? 'Adding...' : 'Add Equipment'}
			</button>
		</form>
	);
};

export default EquipmentForm;
