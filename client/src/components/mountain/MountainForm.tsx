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
                <StatesAutocomplete state={form.state} setState={handleStateChange} />
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
                    className={`w-full border rounded px-3 py-2 ${phoneValid ? '' : 'border-red-500'}`}
                />
                {!phoneValid && <span className="text-red-500 text-sm">Invalid phone number</span>}
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