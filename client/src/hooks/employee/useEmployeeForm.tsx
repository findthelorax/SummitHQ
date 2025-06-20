import { useState } from 'react';
import { EmployeeInputPayload } from '../../api/EmployeeAPI';
import { EMPLOYEE_STATUS } from '../../types/generated-enums';
import { formatPhoneNumber } from '../../utils/common/formatData';

const emptyForm: EmployeeInputPayload = {
	firstName: '',
	lastName: '',
	status: EMPLOYEE_STATUS.ACTIVE,
	roleId: '',
	phoneNumber: '',
	email: '',
};

export function useEmployeeForm() {
	const [form, setForm] = useState<EmployeeInputPayload>(emptyForm);
	const [editingId, setEditingId] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setForm((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleEdit = (item: any) => {
		setEditingId(item.id);
		setSuccess(null);
		setForm({
			firstName: item.firstName || '',
			lastName: item.lastName || '',
			status: item.status || EMPLOYEE_STATUS.ACTIVE,
			roleId: item.roleId || '',
        phoneNumber: item.phoneNumber ? formatPhoneNumber(item.phoneNumber.replace(/^\+1/, '')) : '',
			email: item.email || '',
		});
	};

	const handleCancel = () => {
		setEditingId(null);
		setForm(emptyForm);
		setError(null);
		setSuccess(null);
	};

	return {
		form,
		setForm,
		editingId,
		setEditingId,
		error,
		setError,
		success,
		setSuccess,
		handleChange,
		handleEdit,
		handleCancel,
		emptyForm,
	};
}
