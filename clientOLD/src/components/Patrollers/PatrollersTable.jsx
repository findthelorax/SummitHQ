import React, { useState, useCallback, useContext, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { MountainContext } from '../../contexts/MountainContext';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import AddButton from '../Buttons/AddButton';
import EditDeleteButton from '../Buttons/EditDeleteButton';
import { placeholderFormatter } from '../../helpers/placeholderFormatter';

const PatrollersTable = ({ gridApiRef, quickFilterText }) => {
	const { patrollers, fetchPatrollers, handleCreatePatroller, handleUpdatePatroller, handleDeletePatroller } =
		useContext(MountainContext);
	const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(SnackbarContext);
	const [inputRow, setInputRow] = useState({ firstName: '', lastName: '', position: '', action: '' });

	const handleSubmit = async (event) => {
		event.preventDefault();
		const { firstName, lastName, position } = inputRow;
		const patroller = { firstName, lastName, position };
		try {
			await handleCreatePatroller(patroller);
			fetchPatrollers();
			setSnackbarSeverity('success');
			setSnackbarMessage(`${firstName} ${lastName} created successfully`);
			setOpenSnackbar(true);
		} catch (error) {
			console.error('Error creating patroller', error);
			setOpenSnackbar(true);
			setSnackbarMessage(`Error creating ${firstName} ${lastName}`);
		}
	};

	const onEditDeleteButtonClick = useCallback(
		(actionType, params) => {
			const selectedData = params.data;
			if (actionType === 'edit') {
				// You need to get the updated data from somewhere
				const updatedData = { ...selectedData /* ...updated fields... */ };
				handleUpdatePatroller(selectedData._id, updatedData);
			} else if (actionType === 'delete') {
				handleDeletePatroller(selectedData._id);
			}
		},
		[handleUpdatePatroller, handleDeletePatroller]
	);

	const columnDefs = [
		{
			headerName: 'First Name',
			field: 'firstName',
			valueFormatter: placeholderFormatter,
		},
		{
			headerName: 'Last Name',
			field: 'lastName',
			valueFormatter: placeholderFormatter,
		},
		{
			headerName: 'Position',
			field: 'position',
			valueFormatter: placeholderFormatter,
		},
		{
			headerName: 'Action',
			field: 'action',
			cellRenderer: 'actionButtonRenderer',
			editable: false,
			cellRendererParams: (params) => {
				return params.node.rowPinned
					? { onClick: () => handleSubmit(params), type: 'add' }
					: { onClick: (actionType) => onEditDeleteButtonClick(actionType, params) };
			},
		},
	];

	const defaultColDef = {
		flex: 1,
	};

	const pinnedTopRowData = useMemo(() => [inputRow], [inputRow]);

	const onGridReady = useCallback(
		(params) => {
			gridApiRef.current = params.api;
		},
		[gridApiRef]
	);

	const onCellClicked = useCallback((params) => {
		if (params.node.rowPinned === 'top') {
			gridApiRef.current.startEditingCell({
				rowIndex: params.node.rowIndex,
				colKey: params.column.getColId(),
				rowPinned: 'top',
			});
		}
	}, []);

	return (
		<div className="ag-theme-quartz-dark" style={{ height: '88%', width: '99%' }}>
			<AgGridReact
				columnDefs={columnDefs}
				defaultColDef={defaultColDef}
				rowData={patrollers}
				pinnedTopRowData={pinnedTopRowData}
				components={{
					actionButtonRenderer: (params) =>
						params.node.rowPinned ? <AddButton {...params} /> : <EditDeleteButton {...params} />,
				}}
				onGridReady={onGridReady}
				onCellClicked={onCellClicked}
				quickFilterText={quickFilterText}
			/>
		</div>
	);
};

export default PatrollersTable;
