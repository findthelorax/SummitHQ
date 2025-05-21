import React, { useContext } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { MountainContext } from '../../contexts/MountainContext';

const EquipmentLogsTable = () => {
    const { equipmentLogs, equipment, patrollers } = useContext(MountainContext);

    const equipmentMap = equipment.reduce((map, equip) => ({ ...map, [equip._id]: equip.name }), {});
    const patrollerMap = patrollers.reduce((map, patroller) => ({ ...map, [patroller._id]: `${patroller.firstName} ${patroller.lastName}` }), {});

    const columnDefs = [
        { 
            headerName: "Equipment", 
            field: "equipment",
            valueGetter: params => equipmentMap[params.data.equipment]
        },
        { 
            headerName: "Checked", 
            field: "checked",
            valueGetter: params => params.data.checked ? 'Yes' : 'No'
        },
        { 
            headerName: "Checked On", 
            field: "checkedOn",
            valueGetter: params => new Date(params.data.checkedOn).toLocaleDateString()
        },
        { 
            headerName: "Checked By", 
            field: "checkedBy",
            valueGetter: params => patrollerMap[params.data.checkedBy]
        },
    ];

    return (
        <div className="ag-theme-quartz-dark" style={{ height: '40vh', width: '95%' }}>
            <AgGridReact
                columnDefs={columnDefs}
                rowData={equipmentLogs}
            />
        </div>
    );
};

export default EquipmentLogsTable;