import React, { useState, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { themeQuartz, colorSchemeDarkBlue } from 'ag-grid-community';
import type { ColDef, CellValueChangedEvent } from 'ag-grid-community';
import { useTrailChecks } from '../../hooks/checks/useTrailChecks';
import type { TrailCheckFull } from '../../types';
import { ChecksActionCellRenderer } from '../aggrid/ChecksActionCellRenderer';
import { useSnackbarContext } from '../../contexts/SnackbarContext';
import { DEPARTMENT_LABELS, STATUS, TRAIL_CONDITION } from '../../types/generated-enums';
import { TrailCheckInputPayload } from '../../api/TrailAPI';

const myTheme = themeQuartz.withPart(colorSchemeDarkBlue);

const initialNewCheckState: TrailCheckInputPayload = {
    status: STATUS.CLOSED,
    condition: TRAIL_CONDITION.CLOSED,
    hazards: false,
    snowmaking: false,
    notes: '',
    employeeId: '',
};

interface TrailChecksGridProps {
    mountainId: string;
    trailId: string;
}

export const TrailChecksGrid: React.FC<TrailChecksGridProps> = ({ mountainId, trailId }) => {
    const { showSnackbar } = useSnackbarContext();
    const { trailChecks, createTrailCheck, updateTrailCheck, deleteTrailCheck, setIsLoadingTrailChecks } = useTrailChecks(
        mountainId,
        trailId
    );

    const [newCheck, setNewCheck] = useState(initialNewCheckState);

    const handleCreate = useCallback(async () => {
        if (!newCheck.employeeId) {
            showSnackbar('Employee is required.', 'error');
            return;
        }
        try {
            await createTrailCheck({ ...newCheck, employeeId: newCheck.employeeId });
            setNewCheck(initialNewCheckState);
            showSnackbar('Check created successfully!', 'success');
        } catch (error) {
            showSnackbar('Failed to create check.', 'error');
        }
    }, [createTrailCheck, newCheck, showSnackbar]);

    const handleDelete = useCallback(
        async (id: string) => {
            if (window.confirm('Are you sure you want to delete this check?')) {
                try {
                    await deleteTrailCheck(id);
                    showSnackbar('Check deleted.', 'success');
                } catch (error) {
                    showSnackbar('Failed to delete check.', 'error');
                }
            }
        },
        [deleteTrailCheck, showSnackbar]
    );

    const handleValueChanged = useCallback(
        async (event: CellValueChangedEvent<TrailCheckFull>) => {
            const { data } = event;
            try {
                await updateTrailCheck(data.id, data);
                showSnackbar('Check updated successfully!', 'success');
            } catch (error) {
                showSnackbar('Failed to update check.', 'error');
            }
        },
        [updateTrailCheck, showSnackbar]
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
            { field: 'status', headerName: 'Status', flex: 1 },
            { field: 'condition', headerName: 'Condition', flex: 1 },
            { field: 'hazards', headerName: 'Hazards', flex: 1 },
            { field: 'snowmaking', headerName: 'Snowmaking', flex: 1 },
            { field: 'notes', headerName: 'Notes', flex: 2 },
            {
                headerName: 'Actions',
                cellRenderer: 'checksActionCellRenderer',
                cellRendererParams: {
                    onDelete: handleDelete,
                },
                flex: 1,
            },
        ],
        [handleDelete]
    );
    const defaultColDef: ColDef = useMemo(
        () => ({
            editable: true,
            resizable: true,
            flex: 1,
        }),
        []
    );

    const pinnedTopRowData = useMemo(
        () => [
            {
                ...initialNewCheckState,
                employee: null,
                createdAt: new Date().toISOString(),
                status: STATUS.CLOSED,
            },
        ],
        []
    );

    return (
        <div className="ag-theme-quartz" style={{ height: 600, width: '100%' }}>
            <AgGridReact
                columnDefs={columnDefs}
                rowData={trailChecks}
                pinnedTopRowData={pinnedTopRowData}
                onCellValueChanged={handleValueChanged}
                theme={myTheme}
                defaultColDef={defaultColDef}
                components={{ checksActionCellRenderer: ChecksActionCellRenderer }}
                onGridReady={() => setIsLoadingTrailChecks(false)}
            />
        </div>
    );
};

export default TrailChecksGrid;