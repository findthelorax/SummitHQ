import React, { useState, useContext } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { MountainContext } from '../../contexts/MountainContext';
import StatusToggleButton from '../Toggles/StatusToggleButton';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import AddButton from '../Buttons/AddButton';
import EditDeleteButton from '../Buttons/EditDeleteButton';
import { placeholderFormatter } from '../../helpers/placeholderFormatter';

const LiftsTable = () => {
	const { lifts, areas, areaMap, equipment } = useContext(MountainContext);
	const [inputRow, setInputRow] = useState({ name: '', area: '', status: '', equipment: '', coordinates: '' });

	const columnDefs = [
        { 
            headerName: 'Name', 
            field: 'name',
            onCellValueChanged: params => {
                if (params.node.rowPinned === 'top') {
                    setInputRow(prev => ({ ...prev, name: params.newValue }));
                }
            },
        },
		{
			headerName: 'Area',
			field: 'area',
			valueGetter: (params) => areaMap[params.data.area],
		},
		{
			headerName: 'Status',
			field: 'status',
			cellRenderer: 'statusToggleButton',
			cellRendererParams: { type: 'lift' },
		},
        {
            headerName: "Equipment",
            field: "equipment",
            valueFormatter: placeholderFormatter,
            valueGetter: params => params.data && params.data.equipment ? params.data.equipment.map(equip => `${equip.type} #${equip.idNumber}`).join(', ') : '',
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
                values: equipment.map(equip => `${equip.type} #${equip.idNumber}`)
            }
        },
		{
			headerName: 'Location',
			field: 'coordinates',
			valueFormatter: (params) => (params.value ? `${params.value.lat}, ${params.value.lng}` : 'No coordinates'),
		},
	];

    return (
        <div className="ag-theme-quartz-dark" style={{ height: '40vh', width: '99%' }}>
            <AgGridReact
                columnDefs={columnDefs}
                rowData={lifts}
                pinnedTopRowData={[inputRow]}
                components={{ statusToggleButton: StatusToggleButton }}
            />
        </div>
    );
};

export default LiftsTable;