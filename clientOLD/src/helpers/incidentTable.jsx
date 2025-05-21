export function timeValueFormatter(params) {
	if (params.value) {
		const date = new Date(params.value);
		if (!isNaN(date)) {
			return `${date.getHours().toString().padStart(2, '0')}:${date
				.getMinutes()
				.toString()
				.padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
		}
	}
	return '';
}

export const columnDefs = (deleteRow, selectedMountain) => [
    { headerName: 'Call Time', field: 'callTime', editable: true, width: 100, valueFormatter: timeValueFormatter },
    { headerName: 'Incident', field: 'incident', editable: true },
    {
        headerName: 'Location',
        field: 'location',
        editable: true,
        valueGetter: (params) => {
            if (params.data.location) {
                return `${params.data.location.type}, ${params.data.location.name}`;
            } else {
                return '';
            }
        },
    },
    {
        headerName: 'Patrollers',
        field: 'patrollers',
        editable: true,
        valueGetter: (params) =>
            Array.isArray(params.data.patrollers)
                ? params.data.patrollers.map((patroller) => `${patroller.firstName} ${patroller.lastName}`).join(', ')
                : '',
    },
    {
        headerName: 'On Scene',
        field: 'onSceneTime',
        editable: true,
        width: 100,
        valueFormatter: timeValueFormatter,
    },
    { headerName: 'Stable', field: 'stableTime', editable: true, width: 100, valueFormatter: timeValueFormatter },
    {
        headerName: 'Transport',
        field: 'transportTime',
        editable: true,
        width: 100,
        valueFormatter: timeValueFormatter,
    },
    { headerName: 'Dry Run', field: 'dryRun', editable: false, width: 100 },
    {
        headerName: 'Action',
        field: 'action',
        width: 100,
        cellRenderer: 'DeleteButton',
        cellRendererParams: {
            clicked: deleteRow,
            mountainId: selectedMountain ? selectedMountain._id : null,
        },
    },
];