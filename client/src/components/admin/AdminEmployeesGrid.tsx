import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { employeeApi } from '../../api/EmployeeAPI';
// Extend Employee type to include mountainAssignments if not present in shared/types
import type { Employee as BaseEmployee } from 'shared/types';
import type { ColDef } from 'ag-grid-community';

type Employee = BaseEmployee & {
	mountainAssignments?: { mountain?: { name?: string } }[];
	role?: {
		department?: string;
		title?: string;
		position?: string;
	};
};

type RowDataType = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	employeeStatus: string;
	department: string;
	roleTitle: string;
	rolePosition: string;
	mountainNames: string;
};

const AdminEmployeesGrid: React.FC = () => {
	const [employees, setEmployees] = useState<Employee[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		employeeApi.getEmployees().then((data: Employee[]) => {
			setEmployees(data);
			setIsLoading(false);
		});
	}, []);

	const rowData = employees.map((emp) => ({
		id: emp.id,
		firstName: emp.firstName,
		lastName: emp.lastName,
		email: emp.email,
		phoneNumber: emp.phoneNumber,
		employeeStatus: emp.employeeStatus,
		department: emp.role?.department ?? '',
		roleTitle: emp.role?.title ?? '',
		rolePosition: emp.role?.position ?? '',
		mountainNames: emp.mountainAssignments?.map((a) => a.mountain?.name).join(', ') ?? '',
	}));

	const columnDefs: ColDef<RowDataType>[] = [
		{ headerName: 'First Name', field: 'firstName', minWidth: 120, editable: true },
		{ headerName: 'Last Name', field: 'lastName', minWidth: 120, editable: true },
		{ headerName: 'Email', field: 'email', minWidth: 180 },
		{ headerName: 'Phone', field: 'phoneNumber', minWidth: 120 },
		{ headerName: 'Status', field: 'employeeStatus', minWidth: 100 },
		{ headerName: 'Department', field: 'department', minWidth: 120 },
		{ headerName: 'Role', field: 'roleTitle', minWidth: 120 },
		{ headerName: 'Position', field: 'rolePosition', minWidth: 120 },
		{ headerName: 'Mountains', field: 'mountainNames', minWidth: 180 },
	];

	return (
		<div className="ag-theme-quartz-dark" style={{ width: '100%', minHeight: 400 }}>
			<AgGridReact columnDefs={columnDefs} rowData={rowData} domLayout="autoHeight" loading={isLoading} />
		</div>
	);
};

export default AdminEmployeesGrid;