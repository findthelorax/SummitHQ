import React, { useState, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { themeQuartz, colorSchemeDarkBlue } from 'ag-grid-community';
import type { ColDef, CellValueChangedEvent } from 'ag-grid-community';
import { useAidRoomChecks } from '../../hooks/checks/useAidRoomChecks';
import type { AidRoomCheckFull } from '../../types';
import { formatDate } from '../../utils/common/formatData';
import { ChecksActionCellRenderer } from '../aggrid/ChecksActionCellRenderer';
import { useSnackbarContext } from '../../contexts/SnackbarContext';
import { DEPARTMENT_LABELS } from '../../types/generated-enums';
import { AidRoomCheckInputPayload } from '../../api/AidRoomAPI';

const myTheme = themeQuartz.withPart(colorSchemeDarkBlue);

const initialNewCheckState: AidRoomCheckInputPayload = {
    employeeId: '',
    equipmentIssues: false,
    equipmentNotes: '',
    paperworkStocked: false,
    notes: '',
};

interface AidRoomChecksGridProps {
    mountainId: string;
    aidRoomId: string;
}

export const AidRoomChecksGrid: React.FC<AidRoomChecksGridProps> = ({ mountainId, aidRoomId }) => {
    const { showSnackbar } = useSnackbarContext();
    const { aidRoomChecks, createAidRoomCheck, updateAidRoomCheck, deleteAidRoomCheck, setIsLoadingAidRoomChecks } =
        useAidRoomChecks(mountainId, aidRoomId);

    const [newCheck, setNewCheck] = useState(initialNewCheckState);

    const handleCreate = useCallback(async () => {
        if (!newCheck.employeeId) {
            showSnackbar('Employee is required.', 'error');
            return;
        }
        try {
            await createAidRoomCheck({ ...newCheck, employeeId: newCheck.employeeId });
            setNewCheck(initialNewCheckState);
            showSnackbar('Check created successfully!', 'success');
        } catch (error) {
            showSnackbar('Failed to create check.', 'error');
        }
    }, [createAidRoomCheck, newCheck, showSnackbar]);

    const handleDelete = useCallback(
        async (id: string) => {
            if (window.confirm('Are you sure you want to delete this check?')) {
                try {
                    await deleteAidRoomCheck(id);
                    showSnackbar('Check deleted.', 'success');
                } catch (error) {
                    showSnackbar('Failed to delete check.', 'error');
                }
            }
        },
        [deleteAidRoomCheck, showSnackbar]
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
                await updateAidRoomCheck(id, data);
                showSnackbar('Check updated.', 'info');
            } catch (error) {
                showSnackbar('Failed to update check.', 'error');
            }
        },
        [updateAidRoomCheck, showSnackbar]
    );

    const columnDefs = useMemo<ColDef[]>(
        () => [
            {
                headerName: 'Aid Room',
                field: 'aidRoom.name',
                minWidth: 150,
                hide: aidRoomId !== 'all', // Only show when "All" is selected
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
        [handleCreate, handleDelete, aidRoomId]
    );

    return (
        <div className="ag-theme-quartz-dark" style={{ height: 600, width: '100%' }}>
            <AgGridReact
                columnDefs={columnDefs}
                rowData={aidRoomChecks}
                pinnedTopRowData={[newCheck]}
                onCellValueChanged={onCellValueChanged}
                theme={myTheme}
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