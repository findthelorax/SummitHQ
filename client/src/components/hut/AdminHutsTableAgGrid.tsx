import React, { useMemo, useState } from 'react';

// AG Grid
import { EntityTableAgGrid } from '../aggrid/TableSkeleton';

// Types & Enums
import type { HutRow, HutsTableAgGridProps } from '../../utils/AgGrid/tableTypes';
import { STATUS_LABELS, getEnumLabel } from '../../types/generated-enums';

// Contexts & Hooks
import { useAreas } from '../../hooks/useAreas';
import { useConfirmDialog } from '../../utils/AgGrid/hooks/useConfirmDialog';
import { useSnackbarContext } from '../../contexts/SnackbarContext';

// Utils & Helpers
import { createEditableCell } from '../../utils/common/createEditableCell';
import { mapHutToRow } from '../../utils/AgGrid/mapToRow';
import { hutRowToInputPayload } from '../../utils/AgGrid/InputPayloadConversion';
import { getEmptyNewHutRow } from '../../utils/AgGrid/rowFactories';
import { placeholderFormatter, areaValueFormatter } from '../../utils/common/formatData';
import { generateActionCellRendererParams } from '../../utils/common/getActionButtonParams';

// Components
import ActionButtons from '../buttons/ActionButtons';
import { StatusToggleButton } from '../buttons/StatusControl';

const AdminHutsTableAgGrid: React.FC<HutsTableAgGridProps> = ({
    huts,
    fetchHuts,
    isLoading,
    updateHut,
    deleteHut,
    onEditHut,
    onAddHut,
    mountainId,
    mountainName,
}) => {
    const [addHutRow, setAddHutRow] = useState<HutRow>(getEmptyNewHutRow());
    const [editHutRow, setEditHutRow] = useState<HutRow>(getEmptyNewHutRow());
    const { areas } = useAreas(mountainId);
    const [editingRowId, setEditingRowId] = useState<string | null>(null);
    const [deleting, setDeleting] = useState(false);

    const {
        confirmOpen,
        itemToDelete: hutToDelete,
        requestConfirm,
        closeConfirm,
    } = useConfirmDialog<{ id: string; name: string }>();

    const { showSnackbar } = useSnackbarContext();
    const setRowState = (row: any, params: any) => {
        if (params.data?.isNew) setAddHutRow(row);
        else if (params.data?.id === editingRowId) setEditHutRow(row);
    };

    const editableCell = (field: keyof HutRow) =>
        createEditableCell<HutRow>(field, {
            selectOptions:
                field === 'status'
                    ? Object.keys(STATUS_LABELS)
                    : field === 'areaId'
                    ? ['', ...areas.map((a) => a.id)]
                    : undefined,
            getRowState: (params) => {
                if (params.data?.isNew) return addHutRow;
                if (params.data?.id === editingRowId) return editHutRow;
                return getEmptyNewHutRow();
            },
            setRowState: (updater, params) => {
                if (params.data?.isNew) setAddHutRow(updater);
                else if (params.data?.id === editingRowId) setEditHutRow(updater);
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
                        type="hut"
                        onStatusChange={fetchHuts}
                    />;
                },
                cellRendererParams: (params: any) => ({
                    value: params.value,
                    data: params.data,
                    type: 'hut',
                    onStatusChange: fetchHuts,
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
                cellRendererParams: generateActionCellRendererParams<HutRow>(
                    editingRowId,
                    addHutRow,
                    setAddHutRow,
                    onAddHut
                        ? (row: HutRow) => onAddHut(hutRowToInputPayload(row))
                        : undefined,
                    (row: HutRow) => {
                        setEditHutRow({ ...row });
                        setEditingRowId(row.id ?? '');
                    },
                    async (row: HutRow) => {
                        const updateRow = {
                            ...editHutRow,
                        };
                        await updateHut(row.id ?? '', updateRow);
                        setEditingRowId(null);
                        setEditHutRow(getEmptyNewHutRow());
                    },
                    () => {
                        setEditingRowId(null);
                        setEditHutRow(getEmptyNewHutRow());
                    },
                    (row: HutRow) => {
                        const hut = huts.find((h) => h.id === row.id);
                        if (hut) requestConfirm(hut);
                    },
                    fetchHuts,
                    (msg: string, type?: string) =>
                        showSnackbar(msg, (type as 'success' | 'error' | 'info' | 'warning') ?? 'info'),
                    getEmptyNewHutRow,
                    ['name', 'status']
                ),
                minWidth: 120,
                pinned: 'right',
                suppressSizeToFit: true,
            },
        ],
        [
            fetchHuts,
            onAddHut,
            mountainName,
            editingRowId,
            updateHut,
            addHutRow,
            setAddHutRow,
            editHutRow,
            setEditHutRow,
            areas,
            huts,
            requestConfirm,
            showSnackbar,
        ]
    );

    return (
        <EntityTableAgGrid
            entityName="hut"
            entities={huts}
            fetchEntities={fetchHuts}
            isLoading={deleting || isLoading}
            updateEntity={updateHut}
            deleteEntity={deleteHut}
            onAddEntity={onAddHut}
            mountainId={mountainId}
            mountainName={mountainName}
            areas={areas}
            getEmptyNewRow={getEmptyNewHutRow}
            mapToRow={mapHutToRow}
            inputPayloadConverter={hutRowToInputPayload}
            columnDefs={columnDefs}
            requiredFields={['name', 'status']}
            specialCellRenderers={{ statusToggleButton: StatusToggleButton, ActionButtons }}
            editingRowId={editingRowId}
            setEditingRowId={setEditingRowId}
            agGridContext={{
                editingRowId,
                updateEntity: async (id: string, update: Partial<HutRow>) => {
                    await updateHut(id, update);
                },
                fetchEntities: fetchHuts,
                setRowState: (row: any, params: any) => setRowState(row, params),
            }}
            confirmOpen={confirmOpen}
            confirmTitle="Delete Hut"
            confirmMessage={`Are you sure you want to delete "${hutToDelete?.name}"?`}
            onConfirmDelete={async () => {
                if (hutToDelete) {
                    setDeleting(true);
                    try {
                        await deleteHut(hutToDelete.id);
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
            newRow={addHutRow}
            setNewRow={setAddHutRow}
            loadingMessage={deleting ? `Deleting "${hutToDelete?.name}"...` : undefined}
        />
    );
};

export default AdminHutsTableAgGrid;