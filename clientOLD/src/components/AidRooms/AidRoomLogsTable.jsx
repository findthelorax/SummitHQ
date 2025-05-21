import React, { useContext } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { MountainContext } from '../../contexts/MountainContext';

const AidRoomLogsTable = () => {
    const { aidRoomLogs, aidRooms, equipment, patrollers } = useContext(MountainContext);

    const aidRoomMap = aidRooms.reduce((map, aidRoom) => ({ ...map, [aidRoom._id]: aidRoom.name }), {});
    const equipmentMap = equipment.reduce((map, equip) => ({ ...map, [equip._id]: equip.name }), {});
    const patrollerMap = patrollers.reduce((map, patroller) => ({ ...map, [patroller._id]: `${patroller.firstName} ${patroller.lastName}` }), {});

    const columnDefs = [
        { 
            headerName: "First Aid Room", 
            field: "aidRoom",
            valueGetter: params => aidRoomMap[params.data.aidRoom]
        },
        { 
            headerName: "Equipment Checked Log", 
            field: "equipmentCheckedLog",
            valueGetter: params => params.data.equipmentCheckedLog.map(log => `${equipmentMap[log.equipment]} checked by ${patrollerMap[log.checkedBy]} on ${new Date(log.checkedOn).toLocaleDateString()}`).join(', ')
        },
        { 
            headerName: "Cleaning Log", 
            field: "cleaningLog",
            valueGetter: params => params.data.cleaningLog.map(log => `Cleaned by ${patrollerMap[log.cleanedBy]} on ${new Date(log.cleanedOn).toLocaleDateString()}`).join(', ')
        },
    ];

    return (
        <div className="ag-theme-quartz-dark" style={{ height: '40vh', width: '95%' }}>
            <AgGridReact
                columnDefs={columnDefs}
                rowData={aidRoomLogs}
            />
        </div>
    );
};

export default AidRoomLogsTable;