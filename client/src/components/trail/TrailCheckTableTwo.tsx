import React, { useState, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef, ICellEditorParams, CellValueChangedEvent } from 'ag-grid-community';
import { themeQuartz, colorSchemeDarkBlue } from 'ag-grid-community';
import { useTrailChecks } from '../../hooks/checks/useTrailChecks';
import { useEmployees } from '../../hooks/employee/useEmployees'; // You need to implement this hook
import type { EmployeeDTO } from '../../types/index'; // Adjust the path if needed
import { ChecksActionCellRenderer } from '../aggrid/ChecksActionCellRenderer';
import { useSnackbarContext } from '../../contexts/SnackbarContext';
import { DEPARTMENT_LABELS, STATUS, TRAIL_CONDITION } from '../../types/generated-enums';
import { TrailCheckInputPayload } from '../../api/TrailAPI';
import { Autocomplete, TextField } from '@mui/material';
import { TrailCheckRow } from '../../utils/AgGrid/tableTypes'; // Adjust the import path as needed
const myTheme = themeQuartz.withPart(colorSchemeDarkBlue);

const initialNewCheckState: TrailCheckInputPayload = {
	status: STATUS.CLOSED,
	condition: TRAIL_CONDITION.CLOSED,
	hazards: false,
	snowmaking: false,
	notes: '',
	employeeId: '',
};

interface TrailChecksGridProps {
	mountainId: string;
	trailId: string;
}

const EmployeeEditor: React.FC<ICellEditorParams & { employees: any[] }> = ({
	value,
	employees,
	api,
	column,
	node,
}) => {
	const [inputValue, setInputValue] = useState('');
	const [selected, setSelected] = useState(employees.find((e) => e.id === value) || null);

	return (
		<Autocomplete
			options={employees}
			getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
			value={selected}
			onChange={(_, newValue) => {
				setSelected(newValue);
				api.stopEditing();
				node.setDataValue(column.getColId(), newValue?.id || '');
			}}
			inputValue={inputValue}
			onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
			renderInput={(params) => <TextField {...params} autoFocus label="Employee" />}
			sx={{ width: 180 }}
		/>
	);
};

const EnumSelectEditor: React.FC<ICellEditorParams & { options: any }> = ({ value, options, api, column, node }) => (
	<TextField
		select
		value={value}
		onChange={(e) => {
			api.stopEditing();
			node.setDataValue(column.getColId(), e.target.value);
		}}
		autoFocus
		slotProps={{ select: { native: true } }}
		sx={{ width: 140 }}
	>
		{Object.entries(options).map(([key, val]) => (
			<option key={key} value={String(val)}>
				{key.replace(/_/g, ' ')}
			</option>
		))}
	</TextField>
);

export const TrailChecksGrid: React.FC<TrailChecksGridProps> = ({ mountainId, trailId }) => {
	const { showSnackbar } = useSnackbarContext();
	const { trailChecks, createTrailCheck, updateTrailCheck, deleteTrailCheck, setIsLoadingTrailChecks } =
		useTrailChecks(mountainId, trailId);
	const { employees } = useEmployees(mountainId); // Implement this hook to fetch employees

	const [newCheck, setNewCheck] = useState(initialNewCheckState);

	const handleCreate = useCallback(async () => {
		if (!newCheck.employeeId) {
			showSnackbar('Employee is required.', 'error');
			return;
		}
		try {
			await createTrailCheck({ ...newCheck, employeeId: newCheck.employeeId });
			setNewCheck(initialNewCheckState);
			showSnackbar('Check created successfully!', 'success');
		} catch (error) {
			showSnackbar('Failed to create check.', 'error');
		}
	}, [createTrailCheck, newCheck, showSnackbar]);

	const handleDelete = useCallback(
		async (id: string) => {
			if (window.confirm('Are you sure you want to delete this check?')) {
				try {
					await deleteTrailCheck(id);
					showSnackbar('Check deleted.', 'success');
				} catch (error) {
					showSnackbar('Failed to delete check.', 'error');
				}
			}
		},
		[deleteTrailCheck, showSnackbar]
	);

	const handleValueChanged = useCallback(
		async (event: CellValueChangedEvent) => {
			if (event.node.rowPinned) {
				setNewCheck((prev) => ({ ...prev, [event.colDef.field!]: event.newValue }));
				return;
			}
			const { id, ...data } = event.data;
			try {
				await updateTrailCheck(id, data);
				showSnackbar('Check updated successfully!', 'success');
			} catch (error) {
				showSnackbar('Failed to update check.', 'error');
			}
		},
		[updateTrailCheck, showSnackbar]
	);

const columnDefs: ColDef[] = useMemo(
    () => [
        {
            headerName: 'First Name',
            field: 'employeeId',
            minWidth: 180,
            cellEditor: 'employeeEditor',
            cellEditorParams: { employees },
            valueGetter: (p) => {
                const emp = employees.find((e) => e.id === (p.data.employeeId || p.data.employee?.id));
                return emp ? emp.firstName : '';
            },
            editable: (params) => params.node.rowPinned === 'top',
        },
        {
            headerName: 'Last Name',
            field: 'employeeId',
            minWidth: 180,
            cellEditor: 'employeeEditor',
            cellEditorParams: { employees },
            valueGetter: (p) => {
                const emp = employees.find((e) => e.id === (p.data.employeeId || p.data.employee?.id));
                return emp ? emp.lastName : '';
            },
            editable: (params) => params.node.rowPinned === 'top',
        },
        {
            headerName: 'Department',
            valueGetter: (p) => {
                const emp = employees.find((e) => e.id === (p.data.employeeId || p.data.employee?.id));
                return emp?.primaryDepartment;
            },
            valueFormatter: (p) => DEPARTMENT_LABELS[p.value as keyof typeof DEPARTMENT_LABELS] || 'Unknown',
            minWidth: 150,
            editable: false,
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            cellEditor: 'enumStatusEditor',
            cellEditorParams: { options: STATUS },
            editable: (params) => params.node.rowPinned === 'top',
        },
        {
            field: 'condition',
            headerName: 'Condition',
            flex: 1,
            cellEditor: 'enumConditionEditor',
            cellEditorParams: { options: TRAIL_CONDITION },
            editable: (params) => params.node.rowPinned === 'top',
        },
        { field: 'hazards', headerName: 'Hazards', flex: 1, editable: (params) => params.node.rowPinned === 'top' },
        { field: 'snowmaking', headerName: 'Snowmaking', flex: 1, editable: (params) => params.node.rowPinned === 'top' },
        { field: 'notes', headerName: 'Notes', flex: 2, editable: (params) => params.node.rowPinned === 'top' },
        {
            headerName: 'Actions',
            cellRenderer: 'checksActionCellRenderer',
            cellRendererParams: {
                onCreate: handleCreate,
                onDelete: handleDelete,
            },
            flex: 1,
            editable: false,
        },
    ],
    [employees, handleCreate, handleDelete]
);

	const defaultColDef: ColDef = useMemo(
		() => ({
			editable: false,
			resizable: true,
			flex: 1,
		}),
		[]
	);

	const pinnedTopRowData = useMemo(
		() => [
			{
				...newCheck,
				employee: null,
				createdAt: new Date().toISOString(),
				status: STATUS.CLOSED,
			},
		],
		[newCheck]
	);

	return (
		<div className="ag-theme-quartz-dark" style={{ height: 600, width: '100%' }}>
			<AgGridReact
				columnDefs={columnDefs}
				rowData={trailChecks}
				pinnedTopRowData={pinnedTopRowData}
				onCellValueChanged={handleValueChanged}
				theme={myTheme}
				defaultColDef={defaultColDef}
				components={{
					checksActionCellRenderer: ChecksActionCellRenderer as React.FC<any>,
					employeeEditor: (params: ICellEditorParams & { employees: EmployeeDTO[] }) => (
						<EmployeeEditor {...params} employees={employees} />
					),
					enumStatusEditor: (params: ICellEditorParams & { options: typeof STATUS }) => (
						<EnumSelectEditor {...params} options={STATUS} />
					),
					enumConditionEditor: (params: ICellEditorParams & { options: typeof TRAIL_CONDITION }) => (
						<EnumSelectEditor {...params} options={TRAIL_CONDITION} />
					),
				}}
				stopEditingWhenCellsLoseFocus
				getRowId={(params: { data: TrailCheckRow }) => params.data.id || 'new'}
			/>
		</div>
	);
};

export default TrailChecksGrid;
