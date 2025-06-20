import React, { useMemo, useState } from 'react';

// AG Grid
import { EntityTableAgGrid } from '../aggrid/TableSkeleton';

// Types & Enums
import type { LodgeRow, LodgesTableAgGridProps } from '../../utils/AgGrid/tableTypes';
import { STATUS_LABELS, getEnumLabel } from '../../types/generated-enums';

// Contexts & Hooks
import { useAreas } from '../../hooks/useAreas';
import { useConfirmDialog } from '../../utils/AgGrid/hooks/useConfirmDialog';
import { useSnackbarContext } from '../../contexts/SnackbarContext';

// Utils & Helpers
import { createEditableCell } from '../../utils/common/createEditableCell';
import { mapLodgeToRow } from '../../utils/AgGrid/mapToRow';
import { lodgeRowToInputPayload } from '../../utils/AgGrid/InputPayloadConversion';
import { getEmptyNewLodgeRow } from '../../utils/AgGrid/rowFactories';
import { areaValueFormatter, placeholderFormatter } from '../../utils/common/formatData';
import { generateActionCellRendererParams } from '../../utils/common/getActionButtonParams';

// Components
import ActionButtons from '../buttons/ActionButtons';
import { StatusToggleButton } from '../buttons/StatusControl';
const AdminLodgesTableAgGrid: React.FC<LodgesTableAgGridProps> = ({
    lodges,
    fetchLodges,
    isLoading,
    updateLodge,
    deleteLodge,
    onEditLodge,
    onAddLodge,
    mountainId,
    mountainName,
}) => {
    const [addLodgeRow, setAddLodgeRow] = useState<LodgeRow>(getEmptyNewLodgeRow());
    const [editLodgeRow, setEditLodgeRow] = useState<LodgeRow>(getEmptyNewLodgeRow());
    const { areas } = useAreas(mountainId);
    const [editingRowId, setEditingRowId] = useState<string | null>(null);
    const [deleting, setDeleting] = useState(false);

    const {
        confirmOpen,
        itemToDelete: lodgeToDelete,
        requestConfirm,
        closeConfirm,
    } = useConfirmDialog<{ id: string; name: string }>();

    const { showSnackbar } = useSnackbarContext();
    const setRowState = (row: any, params: any) => {
        if (params.data?.isNew) setAddLodgeRow(row);
        else if (params.data?.id === editingRowId) setEditLodgeRow(row);
    };

    const editableCell = (field: keyof LodgeRow) =>
        createEditableCell<LodgeRow>(field, {
            selectOptions:
                field === 'status'
                    ? Object.keys(STATUS_LABELS)
                    : field === 'areaId'
                    ? ['', ...areas.map((a) => a.id)]
                    : undefined,
            numberEditor: field === 'capacity',
            getRowState: (params) => {
                if (params.data?.isNew) return addLodgeRow;
                if (params.data?.id === editingRowId) return editLodgeRow;
                return getEmptyNewLodgeRow();
            },
            setRowState: (updater, params) => {
                if (params.data?.isNew) setAddLodgeRow(updater);
                else if (params.data?.id === editingRowId) setEditLodgeRow(updater);
            },
            alwaysEditable: field === 'status',
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
                headerName: 'Name',
                field: 'name',
                flex: 1,
                sort: 'asc',
                valueFormatter: withPlaceholder(),
                ...editableCell('name'),
            },
            {
                headerName: 'Status',
                field: 'status',
                cellRenderer: (params: any) => {
                    if (params.data?.isNew) {
                        if (typeof params.rowIndex === 'number') {
                            setTimeout(() => {
                                params.api.startEditingCell({
                                    rowIndex: params.rowIndex,
                                    colKey: params.column.getColId(),
                                });
                            }, 0);
                        }
                        return params.value
                            ? getEnumLabel(params.value, STATUS_LABELS)
                            : '';
                    }
                    return <StatusToggleButton
                        value={params.value}
                        data={params.data}
                        type="lodge"
                        onStatusChange={fetchLodges}
                    />;
                },
                cellRendererParams: (params: any) => ({
                    value: params.value,
                    data: params.data,
                    type: 'lodge',
                    onStatusChange: fetchLodges,
                }),
                cellEditorSelector: (params: any) => {
                    if (params.data?.isNew) {
                        return {
                            component: 'agSelectCellEditor',
                            params: { values: Object.keys(STATUS_LABELS) },
                        };
                    }
                    return null;
                },
                editable: (params: any) => params.data?.isNew || params.data?.id === editingRowId,
                cellStyle: { display: 'flex' },
                minWidth: 150,
                valueFormatter: withPlaceholder((params: any) => getEnumLabel(params.value, STATUS_LABELS)),
                ...editableCell('status'),
            },
            {
                headerName: 'Area',
                field: 'areaId',
                minWidth: 120,
                flex: 1,
                valueFormatter: (params: any) => {
                    if (!params.value) return 'None';
                    if (!areas || areas.length === 0) return '';
                    return areaValueFormatter(areas, mountainName)(params);
                },
                ...editableCell('areaId'),
            },
            {
                headerName: 'Capacity',
                field: 'capacity',
                minWidth: 100,
                flex: 1,
                valueFormatter: withPlaceholder((params: any) =>
                    params.value !== undefined && params.value !== null ? params.value.toString() : '-'
                ),
                ...editableCell('capacity'),
            },
            {
                headerName: 'Latitude',
                field: 'latitude',
                valueFormatter: withPlaceholder((params: any) =>
                    params.value !== undefined && params.value !== null ? params.value.toString() : '-'
                ),
                ...editableCell('latitude'),
            },
            {
                headerName: 'Longitude',
                field: 'longitude',
                valueFormatter: withPlaceholder((params: any) =>
                    params.value !== undefined && params.value !== null ? params.value.toString() : '-'
                ),
                ...editableCell('longitude'),
            },
            {
                headerName: 'Actions',
                cellRenderer: ActionButtons,
                cellRendererParams: generateActionCellRendererParams<LodgeRow>(
                    editingRowId,
                    addLodgeRow,
                    setAddLodgeRow,
                    onAddLodge
                        ? (row: LodgeRow) => onAddLodge(lodgeRowToInputPayload(row))
                        : undefined,
                    (row: LodgeRow) => {
                        setEditLodgeRow({ ...row });
                        setEditingRowId(row.id ?? '');
                    },
                    async (row: LodgeRow) => {
                        const updateRow = {
                            ...editLodgeRow,
                            capacity:
                                typeof editLodgeRow.capacity === 'number' && !isNaN(editLodgeRow.capacity)
                                    ? editLodgeRow.capacity
                                    : 0,
                        };
                        await updateLodge(row.id ?? '', updateRow);
                        setEditingRowId(null);
                        setEditLodgeRow(getEmptyNewLodgeRow());
                    },
                    () => {
                        setEditingRowId(null);
                        setEditLodgeRow(getEmptyNewLodgeRow());
                    },
                    (row: LodgeRow) => {
                        const lodge = lodges.find((l) => l.id === row.id);
                        if (lodge) requestConfirm(lodge);
                    },
                    fetchLodges,
                    (msg: string, type?: string) =>
                        showSnackbar(msg, (type as 'success' | 'error' | 'info' | 'warning') ?? 'info'),
                    getEmptyNewLodgeRow,
                    ['name', 'status', 'capacity']
                ),
                minWidth: 120,
                pinned: 'right',
                suppressSizeToFit: true,
            },
        ],
        [
            fetchLodges,
            onAddLodge,
            mountainName,
            editingRowId,
            updateLodge,
            addLodgeRow,
            setAddLodgeRow,
            editLodgeRow,
            setEditLodgeRow,
            areas,
            lodges,
            requestConfirm,
            showSnackbar,
        ]
    );

    return (
        <EntityTableAgGrid
            entityName="lodge"
            entities={lodges}
            fetchEntities={fetchLodges}
            isLoading={deleting || isLoading}
            updateEntity={updateLodge}
            deleteEntity={deleteLodge}
            onAddEntity={onAddLodge}
            mountainId={mountainId}
            mountainName={mountainName}
            areas={areas}
            getEmptyNewRow={getEmptyNewLodgeRow}
            mapToRow={mapLodgeToRow}
            inputPayloadConverter={lodgeRowToInputPayload}
            columnDefs={columnDefs}
            requiredFields={['name', 'status', 'capacity']}
            specialCellRenderers={{ statusToggleButton: StatusToggleButton, ActionButtons }}
            editingRowId={editingRowId}
            setEditingRowId={setEditingRowId}
            agGridContext={{
                editingRowId,
                updateEntity: async (id: string, update: Partial<LodgeRow>) => {
                    const { capacity, ...rest } = update;
                    const updateRow = {
                        ...rest,
                        capacity: capacity === null ? undefined : capacity,
                    };
                    await updateLodge(id, updateRow);
                },
                fetchEntities: fetchLodges,
                setRowState: (row: any, params: any) => setRowState(row, params),
            }}
            confirmOpen={confirmOpen}
            confirmTitle="Delete Lodge"
            confirmMessage={`Are you sure you want to delete "${lodgeToDelete?.name}"?`}
            onConfirmDelete={async () => {
                if (lodgeToDelete) {
                    setDeleting(true);
                    try {
                        await deleteLodge(lodgeToDelete.id);
                    } finally {
                        setDeleting(false);
                        closeConfirm();
                    }
                }
            }}
            onCancelDelete={() => {
                setDeleting(false);
                closeConfirm();
            }}
            newRow={addLodgeRow}
            setNewRow={setAddLodgeRow}
            loadingMessage={deleting ? `Deleting "${lodgeToDelete?.name}"...` : undefined}
        />
    );
};

export default AdminLodgesTableAgGrid;