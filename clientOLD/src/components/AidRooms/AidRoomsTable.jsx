import React, { useState, useCallback, useContext, useMemo, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { MountainContext } from '../../contexts/MountainContext';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import AddButton from '../Buttons/AddButton';
import EditDeleteButton from '../Buttons/EditDeleteButton';
import { placeholderFormatter } from '../../helpers/placeholderFormatter';

const AidRoomsTable = ({ gridApiRef, quickFilterText }) => {
    const { aidRooms, fetchAidRooms, areas, equipment, handleCreateAidRoom } = useContext(MountainContext);
    const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useContext(SnackbarContext);
    const [ inputRow, setInputRow ] = useState({ name: '', area: '' });
    const nameRef = useRef();
    const areaRef = useRef();

    const onEditDeleteButtonClick = useCallback((actionType) => {
        if (actionType === 'edit') {
            // Add your logic for the edit button click event here
        } else if (actionType === 'delete') {
            // Add your logic for the delete button click event here
        }
    }, []);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, area: areaName } = inputRow;
        const area = areas.find(a => a.name === areaName);
        if (!area) {
            console.error(`Area not found: ${areaName}`);
            return;
        }        const aidRoom = { name, area };
        try {
            await handleCreateAidRoom(aidRoom);
            nameRef.current.value = '';
            areaRef.current.value = '';
            fetchAidRooms();
            setOpenSnackbar(true);
            setSnackbarMessage(`${name} created successfully`);
            setSnackbarSeverity('success');
        } catch (error) {
            console.error(`Error creating ${name}`, error);
            setOpenSnackbar(true);
            setSnackbarMessage('Error creating aid room');
            setSnackbarSeverity('error');
        }
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
            headerName: 'Action',
            field: 'action',
            cellRenderer: 'actionButtonRenderer',
            editable: false,
            cellRendererParams: (params) => {
                return params.node.rowPinned ? { onClick: handleSubmit, type: 'add' } : { onClick: onEditDeleteButtonClick, type: 'editDelete' };
            },
        },
    ];

    const defaultColDef = {
        flex: 1,
        editable: true,
    };

    const pinnedTopRowData = useMemo(() => [inputRow], [inputRow]);

    const onGridReady = useCallback((params) => {
        gridApiRef.current = params.api;
    }, [gridApiRef]);

    const onCellClicked = useCallback((params) => {
        if (params.node.rowPinned === 'top') {
            gridApiRef.current.startEditingCell({
                rowIndex: params.node.rowIndex,
                colKey: params.column.getColId(),
                rowPinned: 'top',
            });
        }
    }, []);

    return (
        <div className="ag-theme-quartz-dark" style={{ height: '40vh', width: '99%' }}>
            <AgGridReact
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                rowData={aidRooms}
                pinnedTopRowData={pinnedTopRowData}
                components={{ actionButtonRenderer: params => params.node.rowPinned ? <AddButton {...params} /> : <EditDeleteButton {...params} /> }}
                onGridReady={onGridReady}
                onCellClicked={onCellClicked}
                quickFilterText={quickFilterText}
            />
        </div>
    );
};

export default AidRoomsTable;