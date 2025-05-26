import React, { useCallback, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import type { EmployeeWithRole } from 'shared/types';
import { DEPARTMENT_LABELS } from 'shared/types/utils/enumLabels';
import type { ColDef, GridSizeChangedEvent, FirstDataRenderedEvent } from 'ag-grid-community';

interface EmployeeTableAgGridProps {
	employees: EmployeeWithRole[];
	fetchEmployees: () => Promise<void>;
	isLoading: boolean;
}

const EmployeeTableAgGrid: React.FC<EmployeeTableAgGridProps> = ({ employees, fetchEmployees, isLoading }) => {
	const gridRef = useRef<AgGridReact>(null);

	type EmployeeRow = {
		id: string;
		employeeIdNumber: number;
		firstName: string;
		lastName: string;
		email: string;
		phoneNumber: string;
		roleDepartment?: string;
		roleTitle?: string;
		rolePosition?: string;
		roleLevel?: number;
		rolePermissions?: string[];
	};

	const columnDefs: ColDef<EmployeeRow>[] = [
		{ headerName: 'Employee ID', field: 'employeeIdNumber', minWidth: 100 },
		{ headerName: 'First Name', field: 'firstName', minWidth: 120 },
		{ headerName: 'Last Name', field: 'lastName', minWidth: 120 },
		{ headerName: 'Email', field: 'email', minWidth: 140 },
		{ headerName: 'Phone', field: 'phoneNumber', minWidth: 120 },
		{
			headerName: 'Department',
			field: 'roleDepartment',
			minWidth: 120,
			valueFormatter: (params: { value: keyof typeof DEPARTMENT_LABELS }) =>
				params.value ? DEPARTMENT_LABELS[params.value as keyof typeof DEPARTMENT_LABELS] || params.value : '',
		},
		{ headerName: 'Title', field: 'roleTitle', minWidth: 120 },
		{ headerName: 'Position', field: 'rolePosition', minWidth: 140 },
		{ headerName: 'Level', field: 'roleLevel', minWidth: 80 },
		{
			headerName: 'Permissions',
			field: 'rolePermissions',
			minWidth: 200,
			valueFormatter: (params: any) => (Array.isArray(params.value) ? params.value.join(', ') : ''),
		},
	];

	const rowData = employees
		? employees.map((item) => ({
				id: item.id,
				employeeIdNumber: item.employeeIdNumber,
				firstName: item.firstName,
				lastName: item.lastName,
				email: item.email,
				phoneNumber: item.phoneNumber,
				roleDepartment: item.role?.department,
				roleTitle: item.role?.title,
				rolePosition: item.role?.position,
				roleLevel: item.role?.level,
				rolePermissions: item.role?.permissions,
		  }))
		: [];

	const onFirstDataRendered = useCallback((params: FirstDataRenderedEvent) => {
		params.api.sizeColumnsToFit();
		setTimeout(() => {
			params.api.sizeColumnsToFit();
		}, 100);
	}, []);

	const onGridSizeChanged = useCallback((params: GridSizeChangedEvent) => {
		if (gridRef.current) {
			gridRef.current.api.sizeColumnsToFit();
		}
	}, []);

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'flex-start',
				width: '100%',
				marginTop: 24,
			}}
		>
			<div
				id="ag-employee-table-container"
				className="ag-theme-quartz-dark"
				style={{
					width: '100%',
					minWidth: 300,
                    padding: 24,
				}}
			>
				<AgGridReact
					ref={gridRef}
					columnDefs={columnDefs}
					rowData={rowData}
					domLayout="autoHeight"
					overlayLoadingTemplate={'<span class="ag-overlay-loading-center">Loading employees...</span>'}
					loadingOverlayComponentParams={{ loadingMessage: 'Loading employees...' }}
					loadingOverlayComponent="agLoadingOverlay"
					noRowsOverlayComponent="agNoRowsOverlay"
					noRowsOverlayComponentParams={{ noRowsMessage: 'No employees found.' }}
					loading={isLoading}
					autoSizeStrategy={{
						type: 'fitCellContents',
					}}
					onGridSizeChanged={onGridSizeChanged}
					onFirstDataRendered={onFirstDataRendered}
					suppressHorizontalScroll
					getRowId={(params) => params.data.id}
				/>
			</div>
		</div>
	);
};

export default EmployeeTableAgGrid;