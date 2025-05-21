import React, { useContext } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { MountainContext } from '../../contexts/MountainContext';
import StatusToggleButton from '../Toggles/StatusToggleButton';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import AddButton from '../Buttons/AddButton';
import EditDeleteButton from '../Buttons/EditDeleteButton';
import { placeholderFormatter } from '../../helpers/placeholderFormatter';

const LodgesTable = () => {
    const { lodges, areas } = useContext(MountainContext);

    const areaMap = areas.reduce((map, area) => ({ ...map, [area._id]: area.name }), {});
    
    const columnDefs = [
        { headerName: "Lodge Name", field: "name" },
        { 
            headerName: "Area", 
            field: "area",
            valueGetter: params => areaMap[params.data.area]
        },
        { 
            headerName: "Status", 
            field: "status",
            cellRenderer: 'statusToggleButton',
            cellRendererParams: { type: 'lodge' },
        },
        { 
            headerName: "Hours", 
            field: "hours",
        },
        {
            headerName: "Equipment", 
            field: "equipment",
            valueGetter: params => params.data.equipment.map(equip => `${equip.type} #${equip.idNumber}`).join(', ')
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
                rowData={lodges}
                components={{ statusToggleButton: StatusToggleButton }}
            />
        </div>
    );
};

export default LodgesTable;