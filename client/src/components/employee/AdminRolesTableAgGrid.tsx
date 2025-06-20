import React, { useMemo, useState } from 'react';
import { ROLE_LEVEL, ROLE_LEVEL_LABELS, DEPARTMENT, DEPARTMENT_LABELS } from '../../types/generated-enums';
import { useSnackbarContext } from '../../contexts/SnackbarContext';
import { EntityTableAgGrid } from '../aggrid/TableSkeleton';
import { createEditableCell } from '../../utils/common/createEditableCell';
import { placeholderFormatter } from '../../utils/common/formatData';
import ActionButtons from '../buttons/ActionButtons';
import { useGridConfirm } from '../../utils/AgGrid/hooks/useGridConfirm';
import { generateActionCellRendererParams } from '../../utils/common/getActionButtonParams';

import { getEmptyNewRoleRow } from '../../utils/AgGrid/rowFactories';
import { mapRoleToRow } from '../../utils/AgGrid/mapToRow';
import { roleRowToInputPayload } from '../../utils/AgGrid/InputPayloadConversion';
import { RoleRow, RolesTableAgGridProps } from '../../utils/AgGrid/tableTypes';

const AdminRolesTableAgGrid: React.FC<RolesTableAgGridProps> = ({
    roles,
    fetchRoles,
    isLoading,
    updateRole,
    deleteRole,
    onAddRole,
}) => {
    const [addRoleRow, setAddRoleRow] = useState<RoleRow>(getEmptyNewRoleRow());
    const [editRoleRow, setEditRoleRow] = useState<RoleRow>(getEmptyNewRoleRow());
    const [editingRowId, setEditingRowId] = useState<string | null>(null);
    const deleteConfirm = useGridConfirm<{ id: string; title: string }>();
    const { showSnackbar } = useSnackbarContext();

    React.useEffect(() => {
        fetchRoles();
    }, []);

    const editableCell = (field: keyof RoleRow) =>
        createEditableCell<RoleRow>(field, {
            selectOptions:
                field === 'department'
                    ? Object.keys(DEPARTMENT)
                    : field === 'level'
                    ? Object.keys(ROLE_LEVEL)
                    : undefined,
            getRowState: (params) => {
                if (params.data?.isNew) return addRoleRow;
                if (params.data?.id === editingRowId) return editRoleRow;
                return getEmptyNewRoleRow();
            },
            setRowState: (updater, params) => {
                if (params.data?.isNew) setAddRoleRow(updater);
                else if (params.data?.id === editingRowId) setEditRoleRow(updater);
            },
            editable: (params: any) => params.data?.isNew || params.data?.id === editingRowId,
        });

    const withPlaceholder = (formatter?: (params: any) => string) => (params: any) => {
        const placeholder = placeholderFormatter(params);
        if (placeholder !== params.value) return placeholder;
        return formatter ? formatter(params) : params.value;
    };

    const columnDefs = useMemo(
        () => [
            {
                headerName: 'Department',
                field: 'department',
                minWidth: 120,
                valueFormatter: (params: any) => DEPARTMENT_LABELS[params.value as DEPARTMENT] || params.value,
                ...editableCell('department'),
            },
            {
                headerName: 'Title',
                field: 'title',
                minWidth: 120,
                valueFormatter: withPlaceholder(),
                ...editableCell('title'),
            },
            {
                headerName: 'Position',
                field: 'position',
                minWidth: 120,
                valueFormatter: withPlaceholder(),
                ...editableCell('position'),
            },
            {
                headerName: 'Level',
                field: 'level',
                minWidth: 120,
                valueFormatter: (params: any) => ROLE_LEVEL_LABELS[params.value as ROLE_LEVEL] || params.value,
                ...editableCell('level'),
            },
            {
                headerName: 'Permissions',
                field: 'permissions',
                minWidth: 180,
                valueFormatter: (params: any) => params.value || '—',
                ...editableCell('permissions'),
            },
            {
                headerName: 'Actions',
                cellRenderer: ActionButtons,
                cellRendererParams: generateActionCellRendererParams<RoleRow>(
                    editingRowId,
                    addRoleRow,
                    setAddRoleRow,
                    (row: RoleRow) => onAddRole(roleRowToInputPayload(row)),
                    (row: RoleRow) => {
                        setEditRoleRow({ ...row });
                        setEditingRowId(row.id ?? '');
                    },
                    async (row: RoleRow) => {
                        await updateRole(row.id ?? '', roleRowToInputPayload(editRoleRow));
                        setEditingRowId(null);
                        setEditRoleRow(getEmptyNewRoleRow());
                    },
                    () => {
                        setEditingRowId(null);
                        setEditRoleRow(getEmptyNewRoleRow());
                    },
                    (row: RoleRow) => {
                        if (row.id && row.title) {
                            deleteConfirm.requestConfirm({ id: row.id, title: row.title });
                        }
                    },
                    fetchRoles,
                    (msg: string, type?: string) =>
                        showSnackbar(msg, (type as 'success' | 'error' | 'info' | 'warning') ?? 'info'),
                    getEmptyNewRoleRow,
                    ['department', 'title', 'position', 'level']
                ),
                minWidth: 120,
                pinned: 'right',
                suppressSizeToFit: true,
            },
        ],
        [
            fetchRoles,
            addRoleRow,
            setAddRoleRow,
            editRoleRow,
            setEditRoleRow,
            editingRowId,
            showSnackbar,
            deleteConfirm.requestConfirm,
        ]
    );

    return (
        <>
            <EntityTableAgGrid
                entityName="role"
                entities={roles}
                fetchEntities={fetchRoles}
                isLoading={isLoading}
                updateEntity={updateRole}
                deleteEntity={deleteRole}
                onAddEntity={onAddRole}
                getEmptyNewRow={getEmptyNewRoleRow}
                mapToRow={mapRoleToRow}
                inputPayloadConverter={roleRowToInputPayload}
                columnDefs={columnDefs}
                requiredFields={['department', 'title', 'position', 'level']}
                specialCellRenderers={{
                    ActionButtons,
                }}
                editingRowId={editingRowId}
                setEditingRowId={setEditingRowId}
                agGridContext={{
                    editingRowId,
                    setRowState: (row: any, params: any) => {
                        if (params.data?.isNew) setAddRoleRow(row);
                        else if (params.data?.id === editingRowId) setEditRoleRow(row);
                    },
                }}
                newRow={addRoleRow}
                setNewRow={setAddRoleRow}
            />

            {/* Confirm Delete Dialog */}
            {deleteConfirm.getDialog({
                title: 'Delete Role',
                message: `Are you sure you want to delete "${deleteConfirm.itemToDelete?.title}"?`,
                onConfirm: async () => {
                    if (deleteConfirm.itemToDelete) {
                        await deleteRole(deleteConfirm.itemToDelete.id!);
                        deleteConfirm.closeConfirm();
                    }
                },
                confirmLabel: 'Delete',
                confirmClassName: 'button-danger',
                cancelLabel: 'Cancel',
            })}
        </>
    );
};

export default AdminRolesTableAgGrid;