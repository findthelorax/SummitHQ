import React, { useContext } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { MountainContext } from '../../contexts/MountainContext';

const LiftLineChecksTable = () => {
    const { liftLineChecks, mountains, areas, lifts, patrollers } = useContext(MountainContext);

    const mountainMap = mountains.reduce((map, mountain) => ({ ...map, [mountain._id]: mountain.name }), {});
    const areaMap = areas.reduce((map, area) => ({ ...map, [area._id]: area.name }), {});
    const liftMap = lifts.reduce((map, lift) => ({ ...map, [lift._id]: lift.name }), {});
    const patrollerMap = patrollers.reduce((map, patroller) => ({ ...map, [patroller._id]: `${patroller.firstName} ${patroller.lastName}` }), {});

    const columnDefs = [
        { 
            headerName: "Mountain", 
            field: "mountain",
            valueGetter: params => mountainMap[params.data.mountain]
        },
        { 
            headerName: "Area", 
            field: "area",
            valueGetter: params => areaMap[params.data.area]
        },
        { 
            headerName: "Lift", 
            field: "lift",
            valueGetter: params => liftMap[params.data.lift]
        },
        { 
            headerName: "Patroller", 
            field: "patroller",
            valueGetter: params => patrollerMap[params.data.patroller]
        },
        { 
            headerName: "Time", 
            field: "time",
            valueFormatter: params => new Date(params.value).toLocaleDateString()
        },
        { 
            headerName: "Comments", 
            field: "comments"
        },
    ];

    return (
        <div className="ag-theme-quartz-dark" style={{ height: '40vh', width: '95%' }}>
            <AgGridReact
                columnDefs={columnDefs}
                rowData={liftLineChecks}
            />
        </div>
    );
};

export default LiftLineChecksTable;