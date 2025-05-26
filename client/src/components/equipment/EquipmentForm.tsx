import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { EQUIPMENT_STATUS } from 'shared/types/enums';
import { EQUIPMENT_STATUS_LABELS, enumToOptions } from 'shared/types/utils/enumLabels';
import { useMountain } from '../../contexts/MountainContext';
import { useEquipment } from '../../hooks/useEquipment';
import type { EquipmentInputPayload } from '../../api/EquipmentAPI';
import { useSnackbarContext } from '../../contexts/SnackbarContext'; // <-- Add this import

const EQUIPMENT_STATUS_OPTIONS = enumToOptions(EQUIPMENT_STATUS, EQUIPMENT_STATUS_LABELS);

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
	const { createEquipment } = useEquipment(selectedMountain?.id);
	const [form, setForm] = useState<EquipmentInputPayload>(emptyForm);
	const [loading, setLoading] = useState(false);
	const { showSnackbar } = useSnackbarContext(); // <-- Use the snackbar context

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
		try {
			const payload: EquipmentInputPayload = {
				...form,
				...(selectedMountain?.id ? { mountainId: selectedMountain.id } : {}),
			};
			if (payload.mountainId === '') delete payload.mountainId;
			await createEquipment(payload);
			setForm(emptyForm);
			showSnackbar('Equipment added successfully!', 'success');
			if (onCreated) onCreated();
		} catch (err) {
			showSnackbar('Error adding equipment', 'error');
		} finally {
			setLoading(false);
		}
	};

	return (
		<form className="form-container" onSubmit={handleSubmit}>
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
				<select name="status" value={form.status} onChange={handleChange} className="dropdown">
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
