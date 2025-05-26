import React, { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { mountainApi, MountainInputPayload } from '../../api/MountainAPI';
import StatesAutocomplete from '../autocomplete/StatesAutoComplete';
import { useMountain } from '../../contexts/MountainContext';

type MountainFormProps = {
    initial?: MountainInputPayload;
    editingId?: string | null;
    onSuccess?: () => void;
    onCancel?: () => void;
};

const emptyForm: MountainInputPayload = {
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
};

const fieldConfigs = [
    { label: 'Name', name: 'name', type: 'text', required: true },
    { label: 'Address', name: 'address', type: 'text', required: false },
    { label: 'City', name: 'city', type: 'text', required: true },
    { label: 'Zipcode', name: 'zipcode', type: 'text', required: false },
    { label: 'Height (ft)', name: 'height', type: 'number', required: false },
    { label: 'Phone Number', name: 'phoneNumber', type: 'tel', required: false },
    { label: 'Opening Date', name: 'openingDate', type: 'date', required: false },
    { label: 'Closing Date', name: 'closingDate', type: 'date', required: false },
    { label: 'Latitude', name: 'latitude', type: 'number', required: false, step: 'any', placeholder: '(optional)' },
    { label: 'Longitude', name: 'longitude', type: 'number', required: false, step: 'any', placeholder: '(optional)' },
];

const FormField = ({
    field,
    value,
    onChange,
    phoneValid,
}: {
    field: any;
    value: any;
    onChange: (e: React.ChangeEvent<any>) => void;
    phoneValid?: boolean;
}) => {
    if (field.name === 'state') {
        return null;
    }
    if (field.name === 'phoneNumber') {
        return (
            <div className="mb-4">
                <label className="block mb-1 font-semibold">{field.label}</label>
                <input
                    type={field.type}
                    name={field.name}
                    value={value}
                    onChange={onChange}
                    className={`w-full border rounded px-3 py-2 ${phoneValid ? '' : 'border-red-500'}`}
                />
                {!phoneValid && <span className="text-red-500 text-sm">Invalid phone number</span>}
            </div>
        );
    }
    return (
        <div className="mb-4">
            <label className="block mb-1 font-semibold">{field.label}</label>
            <input
                type={field.type}
                name={field.name}
                value={value ?? ''}
                onChange={onChange}
                required={field.required}
                className="w-full border rounded px-3 py-2"
                placeholder={field.placeholder}
                step={field.step}
            />
        </div>
    );
};

const MountainForm: React.FC<MountainFormProps> = ({
    initial,
    editingId,
    onSuccess,
    onCancel,
}) => {
    const [form, setForm] = useState<MountainInputPayload>(initial || emptyForm);
    const [phoneValid, setPhoneValid] = useState(true);
    const { fetchMountains } = useMountain();

    useEffect(() => {
        if (initial) setForm(initial);
        else setForm(emptyForm);
    }, [initial, editingId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === 'number' ? (value === '' ? null : Number(value)) : value,
        }));
        if (name === 'phoneNumber') {
            if (!value) {
                setPhoneValid(true);
            } else {
                const phoneObj = parsePhoneNumberFromString(value, 'US');
                setPhoneValid(!!phoneObj && phoneObj.isValid());
            }
        }
    };

    const handleStateChange = (state: string) => {
        setForm((prev) => ({ ...prev, state }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        let submitForm = { ...form };
        if (submitForm.phoneNumber) {
            const phoneObj = parsePhoneNumberFromString(submitForm.phoneNumber, 'US');
            if (!phoneObj || !phoneObj.isValid()) {
                alert('Please enter a valid phone number');
                return;
            }
            submitForm.phoneNumber = phoneObj.format('E.164');
        }
        try {
            if (editingId) {
                await mountainApi.updateMountain(editingId, submitForm);
            } else {
                await mountainApi.createMountain(submitForm);
                await fetchMountains();
            }
            setForm(emptyForm);
            if (onSuccess) onSuccess();
        } catch (error) {
            alert('Error saving mountain');
        }
    };

    return (
        <form className="bg-white dark:bg-gray-800 rounded shadow p-6 max-w-md mx-auto" onSubmit={handleSubmit}>
            {fieldConfigs.map((field) =>
                field.name === 'state' ? (
                    <div className="mb-4" key="state">
                        <label className="block mb-1 font-semibold">State</label>
                        <StatesAutocomplete state={form.state} setState={handleStateChange} />
                    </div>
                ) : (
                    <FormField
                        key={field.name}
                        field={field}
                        value={form[field.name as keyof MountainInputPayload]}
                        onChange={handleChange}
                        phoneValid={field.name === 'phoneNumber' ? phoneValid : undefined}
                    />
                )
            )}
            <div className="flex gap-2">
                <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    {editingId ? 'Update Mountain' : 'Add Mountain'}
                </button>
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 bg-gray-400 text-white py-2 rounded hover:bg-gray-500 transition"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default MountainForm;