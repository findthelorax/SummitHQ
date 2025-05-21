import React, { useState, useCallback, useContext } from 'react';
import { MountainContext } from '../../contexts/MountainContext';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import Table from '../AgGridTable';
import { placeholderFormatter } from '../../helpers/placeholderFormatter';

const HutsTable = () => {
    const { huts, fetchHuts, handleCreateHut, handleDeleteHut, areas, equipment } = useContext(MountainContext);
    const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(SnackbarContext);

    const handleCreate = async (row) => {
        // Add your logic to create a hut here
        // For example:
        await handleCreateHut(row);
    };

    const handleDelete = async (id) => {
        // Add your logic to delete a hut here
        // For example:
        await handleDeleteHut(id);
    };

    const columnDefs = [
        { 
            headerName: "Name", 
            field: "name",
            valueFormatter: placeholderFormatter,
        },
        {
            headerName: "Area",
            field: "area",
            valueFormatter: placeholderFormatter,
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
                values: areas.map(area => area.name)
            }
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
            headerName: "Paperwork",
            field: "paperwork",
            valueFormatter: placeholderFormatter,
            valueGetter: params => params.data && params.data.paperwork ? params.data.paperwork.join(', ') : '',
        },
        {
            headerName: 'Location',
            field: 'coordinates',
            valueFormatter: (params) => (params.value ? `${params.value.lat}, ${params.value.lng}` : 'No coordinates'),
        },
        {
            headerName: 'Last Log',
            field: 'lastLog',
            valueFormatter: placeholderFormatter,
        },
        {
            headerName: 'Action',
            field: 'action',
            cellRenderer: 'actionButtonRenderer',
            editable: false,
        },
    ];

    return (
        <Table
            rowData={huts}
            columnDefs={columnDefs}
            handleCreate={handleCreate}
            handleDelete={handleDelete}
            fetchRows={fetchHuts}
            context={{ setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity }}
        />
    );
};

export default HutsTable;