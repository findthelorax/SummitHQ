import React, { useContext } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { MountainContext } from '../../contexts/MountainContext';

const HutsTable = () => {
    const { huts, areas } = useContext(MountainContext);

    const areaMap = areas.reduce((map, area) => ({ ...map, [area._id]: area.name }), {});

    const columnDefs = [
        { headerName: "Name", field: "name" },
        { 
            headerName: "Area", 
            field: "area",
            valueGetter: params => areaMap[params.data.area]
        },
        {
            headerName: "Equipment", 
            field: "equipment",
            valueGetter: params => params.data.equipment.map(equip => `${equip.type} #${equip.idNumber}`).join(', ')
        },
        { 
            headerName: "Paperwork", 
            field: "paperwork",
            valueGetter: params => params.data.paperwork.join(', ')
        },
        {
			headerName: 'Location',
			field: 'coordinates',
			valueFormatter: (params) => (params.value ? `${params.value.lat}, ${params.value.lng}` : 'No coordinates'),
		},
    ];

    return (
        <div className="ag-theme-quartz-dark" style={{ height: '40vh', width: '95%' }}>
            <AgGridReact
                columnDefs={columnDefs}
                rowData={huts}
            />
        </div>
    );
};

export default HutsTable;