import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { useSnackbarContext } from '../../contexts/SnackbarContext';
import { useMountain } from '../../contexts/MountainContext';
import { useLifts } from '../../hooks/useLifts';
import { LIFT_TYPE, STATUS, LIFT_TYPE_LABELS, STATUS_LABELS, enumToOptions } from '../../types/generated-enums';
import type { LiftInputPayload } from '../../api/LiftAPI';

const LIFT_TYPE_OPTIONS = enumToOptions(LIFT_TYPE, LIFT_TYPE_LABELS);
const STATUS_OPTIONS = enumToOptions(STATUS, STATUS_LABELS);

const getEmptyLiftForm = (): LiftInputPayload => ({
	name: '',
	type: LIFT_TYPE.CHAIR,
	status: STATUS.CLOSED,
	capacity: 0,
	latitude: null,
	longitude: null,
});

const fields = [
	{ label: 'Name', name: 'name', type: 'text', required: true },
	{
		label: 'Type',
		name: 'type',
		type: 'select',
		required: true,
		options: LIFT_TYPE_OPTIONS,
	},
	{
		label: 'Status',
		name: 'status',
		type: 'select',
		required: true,
		options: STATUS_OPTIONS,
	},
	{ label: 'Capacity', name: 'capacity', type: 'number', required: true },
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

interface LiftFormProps {
	onCreated?: () => void;
}

const LiftForm: React.FC<LiftFormProps> = ({ onCreated }) => {
	const { selectedMountain } = useMountain();
	const { createLift } = useLifts(selectedMountain?.id);
	const { showSnackbar } = useSnackbarContext();

	const [form, setForm] = useState<LiftInputPayload>(getEmptyLiftForm());
	const [loading, setLoading] = useState(false);

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
		setLoading(true);
		try {
			await createLift(form);
			showSnackbar(`${form.name} lift created successfully`, 'success');
			setForm(getEmptyLiftForm());
			if (onCreated) onCreated();
		} catch (error) {
			showSnackbar('Error creating lift', 'error');
		} finally {
			setLoading(false);
		}
	};

	const fieldRows = [
		[fields[0], fields[1], fields[2]], // Name, Type, Status
		[fields[3], fields[4], fields[5]], // Capacity, Latitude, Longitude
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
							value={form[field.name as keyof LiftInputPayload]}
							onChange={handleChange}
						/>
					))}
				</div>
			))}
			<div className="form-button-center">
				<button type="submit" className="button-primary form-button-quarter" disabled={!selectedMountain}>
					Add Lift
				</button>
			</div>
			{!selectedMountain && (
				<div className="text-error text-center mt-2">Please select a mountain to add a lift.</div>
			)}
		</form>
	);
};

export default LiftForm;