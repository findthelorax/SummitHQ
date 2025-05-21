import React, { useContext, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { MountainContext } from '../../contexts/MountainContext';

function EquipmentTable() {
	const { equipment, fetchEquipment, isLoading, selectedMountain, handleServiceToggle } = useContext(MountainContext);

	useEffect(() => {
		if (selectedMountain) {
			fetchEquipment(selectedMountain._id);
		}
	}, [fetchEquipment, selectedMountain]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	const columnDefs = [
		{ headerName: 'Type', field: 'type', width: 150 },
		{ headerName: 'ID Number', field: 'idNumber', width: 150 },
		{ headerName: 'In Service', field: 'inServiceDate', width: 150 },
		{ headerName: 'Out of Service', field: 'outOfServiceDate', width: 150 },
		{ headerName: 'Description', field: 'description', width: 200 },
		{
			headerName: 'Location',
			valueGetter: (params) => `${params.data.location.type}, ${params.data.location.name}`,
			width: 150,
		},
		{ headerName: 'Action', field: 'action', width: 100 },
		{
			headerName: 'Service',
			field: 'service',
			width: 150,
			cellRenderer: 'serviceButton',
			cellRendererParams: {
				handleServiceToggle,
			},
		},
	];

	return (
		<div className="ag-theme-quartz-dark" style={{ height: '500px', width: '100%', marginLeft: 20, marginTop: 20 }}>
			<AgGridReact columnDefs={columnDefs} rowData={equipment} />
		</div>
	);
}

export default EquipmentTable;
