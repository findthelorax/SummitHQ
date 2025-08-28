import React, { useState, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef, CellValueChangedEvent } from 'ag-grid-community';
import { themeQuartz, colorSchemeDarkBlue } from 'ag-grid-community';
import { ChecksActionCellRenderer } from '../aggrid/ChecksActionCellRenderer';
import { useSnackbarContext } from '../../contexts/SnackbarContext';

const myTheme = themeQuartz.withPart(colorSchemeDarkBlue);

interface ChecksGridProps<T> {
    entityChecks: T[];
    createCheck: (data: Partial<T>) => Promise<void>;
    updateCheck: (id: string, data: Partial<T>) => Promise<void>;
    deleteCheck: (id: string) => Promise<void>;
    setIsLoadingChecks: (loading: boolean) => void;
    initialNewCheckState: Partial<T>;
    columnDefs: ColDef[];
    entityIdField: string;
    entityId: string;
}

export function ChecksGrid<T extends { id: string; employee?: any }>({
    entityChecks,
    createCheck,
    updateCheck,
    deleteCheck,
    setIsLoadingChecks,
    initialNewCheckState,
    columnDefs,
    entityIdField,
    entityId,
}: ChecksGridProps<T>) {
    const { showSnackbar } = useSnackbarContext();
    const [newCheck, setNewCheck] = useState(initialNewCheckState);

    const handleCreate = useCallback(async () => {
        if (!newCheck.employee || !newCheck.employee.id) {
            showSnackbar('Employee is required.', 'error');
            return;
        }
        try {
            await createCheck({ ...newCheck, employeeId: newCheck.employee.id, [entityIdField]: entityId });
            setNewCheck(initialNewCheckState);
            showSnackbar('Check created successfully!', 'success');
        } catch (error) {
            showSnackbar('Failed to create check.', 'error');
        }
    }, [createCheck, newCheck, showSnackbar, entityId, entityIdField, initialNewCheckState]);

    const handleDelete = useCallback(
        async (id: string) => {
            if (window.confirm('Are you sure you want to delete this check?')) {
                try {
                    await deleteCheck(id);
                    showSnackbar('Check deleted.', 'success');
                } catch (error) {
                    showSnackbar('Failed to delete check.', 'error');
                }
            }
        },
        [deleteCheck, showSnackbar]
    );

    const handleValueChanged = useCallback(
        async (event: CellValueChangedEvent<T>) => {
            const { data } = event;
            try {
                await updateCheck(data.id, data);
                showSnackbar('Check updated successfully!', 'success');
            } catch (error) {
                showSnackbar('Failed to update check.', 'error');
            }
        },
        [updateCheck, showSnackbar]
    );

    const pinnedTopRowData = useMemo(
        () => [
            {
                ...initialNewCheckState,
                employee: null,
                createdAt: new Date().toISOString(),
            },
        ],
        [initialNewCheckState]
    );

    // Add actions column if not present
    const columnsWithActions = useMemo(() => {
        const hasActions = columnDefs.some((col) => col.headerName === 'Actions');
        if (hasActions) return columnDefs;
        return [
            ...columnDefs,
            {
                headerName: 'Actions',
                cellRenderer: 'checksActionCellRenderer',
                cellRendererParams: {
                    onDelete: handleDelete,
                    onCreate: handleCreate,
                },
                flex: 1,
                editable: false,
            },
        ];
    }, [columnDefs, handleDelete, handleCreate]);

    return (
        <div className="ag-theme-quartz" style={{ height: '100%', width: '100%' }}>
            <AgGridReact
                columnDefs={columnsWithActions}
                rowData={entityChecks}
                pinnedTopRowData={pinnedTopRowData}
                onCellValueChanged={handleValueChanged}
                theme={myTheme}
                defaultColDef={{
                    editable: true,
                    resizable: true,
                    flex: 1,
                }}
                components={{ checksActionCellRenderer: ChecksActionCellRenderer }}
                getRowId={(params) => params.data.id}
                onGridReady={() => setIsLoadingChecks(false)}
            />
        </div>
    );
}

export default ChecksGrid;