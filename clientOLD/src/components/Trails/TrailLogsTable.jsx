import React, { useContext } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { MountainContext } from '../../contexts/MountainContext';
import StatusToggleButton from '../Toggles/StatusToggleButton';
import ConditionSelectRenderer from '../Toggles/ConditionsSelector';

const TrailLogsTable = () => {
	const { areas, trailLogs, trails, patrollers, api } = useContext(MountainContext);

	const areaMap = areas.reduce((map, area) => ({ ...map, [area._id]: area.name }), {});
	const trailMap = trails.reduce((map, trail) => ({ ...map, [trail._id]: trail.name }), {});
	const patrollerMap = patrollers.reduce(
		(map, patroller) => ({ ...map, [patroller._id]: `${patroller.firstName} ${patroller.lastName}` }),
		{}
	);

	const columnDefs = [
		{
			headerName: 'Trail',
			field: 'trail',
			valueGetter: (params) => trailMap[params.data.trail],
		},
		{
			headerName: 'Area',
			field: 'area',
			valueGetter: (params) => areaMap[params.data.area],
		},
		{
			headerName: 'Date',
			field: 'date',
			valueGetter: (params) => new Date(params.data.date).toLocaleDateString(),
		},
		{
			headerName: 'Checked By',
			field: 'checkedBy',
			valueGetter: (params) => patrollerMap[params.data.checkedBy],
		},
		{
			headerName: 'Condition',
			field: 'condition',
			cellRenderer: 'conditionSelectRenderer',
			editable: true,
			onCellValueChanged: (params) => {
				let updatedTrail = { ...params.data, status: params.newValue };
				if (params.newValue === 'closed') {
					updatedTrail = { ...updatedTrail, condition: 'closed' };
				}
				api.trailApi.updateTrail(updatedTrail.mountain, updatedTrail._id, updatedTrail);
			},
		},
		{
			headerName: 'Status',
			field: 'status',
			cellRenderer: 'statusToggleButton',
			cellRendererParams: { type: 'trail' },
		},
	];

	return (
		<div className="ag-theme-quartz-dark" style={{ height: '40vh', width: '60.65%' }}>
			<AgGridReact
				columnDefs={columnDefs}
				rowData={trailLogs}
				components={{
					statusToggleButton: StatusToggleButton,
					conditionSelectRenderer: ConditionSelectRenderer,
				}}
			/>
		</div>
	);
};

export default TrailLogsTable;
