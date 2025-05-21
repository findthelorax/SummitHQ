import React, { useContext } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { MountainContext } from '../../contexts/MountainContext';
import StatusToggleButton from '../Toggles/StatusToggleButton';

const TrailsTable = () => {
	const { trails, areas } = useContext(MountainContext);

	const areaMap = areas.reduce((map, area) => ({ ...map, [area._id]: area.name }), {});

	const columnDefs = [
		{ headerName: 'Trail Name', field: 'name' },
		{
			headerName: 'Area',
			field: 'area',
			sort: 'asc',
			valueGetter: (params) => areaMap[params.data.area],
		},
		{ headerName: 'Difficulty', field: 'difficulty' },
		{ headerName: 'Type', field: 'type' },
		{
			headerName: 'Status',
			field: 'status',
			cellRenderer: 'statusToggleButton',
			cellRendererParams: { type: 'trail' },
		},
	];

	return (
		<div className="ag-theme-quartz-dark" style={{ height: '40vh', width: '95%' }}>
			<AgGridReact
				columnDefs={columnDefs}
				rowData={trails}
				components={{
					statusToggleButton: StatusToggleButton
				}}
			/>
		</div>
	);
};

export default TrailsTable;