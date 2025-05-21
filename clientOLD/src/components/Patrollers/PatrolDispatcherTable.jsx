import React, { useContext } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { MountainContext } from '../../contexts/MountainContext';

const PatrolDispatcherLogsTable = () => {
    const { patrolDispatcherLogs, mountains, patrollers } = useContext(MountainContext);

    const mountainMap = mountains.reduce((map, mountain) => ({ ...map, [mountain._id]: mountain.name }), {});
    const patrollerMap = patrollers.reduce((map, patroller) => ({ ...map, [patroller._id]: `${patroller.firstName} ${patroller.lastName}` }), {});

    const columnDefs = [
        { 
            headerName: "Mountain", 
            field: "mountain",
            valueGetter: params => mountainMap[params.data.mountain]
        },
        { 
            headerName: "Date", 
            field: "date",
            valueFormatter: params => new Date(params.value).toLocaleDateString()
        },
        { 
            headerName: "Patroller", 
            field: "patroller",
            valueGetter: params => patrollerMap[params.data.patroller]
        },
    ];

    return (
        <div className="ag-theme-quartz-dark" style={{ height: 400, width: 600 }}>
            <AgGridReact
                columnDefs={columnDefs}
                rowData={patrolDispatcherLogs}
            />
        </div>
    );
};

export default PatrolDispatcherLogsTable;