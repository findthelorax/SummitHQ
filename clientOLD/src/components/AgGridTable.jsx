import React, { useState, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import AddButton from './Buttons/AddButton';
import EditDeleteButton from './Buttons/EditDeleteButton';

const Table = ({ rowData, columnDefs, handleCreate, handleUpdate, handleDelete, fetchRows, context }) => {
    const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = context;
    const [inputRow, setInputRow] = useState({});

    const onEditDeleteButtonClick = useCallback((actionType, params) => {
        if (actionType === 'edit') {
            // Add your logic for the edit button click event here
        } else if (actionType === 'delete') {
            handleDelete(params.data._id);
        }
    }, [handleDelete]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleCreate(inputRow);
            fetchRows();
            setOpenSnackbar(true);
            setSnackbarMessage(`Created successfully`);
            setSnackbarSeverity('success');
        } catch (error) {
            console.error(`Error creating`, error);
            setOpenSnackbar(true);
            setSnackbarMessage('Error creating');
            setSnackbarSeverity('error');
        }
    };

    return (
        <div className="ag-theme-quartz-dark" style={{ height: '40vh', width: '99%' }}>
            <AgGridReact
                columnDefs={columnDefs}
                rowData={rowData}
                pinnedTopRowData={[inputRow]}
                components={{ actionButtonRenderer: params => params.node.rowPinned ? <AddButton {...params} /> : <EditDeleteButton {...params} /> }}
            />
        </div>
    );
};

export default Table;