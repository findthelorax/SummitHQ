import React, { useState, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { themeQuartz, colorSchemeDarkBlue } from 'ag-grid-community';
import type { ColDef, CellValueChangedEvent } from 'ag-grid-community';
import { useHutChecks } from '../../hooks/logs/useHutChecks';
import type { HutCheckFull } from '../../types';
import { formatDate } from '../../utils/common/formatData';
import { ChecksActionCellRenderer } from '../aggrid/ChecksActionCellRenderer';
import { useSnackbarContext } from '../../contexts/SnackbarContext';
import { DEPARTMENT_LABELS } from '../../types/generated-enums';
import { HutCheckInputPayload } from '../../api/HutAPI';

const myTheme = themeQuartz.withPart(colorSchemeDarkBlue);

const initialNewCheckState: HutCheckInputPayload = {
    equipmentIssues: false,
    equipmentNotes: '',
    paperworkStocked: false,
    notes: '',
    employeeId: '',
};

interface HutChecksGridProps {
    mountainId: string;
    hutId: string;
}

export const HutChecksGrid: React.FC<HutChecksGridProps> = ({ mountainId, hutId }) => {
    const { showSnackbar } = useSnackbarContext();
    const { hutChecks, createHutCheck, updateHutCheck, deleteHutCheck, setIsLoadingHutChecks } =
        useHutChecks(mountainId, hutId);

    const [newCheck, setNewCheck] = useState(initialNewCheckState);

    const handleCreate = useCallback(async () => {
        if (!newCheck.employeeId) {
            showSnackbar('Employee is required.', 'error');
            return;
        }
        try {
            await createHutCheck({ ...newCheck, employeeId: newCheck.employeeId });
            setNewCheck(initialNewCheckState);
            showSnackbar('Check created successfully!', 'success');
        } catch (error) {
            showSnackbar('Failed to create check.', 'error');
        }
    }, [createHutCheck, newCheck, showSnackbar]);

    const handleDelete = useCallback(
        async (id: string) => {
            if (window.confirm('Are you sure you want to delete this check?')) {
                try {
                    await deleteHutCheck(id);
                    showSnackbar('Check deleted.', 'success');
                } catch (error) {
                    showSnackbar('Failed to delete check.', 'error');
                }
            }
        },
        [deleteHutCheck, showSnackbar]
    );

    const onCellValueChanged = useCallback(
        async (event: CellValueChangedEvent) => {
            // If the change was in the pinned "new check" row, update local state
            if (event.node.rowPinned) {
                setNewCheck((prev) => ({ ...prev, [event.colDef.field!]: event.newValue }));
                return;
            }

            // Otherwise, update the existing check in the database
            const { id, ...data } = event.data;
            try {
                await updateHutCheck(id, data);
                showSnackbar('Check updated.', 'info');
            } catch (error) {
                showSnackbar('Failed to update check.', 'error');
            }
        },
        [updateHutCheck, showSnackbar]
    );

    const columnDefs = useMemo<ColDef[]>(
        () => [
            {
                headerName: 'Hut',
                field: 'hut.name',
                minWidth: 150,
                hide: hutId !== 'all', // Only show when "All" is selected
                editable: false,
            },
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
                headerName: 'Equipment Issues',
                field: 'equipmentIssues',
                cellRenderer: 'agCheckboxCellRenderer',
                minWidth: 150,
            },
            { headerName: 'Equipment Notes', field: 'equipmentNotes', minWidth: 250 },
            {
                headerName: 'Paperwork Stocked',
                field: 'paperworkStocked',
                cellRenderer: 'agCheckboxCellRenderer',
                minWidth: 150,
            },
            { headerName: 'General Notes', field: 'notes', minWidth: 250 },
            {
                headerName: 'Actions',
                field: 'actions',
                editable: false,
                cellRenderer: ChecksActionCellRenderer,
                cellRendererParams: {
                    onCreate: handleCreate,
                    onDelete: handleDelete,
                },
                minWidth: 150,
            },
        ],
        [handleCreate, handleDelete, hutId]
    );

    return (
        <div className="ag-theme-quartz-dark" style={{ height: 600, width: '100%' }}>
            <AgGridReact
                columnDefs={columnDefs}
                rowData={hutChecks}
                pinnedTopRowData={[newCheck]}
                onCellValueChanged={onCellValueChanged}
                defaultColDef={{
                    resizable: true,
                    sortable: true,
                    filter: true,
                    editable: true,
                    flex: 1,
                }}
                getRowId={(params) => params.data.id}
                stopEditingWhenCellsLoseFocus
            />
        </div>
    );
};