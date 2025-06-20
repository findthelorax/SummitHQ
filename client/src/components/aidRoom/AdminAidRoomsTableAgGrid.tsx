import React, { useMemo, useState } from 'react';

// AG Grid
import { EntityTableAgGrid } from '../aggrid/TableSkeleton';

// Types & Enums
import type { AidRoomRow, AidRoomsTableAgGridProps } from '../../utils/AgGrid/tableTypes';
import { STATUS_LABELS, getEnumLabel } from '../../types/generated-enums';

// Contexts & Hooks
import { useAreas } from '../../hooks/useAreas';
import { useConfirmDialog } from '../../utils/AgGrid/hooks/useConfirmDialog';
import { useSnackbarContext } from '../../contexts/SnackbarContext';

// Utils & Helpers
import { createEditableCell } from '../../utils/common/createEditableCell';
import { mapAidRoomToRow } from '../../utils/AgGrid/mapToRow';
import { aidRoomRowToInputPayload } from '../../utils/AgGrid/InputPayloadConversion';
import { getEmptyNewAidRoomRow } from '../../utils/AgGrid/rowFactories';
import { placeholderFormatter, areaValueFormatter } from '../../utils/common/formatData';
import { generateActionCellRendererParams } from '../../utils/common/getActionButtonParams';

// Components
import ActionButtons from '../buttons/ActionButtons';
import { StatusToggleButton } from '../buttons/StatusControl';

const AdminAidRoomsTableAgGrid: React.FC<AidRoomsTableAgGridProps> = ({
    aidRooms,
    fetchAidRooms,
    isLoading,
    updateAidRoom,
    deleteAidRoom,
    onEditAidRoom,
    onAddAidRoom,
    mountainId,
    mountainName,
}) => {
    const [addAidRoomRow, setAddAidRoomRow] = useState<AidRoomRow>(getEmptyNewAidRoomRow());
    const [editAidRoomRow, setEditAidRoomRow] = useState<AidRoomRow>(getEmptyNewAidRoomRow());
    const { areas } = useAreas(mountainId);
    const [editingRowId, setEditingRowId] = useState<string | null>(null);
    const [deleting, setDeleting] = useState(false);

    const {
        confirmOpen,
        itemToDelete: aidRoomToDelete,
        requestConfirm,
        closeConfirm,
    } = useConfirmDialog<{ id: string; name: string }>();

    const { showSnackbar } = useSnackbarContext();
    const setRowState = (row: any, params: any) => {
        if (params.data?.isNew) setAddAidRoomRow(row);
        else if (params.data?.id === editingRowId) setEditAidRoomRow(row);
    };

    const editableCell = (field: keyof AidRoomRow) =>
        createEditableCell<AidRoomRow>(field, {
            selectOptions:
                field === 'status'
                    ? Object.keys(STATUS_LABELS)
                    : field === 'areaId'
                    ? ['', ...areas.map((a) => a.id)]
                    : undefined,
            getRowState: (params) => {
                if (params.data?.isNew) return addAidRoomRow;
                if (params.data?.id === editingRowId) return editAidRoomRow;
                return getEmptyNewAidRoomRow();
            },
            setRowState: (updater, params) => {
                if (params.data?.isNew) setAddAidRoomRow(updater);
                else if (params.data?.id === editingRowId) setEditAidRoomRow(updater);
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
                        type="aidRoom"
                        onStatusChange={fetchAidRooms}
                    />;
                },
                cellRendererParams: (params: any) => ({
                    value: params.value,
                    data: params.data,
                    type: 'aidRoom',
                    onStatusChange: fetchAidRooms,
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
                cellRendererParams: generateActionCellRendererParams<AidRoomRow>(
                    editingRowId,
                    addAidRoomRow,
                    setAddAidRoomRow,
                    onAddAidRoom
                        ? (row: AidRoomRow) => onAddAidRoom(aidRoomRowToInputPayload(row))
                        : undefined,
                    (row: AidRoomRow) => {
                        setEditAidRoomRow({ ...row });
                        setEditingRowId(row.id ?? '');
                    },
                    async (row: AidRoomRow) => {
                        const updateRow = {
                            ...editAidRoomRow,
                        };
                        await updateAidRoom(row.id ?? '', updateRow);
                        setEditingRowId(null);
                        setEditAidRoomRow(getEmptyNewAidRoomRow());
                    },
                    () => {
                        setEditingRowId(null);
                        setEditAidRoomRow(getEmptyNewAidRoomRow());
                    },
                    (row: AidRoomRow) => {
                        const aidRoom = aidRooms.find((a) => a.id === row.id);
                        if (aidRoom) requestConfirm(aidRoom);
                    },
                    fetchAidRooms,
                    (msg: string, type?: string) =>
                        showSnackbar(msg, (type as 'success' | 'error' | 'info' | 'warning') ?? 'info'),
                    getEmptyNewAidRoomRow,
                    ['name', 'status']
                ),
                minWidth: 120,
                pinned: 'right',
                suppressSizeToFit: true,
            },
        ],
        [
            fetchAidRooms,
            onAddAidRoom,
            mountainName,
            editingRowId,
            updateAidRoom,
            addAidRoomRow,
            setAddAidRoomRow,
            editAidRoomRow,
            setEditAidRoomRow,
            areas,
            aidRooms,
            requestConfirm,
            showSnackbar,
        ]
    );

    return (
        <EntityTableAgGrid
            entityName="aidRoom"
            entities={aidRooms}
            fetchEntities={fetchAidRooms}
            isLoading={deleting || isLoading}
            updateEntity={updateAidRoom}
            deleteEntity={deleteAidRoom}
            onAddEntity={onAddAidRoom}
            mountainId={mountainId}
            mountainName={mountainName}
            areas={areas}
            getEmptyNewRow={getEmptyNewAidRoomRow}
            mapToRow={mapAidRoomToRow}
            inputPayloadConverter={aidRoomRowToInputPayload}
            columnDefs={columnDefs}
            requiredFields={['name', 'status']}
            specialCellRenderers={{ statusToggleButton: StatusToggleButton, ActionButtons }}
            editingRowId={editingRowId}
            setEditingRowId={setEditingRowId}
            agGridContext={{
                editingRowId,
                updateEntity: async (id: string, update: Partial<AidRoomRow>) => {
                    await updateAidRoom(id, update);
                },
                fetchEntities: fetchAidRooms,
                setRowState: (row: any, params: any) => setRowState(row, params),
            }}
            confirmOpen={confirmOpen}
            confirmTitle="Delete Aid Room"
            confirmMessage={`Are you sure you want to delete "${aidRoomToDelete?.name}"?`}
            onConfirmDelete={async () => {
                if (aidRoomToDelete) {
                    setDeleting(true);
                    try {
                        await deleteAidRoom(aidRoomToDelete.id);
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
            newRow={addAidRoomRow}
            setNewRow={setAddAidRoomRow}
            loadingMessage={deleting ? `Deleting "${aidRoomToDelete?.name}"...` : undefined}
        />
    );
};

export default AdminAidRoomsTableAgGrid;