import React, { useState, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { themeQuartz, colorSchemeDarkBlue } from 'ag-grid-community';
import type { ColDef, CellValueChangedEvent } from 'ag-grid-community';
import { useLiftChecks } from '../../hooks/checks/useLiftChecks';
import type { LiftCheckFull } from '../../types';
import { formatDate } from '../../utils/common/formatData';
import { ChecksActionCellRenderer } from '../aggrid/ChecksActionCellRenderer';
import { useSnackbarContext } from '../../contexts/SnackbarContext';
import { DEPARTMENT_LABELS, STATUS, STATUS_LABELS } from '../../types/generated-enums';
import { LiftCheckInputPayload } from '../../api/LiftAPI';

const myTheme = themeQuartz.withPart(colorSchemeDarkBlue);

const initialNewCheckState: LiftCheckInputPayload = {
    hazards: false,
    status: STATUS.CLOSED,
    notes: '',
    employeeId: '',
};

interface LiftChecksGridProps {
    mountainId: string;
    liftId: string;
}

export const LiftChecksGrid: React.FC<LiftChecksGridProps> = ({ mountainId, liftId }) => {
    const { showSnackbar } = useSnackbarContext();
    const { liftChecks, createLiftCheck, updateLiftCheck, deleteLiftCheck, setIsLoadingLiftChecks } = useLiftChecks(
        mountainId,
        liftId
    );

    const [newCheck, setNewCheck] = useState(initialNewCheckState);

    const handleCreate = useCallback(async () => {
        if (!newCheck.employeeId) {
            showSnackbar('Employee is required.', 'error');
            return;
        }
        try {
            await createLiftCheck({ ...newCheck, employeeId: newCheck.employeeId });
            setNewCheck(initialNewCheckState);
            showSnackbar('Check created successfully!', 'success');
        } catch (error) {
            showSnackbar('Failed to create check.', 'error');
        }
    }, [createLiftCheck, newCheck, showSnackbar]);

    const handleDelete = useCallback(
        async (id: string) => {
            if (window.confirm('Are you sure you want to delete this check?')) {
                try {
                    await deleteLiftCheck(id);
                    showSnackbar('Check deleted.', 'success');
                } catch (error) {
                    showSnackbar('Failed to delete check.', 'error');
                }
            }
        },
        [deleteLiftCheck, showSnackbar]
    );

    const handleValueChanged = useCallback(
        async (event: CellValueChangedEvent<LiftCheckFull>) => {
            // Handle the pinned top row separately
            if (event.node.rowPinned) {
                setNewCheck((prev) => ({ ...prev, [event.colDef.field!]: event.newValue }));
                return;
            }

            const { data } = event;
            try {
                await updateLiftCheck(data.id, data);
                showSnackbar('Check updated successfully!', 'success');
            } catch (error) {
                showSnackbar('Failed to update check.', 'error');
            }
        },
        [updateLiftCheck, showSnackbar]
    );

    const columnDefs: ColDef[] = useMemo(
        () => [
            {
                headerName: 'First Name',
                valueGetter: (p) => p.data.employee?.firstName,
                minWidth: 120,
                editable: false,
            },
            {
                headerName: 'Last Name',
                valueGetter: (p) => p.data.employee?.lastName,
                minWidth: 120,
                editable: false,
            },
            {
                headerName: 'Department',
                valueGetter: (p) => p.data.employee?.primaryDepartment,
                valueFormatter: (p) => DEPARTMENT_LABELS[p.value as keyof typeof DEPARTMENT_LABELS] || 'Unknown',
                minWidth: 150,
                editable: false,
            },
            { 
                field: 'hazards', 
                headerName: 'Hazards', 
                flex: 1,
                editable: (params) => params.node.rowPinned === 'top'
            },
            { 
                field: 'status', 
                headerName: 'Status', 
                flex: 1,
                valueFormatter: (p) => STATUS_LABELS[p.value as keyof typeof STATUS_LABELS] || p.value,
                editable: (params) => params.node.rowPinned === 'top'
            },
            { 
                field: 'notes', 
                headerName: 'Notes', 
                flex: 2,
                editable: (params) => params.node.rowPinned === 'top'
            },
            {
                headerName: 'Actions',
                cellRenderer: 'checksActionCellRenderer',
                cellRendererParams: {
                    onCreate: handleCreate,
                    onDelete: handleDelete,
                },
                flex: 1,
                editable: false,
            },
        ],
        [handleCreate, handleDelete]
    );
    
    const defaultColDef: ColDef = useMemo(
        () => ({
            editable: false, // Default is NOT editable
            resizable: true,
            flex: 1,
        }),
        []
    );

    const pinnedTopRowData = useMemo(
        () => [
            {
                ...newCheck, // Use the current newCheck state
                employee: null,
                createdAt: new Date().toISOString(),
                status: STATUS.CLOSED,
            },
        ],
        [newCheck]
    );

    return (
        <div className="ag-theme-quartz-dark" style={{ height: 600, width: '100%' }}>
            <AgGridReact
                columnDefs={columnDefs}
                rowData={liftChecks}
                pinnedTopRowData={pinnedTopRowData}
                onCellValueChanged={handleValueChanged}
                theme={myTheme}
                defaultColDef={defaultColDef}
                components={{
                    checksActionCellRenderer: ChecksActionCellRenderer as React.FC<any>,
                }}
                stopEditingWhenCellsLoseFocus
                getRowId={(params: { data: any }) => params.data.id || 'new'}
                onGridReady={() => setIsLoadingLiftChecks(false)}
            />
        </div>
    );
};

export default LiftChecksGrid;