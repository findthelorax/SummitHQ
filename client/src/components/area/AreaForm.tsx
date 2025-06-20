import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { useSnackbarContext } from '../../contexts/SnackbarContext';
import { useMountain } from '../../contexts/MountainContext';
import { useAreas } from '../../hooks/useAreas';
import { AREA_TYPE, AREA_TYPE_LABELS, enumToOptions } from '../../types/generated-enums';
import type { AreaInputPayload } from '../../api/AreaAPI';

const AREA_TYPE_OPTIONS = enumToOptions(AREA_TYPE, AREA_TYPE_LABELS);

const getEmptyForm = (): AreaInputPayload => ({
	name: '',
	type: AREA_TYPE.BASE_AREA,
	description: '',
});

const fields = [
	{
		label: 'Name',
		name: 'name',
		type: 'text',
		required: true,
	},
	{
		label: 'Type',
		name: 'type',
		type: 'select',
		required: true,
		options: AREA_TYPE_OPTIONS,
	},
	{
		label: 'Description',
		name: 'description',
		type: 'textarea',
		required: false,
	},
];

const FormField = ({ field, value, onChange }: any) => {
	if (field.type === 'select') {
		return (
			<div className="mb-4 w-full">
				<label className="block mb-1 font-semibold">{field.label}</label>
				<select
					name={field.name}
					value={value}
					onChange={onChange}
					required={field.required}
					className="dropdown"
				>
					{field.options.map((opt: any) => (
						<option key={opt.value} value={opt.value}>
							{opt.label}
						</option>
					))}
				</select>
			</div>
		);
	}
	if (field.type === 'textarea') {
		return (
			<div className="mb-4 w-full">
				<label className="block mb-1 font-semibold">{field.label}</label>
				<textarea name={field.name} value={value ?? ''} onChange={onChange} className="textarea" />
			</div>
		);
	}
	return (
		<div className="mb-4 w-full">
			<label className="block mb-1 font-semibold">{field.label}</label>
			<input
				type={field.type}
				name={field.name}
				value={value ?? ''}
				onChange={onChange}
				required={field.required}
				className="input"
			/>
		</div>
	);
};

interface AreaFormProps {
	onCreated?: () => void;
}

const AreaForm: React.FC<AreaFormProps> = ({ onCreated }) => {
	const { selectedMountain } = useMountain();
	const { createArea } = useAreas(selectedMountain?.id);
	const [form, setForm] = useState<AreaInputPayload>(getEmptyForm());
	const { showSnackbar } = useSnackbarContext();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setForm((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (!selectedMountain) {
			showSnackbar('Please select a mountain first.', 'error');
			return;
		}
		try {
			await createArea(form);
			showSnackbar(`${form.name} area created successfully`, 'success');
			setForm(getEmptyForm());
			if (onCreated) onCreated();
		} catch (error) {
			showSnackbar('Error creating area', 'error');
		}
	};

	const fieldRows = [
		[fields[0], fields[1]], // Name, Difficulty, Status
		[fields[2]], // Condition, Length, Latitude, Longitude
	];

	return (
		<form className="form-container" onSubmit={handleSubmit}>
			{fieldRows.map((row, rowIdx) => (
				<div
					key={rowIdx}
					className="mb-4 grid gap-4"
					style={{ gridTemplateColumns: `repeat(${row.length}, minmax(0, 1fr))` }}
				>
					{row.map((field) => (
						<FormField
							key={field.name}
							field={field}
							value={form[field.name as keyof AreaInputPayload]}
							onChange={handleChange}
						/>
					))}
				</div>
			))}
			<div className="form-button-center">
				<button type="submit" className="button-primary form-button-quarter" disabled={!selectedMountain}>
					Add Area
				</button>
			</div>
			{!selectedMountain && (
				<div className="text-error text-center mt-2">Please select a mountain to add an area.</div>
			)}
		</form>
	);
};

export default AreaForm;
