import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { useSnackbarContext } from '../../contexts/SnackbarContext';
import { useMountain } from '../../contexts/MountainContext';
import { useHuts } from '../../hooks/useHuts';
import { STATUS, STATUS_LABELS, enumToOptions } from '../../types/generated-enums';
import type { HutInputPayload } from '../../api/HutAPI';

const STATUS_OPTIONS = enumToOptions(STATUS, STATUS_LABELS);

interface HutFormProps {
	onCreated?: () => void;
}

const getEmptyForm = (): HutInputPayload => ({
	name: '',
	status: STATUS.CLOSED,
	latitude: null,
	longitude: null,
});

const fields = [
	{ label: 'Name', name: 'name', type: 'text', required: true },
	{
		label: 'Status',
		name: 'status',
		type: 'select',
		required: true,
		options: STATUS_OPTIONS,
	},
	{ label: 'Latitude', name: 'latitude', type: 'number', required: false, placeholder: '(optional)', step: 'any' },
	{ label: 'Longitude', name: 'longitude', type: 'number', required: false, placeholder: '(optional)', step: 'any' },
];

const FormField = ({
	field,
	value,
	onChange,
}: {
	field: any;
	value: any;
	onChange: (e: React.ChangeEvent<any>) => void;
}) => {
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
				placeholder={field.placeholder}
				step={field.step}
			/>
		</div>
	);
};

const HutForm: React.FC<HutFormProps> = ({ onCreated }) => {
	const { selectedMountain } = useMountain();
	const { createHut } = useHuts(selectedMountain?.id);
	const [form, setForm] = useState<HutInputPayload>(getEmptyForm);
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
			await createHut(form);
			showSnackbar(`${form.name} hut created successfully`, 'success');
			setForm(getEmptyForm);
			if (onCreated) onCreated();
		} catch (error) {
			showSnackbar('Error creating hut', 'error');
		}
	};

	const fieldRows = [
		[fields[0], fields[1]], // Name, Status
		[fields[2], fields[3]], // Latitude, Longitude
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
							value={form[field.name as keyof HutInputPayload]}
							onChange={handleChange}
						/>
					))}
				</div>
			))}
			<div className="form-button-center">
				<button type="submit" className="button-primary form-button-quarter" disabled={!selectedMountain}>
					Add Hut
				</button>
			</div>
			{!selectedMountain && (
				<div className="text-error text-center mt-2">Please select a mountain to add a hut.</div>
			)}
		</form>
	);
};

export default HutForm;
