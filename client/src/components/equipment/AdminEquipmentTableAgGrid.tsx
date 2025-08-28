import React, { useMemo, useState } from 'react';

// AG Grid
import { EntityTableAgGrid } from '../aggrid/TableSkeleton';

// Types & Enums
import type { EquipmentRow, EquipmentTableAgGridProps } from '../../utils/AgGrid/tableTypes';
import { EQUIPMENT_STATUS_LABELS } from '../../types/generated-enums';
import { EquipmentWithLocation } from '../../types/index';

// Contexts & Hooks
import { useSnackbarContext } from '../../contexts/SnackbarContext';
import { useConfirmDialog } from '../../utils/AgGrid/hooks/useConfirmDialog';
import { useMountain } from '../../contexts/MountainContext';
import { useLocations } from '../../hooks/useLocations';
import { useAreas } from '../../hooks/useAreas';

// Utils & Helpers
import { createEditableCell } from '../../utils/common/createEditableCell';
import { placeholderFormatter, areaValueFormatter } from '../../utils/common/formatData';
import { mapEquipmentToRow } from '../../utils/AgGrid/mapToRow';
import { equipmentRowToInputPayload } from '../../utils/AgGrid/InputPayloadConversion';
import { getEmptyNewEquipmentRow } from '../../utils/AgGrid/rowFactories';
import { generateActionCellRendererParams } from '../../utils/common/getActionButtonParams';

// Components
import ActionButtons from '../buttons/ActionButtons';
import { LocationGroupCellEditor } from '../../utils/AgGrid/LocationGroupCellEditor';

function normalizeEquipmentUpdate(update: Partial<EquipmentRow>): Partial<EquipmentRow> {
	return {
		...update,
		number: update.number === null ? undefined : update.number,
		description: update.description === null ? undefined : update.description,
		picture: update.picture === null ? undefined : update.picture,
		cost: update.cost === null ? undefined : update.cost,
		latitude: update.latitude === null ? undefined : update.latitude,
		longitude: update.longitude === null ? undefined : update.longitude,
		mountainId: update.mountainId === null ? undefined : update.mountainId,
		locationId: update.locationId === null ? undefined : update.locationId,
		dateAdded: update.dateAdded === null ? undefined : update.dateAdded,
	};
}

const AdminEquipmentTableAgGrid: React.FC<EquipmentTableAgGridProps> = ({
	equipment,
	fetchAllEquipment,
	isLoadingEquipment,
	updateEquipment,
	deleteEquipment,
	onAddEquipment,
	onEditEquipment,
	mountainId,
	mountainName,
}) => {
	const [addEquipmentRow, setAddEquipmentRow] = useState<EquipmentRow>(getEmptyNewEquipmentRow());
	const [editEquipmentRow, setEditEquipmentRow] = useState<EquipmentRow>(getEmptyNewEquipmentRow());
	const [editingRowId, setEditingRowId] = useState<string | null>(null);
	const [deleting, setDeleting] = useState(false);
	const [addRowResetKey, setAddRowResetKey] = useState(0);

	const { mountains } = useMountain?.() ?? { mountains: [] };
	const { areas } = useAreas(mountainId);
	const { locations } = useLocations(mountainId);

	const {
		confirmOpen,
		itemToDelete: equipmentToDelete,
		requestConfirm,
		closeConfirm,
	} = useConfirmDialog<{ id: string; name: string }>();

	const { showSnackbar } = useSnackbarContext();
	const setRowState = (row: any, params: any) => {
		if (params.data?.isNew) setAddEquipmentRow(row);
		else if (params.data?.id === editingRowId) setEditEquipmentRow(row);
	};

	const sortedLocations = useMemo(() => {
		if (!locations) return [];
		return [...locations].sort((a, b) => {
			if (a.entityType === b.entityType) {
				return a.name.localeCompare(b.name);
			}
			return a.entityType.localeCompare(b.entityType);
		});
	}, [locations]);

	const editableCell = (field: keyof EquipmentRow) =>
		createEditableCell<EquipmentRow>(field, {
			selectOptions:
				field === 'mountainId'
					? ['', ...(mountains?.map((m) => m.id) ?? [])]
					: field === 'areaId'
					? ['', ...(areas?.map((a) => a.id) ?? [])]
					: field === 'locationId'
					? ['', ...sortedLocations.map((l) => l.id)]
					: field === 'status'
					? Object.keys(EQUIPMENT_STATUS_LABELS)
					: undefined,
			numberEditor: field === 'cost' || field === 'number',
			getRowState: (params) => {
				if (params.data?.isNew) return addEquipmentRow;
				if (params.data?.id === editingRowId) return editEquipmentRow;
				return getEmptyNewEquipmentRow();
			},
			setRowState: (updater, params) => {
				if (params.data?.isNew) setAddEquipmentRow(updater);
				else if (params.data?.id === editingRowId) setEditEquipmentRow(updater);
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
				headerName: 'Type',
				field: 'type',
				valueFormatter: withPlaceholder(),
				...editableCell('type'),
			},
			{
				headerName: 'Number',
				field: 'number',
				valueFormatter: withPlaceholder((params: any) =>
					params.value !== undefined && params.value !== null ? params.value.toString() : '0'
				),
				...editableCell('number'),
			},
			{
				headerName: 'Description',
				field: 'description',
				flex: 1,
				valueFormatter: withPlaceholder(),
				...editableCell('description'),
			},
			{
				headerName: 'Status',
				field: 'status',
				valueFormatter: (params: any) =>
					params.value ? EQUIPMENT_STATUS_LABELS[params.value as keyof typeof EQUIPMENT_STATUS_LABELS] : '-',
				...editableCell('status'),
			},
			{
				headerName: 'Cost',
				field: 'cost',
				valueFormatter: withPlaceholder((params: any) =>
					params.value !== undefined && params.value !== null ? params.value.toString() : '-'
				),
				...editableCell('cost'),
			},
			{
				headerName: 'Mountain',
				field: 'mountainId',
				valueFormatter: (params: any) => {
					const m = mountains?.find((m) => m.id === params.value);
					return m ? m.name : 'None';
				},
				...editableCell('mountainId'),
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
				headerName: 'Location',
				field: 'locationId',
				flex: 1,
				valueFormatter: (params: any) => {
					const l = sortedLocations.find((l) => l.id === params.value);
					return l ? `${l.entityType}: ${l.name}` : 'None';
				},
				cellEditor: 'locationGroupCellEditor',
				cellEditorParams: {
					locations: sortedLocations,
				},
				editable: (params: any) => params.data?.isNew || params.data?.id === editingRowId,
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
				cellRendererParams: generateActionCellRendererParams<EquipmentRow>(
					editingRowId,
					addEquipmentRow,
					setAddEquipmentRow,
					onEditEquipment
						? async (row: EquipmentRow) => {
								onEditEquipment({
									...row,
									dateAdded:
										row.dateAdded instanceof Date ? row.dateAdded.toISOString() : row.dateAdded,
								} as EquipmentWithLocation);
						  }
						: undefined,
					(row: EquipmentRow) => {
						setEditEquipmentRow({ ...row });
						setEditingRowId(row.id ?? '');
					},
					async (row: EquipmentRow) => {
						const fixedUpdate = equipmentRowToInputPayload(normalizeEquipmentUpdate(row) as EquipmentRow);
						await updateEquipment?.(row.id ?? '', fixedUpdate);
						setEditingRowId(null);
						setEditEquipmentRow(getEmptyNewEquipmentRow());
					},
					() => {
						setEditingRowId(null);
						setEditEquipmentRow(getEmptyNewEquipmentRow());
						setAddEquipmentRow(getEmptyNewEquipmentRow());
						setAddRowResetKey((k) => k + 1);
					},
					(row: EquipmentRow) => {
						const eq = equipment.find((e) => e.id === row.id);
						if (eq) requestConfirm(eq);
					},
					fetchAllEquipment,
					(msg: string, type?: string) =>
						showSnackbar(msg, (type as 'success' | 'error' | 'info' | 'warning') ?? 'info'),
					getEmptyNewEquipmentRow,
					['name', 'type', 'status']
				),
				minWidth: 120,
				pinned: 'right',
				suppressSizeToFit: true,
			},
		],
		[
			fetchAllEquipment,
			onEditEquipment,
			deleteEquipment,
			editingRowId,
			addEquipmentRow,
			setAddEquipmentRow,
			editEquipmentRow,
			setEditEquipmentRow,
			mountains,
			areas,
			locations,
			equipment,
			requestConfirm,
			showSnackbar,
		]
	);

	return (
		<EntityTableAgGrid
			entityName="equipment"
			entities={equipment}
			fetchEntities={fetchAllEquipment}
			isLoading={deleting || isLoadingEquipment}
			updateEntity={updateEquipment}
			deleteEntity={deleteEquipment}
			onAddEntity={onAddEquipment}
			mountainId={mountainId}
			mountainName={mountainName}
			getEmptyNewRow={getEmptyNewEquipmentRow}
			mapToRow={mapEquipmentToRow}
			inputPayloadConverter={equipmentRowToInputPayload}
			columnDefs={columnDefs}
			requiredFields={['name', 'status']}
			components={{
				ActionButtons,
				locationGroupCellEditor: LocationGroupCellEditor,
			}}
			editingRowId={editingRowId}
			setEditingRowId={setEditingRowId}
			agGridContext={{
				editingRowId,
				updateEntity: async (id: string, update: Partial<EquipmentRow>) => {
					const fixedUpdate = equipmentRowToInputPayload(normalizeEquipmentUpdate(update) as EquipmentRow);
					await updateEquipment?.(id, fixedUpdate);
				},
				fetchEntities: fetchAllEquipment,
				setRowState: (row: any, params: any) => setRowState(row, params),
			}}
			confirmOpen={confirmOpen}
			confirmTitle="Delete Equipment"
			confirmMessage={`Are you sure you want to delete "${equipmentToDelete?.name}"?`}
			onConfirmDelete={async () => {
				if (equipmentToDelete && deleteEquipment) {
					setDeleting(true);
					try {
						await deleteEquipment(equipmentToDelete.id);
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
			newRow={addEquipmentRow}
			setNewRow={setAddEquipmentRow}
			key={addRowResetKey}
			loadingMessage={deleting ? `Deleting "${equipmentToDelete?.name}"...` : undefined}
		/>
	);
};

export default AdminEquipmentTableAgGrid;
