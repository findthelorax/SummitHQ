import React, { useState, useEffect, useContext } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { api } from '../../api/IncidentLogAPI';
import { MountainContext } from '../../contexts/MountainContext';
import IncidentForm from './IncidentForm';
import DeleteButton from '../CellRenders/DeleteButton';
import { columnDefs } from '../../helpers/incidentTable';
import { useFetchLogs } from '../../hooks/usseFetchLogs';

const IncidentTable = () => {
	const { selectedMountain } = useContext(MountainContext);
	const [selectedPatrollers, setSelectedPatrollers] = useState([]);
	const { rowData, setRowData } = useFetchLogs(selectedMountain);
	const [newRow, setNewRow] = useState({
		callTime: '',
		incident: '',
		location: '',
		patrollers: '',
		onSceneTime: '',
		stableTime: '',
		transportTime: '',
		dryRun: false,
	});

	// eslint-disable-next-line
	const [gridApi, setGridApi] = useState(null);

	const deleteRow = (deletedRowId) => {
		setRowData(rowData.filter((row) => row.id !== deletedRowId));
	};
	
	useEffect(() => {
		const fetchLogs = async () => {
			try {
				// Add a null check for selectedMountain
				if (selectedMountain && selectedMountain._id) {
					const logs = await api.getAllLogs(selectedMountain._id);
					const rowData = logs.map((log) => ({ id: log._id, ...log }));
					setRowData(Array.isArray(rowData) ? rowData : []);
				}
			} catch (error) {
				console.error('Error fetching logs', error);
				setRowData([]);
			}
		};
		
		fetchLogs();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedMountain]);



	const handleSubmit = async () => {
		if (
			!(newRow.callTime instanceof Date && !isNaN(newRow.callTime)) ||
			(!newRow.dryRun &&
				(!(newRow.onSceneTime instanceof Date && !isNaN(newRow.onSceneTime)) ||
					!(newRow.stableTime instanceof Date && !isNaN(newRow.stableTime)) ||
					!(newRow.transportTime instanceof Date && !isNaN(newRow.transportTime))))
		) {
			alert('Please enter a valid date.');
			return;
		}

		const patrollers = selectedPatrollers.map((patroller) => patroller._id);

		setNewRow((prevState) => ({
			...prevState,
			patrollers: patrollers,
		}));

		try {
			if (selectedMountain && selectedMountain._id) {
				await api.createLog(selectedMountain._id, { ...newRow, patrollers });
			}
		} catch (error) {
			console.error('Error creating log', error);
		}

		setRowData((prevState) => [newRow, ...prevState]);
		setSelectedPatrollers([]);
		setNewRow({
			callTime: '',
			incident: '',
			location: '',
			patrollers: '',
			onSceneTime: '',
			stableTime: '',
			transportTime: '',
			dryRun: false,
		});
	};

	const getRowStyle = (params) => {
		if (params.node.rowIndex % 2 === 0) {
			return { background: '#316ab3' };
		}
		return null;
	};
	const components = {
		DeleteButton: DeleteButton,
	};

	return (
		<div className="ag-theme-quartz-dark" style={{ height: '80vh', width: '100%' }}>
			<IncidentForm
				newRow={newRow}
				setNewRow={setNewRow}
				handleSubmit={handleSubmit}
				selectedPatrollers={selectedPatrollers}
				setSelectedPatrollers={setSelectedPatrollers}
			/>
			<AgGridReact
				columnDefs={columnDefs(deleteRow, selectedMountain)}
				rowData={[...rowData]}
				onGridReady={(params) => setGridApi(params.api)}
				components={components}
				getRowStyle={getRowStyle}
			/>
		</div>
	);
};

export default IncidentTable;
