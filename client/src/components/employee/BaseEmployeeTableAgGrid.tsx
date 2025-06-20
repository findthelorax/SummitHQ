import React, { useMemo, useRef, useState } from 'react';

// AG Grid
import { AgGridReact } from 'ag-grid-react';
import { themeQuartz, colorSchemeDarkBlue } from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';

// Types & Enums
import type { BaseEmployeesTableAgGridProps, EmployeeRow } from '../../utils/AgGrid/tableTypes';
import {
    EMPLOYEE_STATUS_LABELS,
    DEPARTMENT_LABELS,
    ROLE_LEVEL_LABELS,
    getEnumLabel,
} from '../../types/generated-enums';

// Contexts & Hooks
import { useSnackbarContext } from '../../contexts/SnackbarContext';
import { useAgGridAutoSize } from '../../utils/AgGrid/hooks/useAgGridAutoSize';

// Utils & Helpers
import { formatDate } from '../../utils/common/formatData';
import { mapEmployeeToRow } from '../../utils/AgGrid/mapToRow';

// Components
import { PermissionsCellRenderer } from '../../utils/AgGrid/PermissionsCellRenderer';

const myTheme = themeQuartz.withPart(colorSchemeDarkBlue);

const BaseEmployeeTableAgGrid: React.FC<BaseEmployeesTableAgGridProps> = ({
	employees,
	roles,
	mountains,
	fetchEmployees,
	isLoading,
	mountainId,
	mountainName,
}) => {
	const gridRef = useRef<AgGridReact<EmployeeRow>>(null);
	const { onFirstDataRendered, onGridSizeChanged } = useAgGridAutoSize();
	const [pageSize, setPageSize] = useState(25);
	const { showSnackbar } = useSnackbarContext();

	const columnDefs: ColDef<EmployeeRow>[] = useMemo(
		() => [
			{ headerName: 'First Name', field: 'firstName', minWidth: 120 },
			{ headerName: 'Last Name', field: 'lastName', minWidth: 120 },
			{ headerName: 'Email', field: 'email', minWidth: 180 },
			{ headerName: 'Phone', field: 'phoneNumber', minWidth: 130 },
			{
				headerName: 'Status',
				field: 'status',
				minWidth: 100,
				valueFormatter: (params: any) => getEnumLabel(params.value, EMPLOYEE_STATUS_LABELS),
			},
			{
				headerName: 'Primary Department',
				field: 'primaryDepartment',
				minWidth: 150,
				valueFormatter: (params: any) => getEnumLabel(params.value, DEPARTMENT_LABELS),
			},
			{
				headerName: 'Role Department',
				field: 'roleDepartment',
				minWidth: 120,
				valueFormatter: (params: any) => getEnumLabel(params.value, DEPARTMENT_LABELS),
			},
			{ headerName: 'Role Title', field: 'roleTitle', minWidth: 120 },
			{ headerName: 'Role Position', field: 'rolePosition', minWidth: 120 },
			{
				headerName: 'Role Level',
				field: 'roleLevel',
				minWidth: 120,
				valueFormatter: (params: any) => getEnumLabel(params.value, ROLE_LEVEL_LABELS),
			},
			{
				headerName: 'Role Permissions',
				field: 'rolePermissions',
				minWidth: 180,
				cellRenderer: PermissionsCellRenderer,
				autoHeight: true,
			},
			{
				headerName: 'Start Date',
				field: 'startDate',
				minWidth: 120,
				valueFormatter: (params: any) => formatDate(params.value),
			},
			{
				headerName: 'End Date',
				field: 'endDate',
				minWidth: 120,
				valueFormatter: (params: any) => formatDate(params.value),
			},
			{ headerName: 'Certifications', field: 'certifications', minWidth: 180 },
			{ headerName: 'Mountain Name', field: 'assignedMountainName', minWidth: 160 },
			{ headerName: 'Mountain City', field: 'assignedMountainCity', minWidth: 120 },
			{ headerName: 'Mountain State', field: 'assignedMountainState', minWidth: 80 },
		],
		[]
	);

	const rowData = useMemo(() => employees.map(mapEmployeeToRow), [employees, roles]);

	return (
		<div className="ag-grid">
			<div id="ag-table-container">
				<AgGridReact<EmployeeRow>
					ref={gridRef}
					columnDefs={columnDefs}
					defaultColDef={{
						resizable: true,
						sortable: true,
						filter: true,
						flex: 1,
					}}
					rowData={rowData}
					domLayout="autoHeight"
					animateRows={true}
					theme={myTheme}
					overlayLoadingTemplate={'<span class="ag-overlay-loading-center">Loading employees...</span>'}
					loadingOverlayComponentParams={{ loadingMessage: 'Loading employees...' }}
					loadingOverlayComponent="agLoadingOverlay"
					noRowsOverlayComponent="agNoRowsOverlay"
					noRowsOverlayComponentParams={{ noRowsMessage: 'No employees found.' }}
					loading={isLoading}
					pagination={true}
					paginationPageSize={pageSize}
					paginationPageSizeSelector={[25, 50, 100]}
					onGridSizeChanged={onGridSizeChanged}
					onFirstDataRendered={onFirstDataRendered}
					getRowId={(params) => params.data.id?.toString() ?? ''}
				/>
			</div>
		</div>
	);
};

export default BaseEmployeeTableAgGrid;
