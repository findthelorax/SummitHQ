import React, { useMemo, useState } from 'react';

// AG Grid
import { EntityTableAgGrid } from '../aggrid/TableSkeleton';

// Types & Enums
import type { LiftRow, LiftsTableAgGridProps } from '../../utils/AgGrid/tableTypes';
import { LIFT_TYPE_LABELS, STATUS_LABELS, getEnumLabel } from '../../types/generated-enums';

// Contexts & Hooks
import { useAreas } from '../../hooks/useAreas';
import { useConfirmDialog } from '../../utils/AgGrid/hooks/useConfirmDialog';
import { useSnackbarContext } from '../../contexts/SnackbarContext';

// Utils & Helpers
import { createEditableCell } from '../../utils/common/createEditableCell';
import { mapLiftToRow } from '../../utils/AgGrid/mapToRow';
import { liftRowToInputPayload } from '../../utils/AgGrid/InputPayloadConversion';
import { getEmptyNewLiftRow } from '../../utils/AgGrid/rowFactories';
import { areaValueFormatter, placeholderFormatter } from '../../utils/common/formatData';
import { generateActionCellRendererParams } from '../../utils/common/getActionButtonParams';

// Components
import ActionButtons from '../buttons/ActionButtons';
import { StatusDropdown, StatusToggleButton } from '../buttons/StatusControl';
import NumberOnlyCellEditor from '../../utils/common/NumberOnlyCellEditor';

const AdminLiftsTableAgGrid: React.FC<LiftsTableAgGridProps> = ({
	lifts,
	fetchLifts,
	isLoading,
	updateLift,
	deleteLift,
	onEditLift,
	onAddLift,
	mountainId,
	mountainName,
}) => {
	const [newLiftRow, setNewLiftRow] = useState<LiftRow>(getEmptyNewLiftRow());
	const { areas } = useAreas(mountainId);
	const [editingRowId, setEditingRowId] = useState<string | null>(null);

	const {
		confirmOpen,
		itemToDelete: liftToDelete,
		requestConfirm,
		closeConfirm,
	} = useConfirmDialog<{ id: string; name: string }>();

	const { showSnackbar } = useSnackbarContext();

	const editableCell = (field: keyof LiftRow) =>
		createEditableCell<LiftRow>(field, {
			selectOptions:
				field === 'type'
					? Object.keys(LIFT_TYPE_LABELS)
					: field === 'status'
					? Object.keys(STATUS_LABELS)
					: field === 'areaId'
					? ['', ...areas.map((a) => a.id)]
					: undefined,
			numberEditor: field === 'capacity',
			getRowState: () => newLiftRow,
			setRowState: setNewLiftRow,
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
				minWidth: 100,
				flex: 1,
				sort: 'asc',
				valueFormatter: withPlaceholder(),
				...editableCell('name'),
			},
			{
				headerName: 'Status',
				field: 'status',
				cellRenderer: 'statusToggleButton',
				cellRendererParams: (params: any) => ({
					value: params.value,
					data: params.data,
					type: 'lift',
					onStatusChange: fetchLifts,
				}),
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
				valueFormatter: areaValueFormatter(areas, mountainName),
				...editableCell('areaId'),
			},
			{
				headerName: 'Type',
				field: 'type',
				valueFormatter: (params: any) => getEnumLabel(params.value, LIFT_TYPE_LABELS),
				minWidth: 100,
				flex: 1,
				...editableCell('type'),
			},
			{
				headerName: 'Capacity',
				field: 'capacity',
				minWidth: 100,
				flex: 1,
				...editableCell('capacity'),
			},
			{
				headerName: 'Latitude',
				field: 'latitude',
				valueFormatter: withPlaceholder((params: any) =>
					params.value !== undefined && params.value !== null ? params.value.toString() : '-'
				),
				minWidth: 100,
				flex: 1,
				...editableCell('latitude'),
			},
			{
				headerName: 'Longitude',
				field: 'longitude',
				valueFormatter: withPlaceholder((params: any) =>
					params.value !== undefined && params.value !== null ? params.value.toString() : '-'
				),
				minWidth: 100,
				flex: 1,
				...editableCell('longitude'),
			},
			{
				headerName: 'Actions',
				cellRenderer: ActionButtons,
				cellRendererParams: generateActionCellRendererParams<LiftRow>(
					editingRowId,
					newLiftRow,
					setNewLiftRow,
					onAddLift
						? (row: LiftRow) => {
								return onAddLift(liftRowToInputPayload(row));
						  }
						: undefined,
					(row: LiftRow) => {
						setNewLiftRow({ ...row });
						setEditingRowId(row.id ?? '');
					},
					async (row: LiftRow) => {
						const updateRow = {
							...newLiftRow,
						};
						await updateLift(row.id ?? '', updateRow);
						setEditingRowId(null);
						setNewLiftRow(getEmptyNewLiftRow());
					},
					() => {
						setEditingRowId(null);
						setNewLiftRow(getEmptyNewLiftRow());
					},
					(row: LiftRow) => {
						const lift = lifts.find((l) => l.id === row.id);
						if (lift) requestConfirm(lift);
					},
					fetchLifts,
					(msg: string, type?: string) =>
						showSnackbar(msg, (type as 'success' | 'error' | 'info' | 'warning') ?? 'info'),
					getEmptyNewLiftRow,
					['name', 'status', 'type', 'capacity']
				),
				minWidth: 120,
				pinned: 'right',
				suppressSizeToFit: true,
			},
		],
		[
			fetchLifts,
			onAddLift,
			mountainName,
			editingRowId,
			updateLift,
			newLiftRow,
			setNewLiftRow,
			areas,
			lifts,
			requestConfirm,
			showSnackbar,
		]
	);

	return (
		<EntityTableAgGrid
			entityName="lift"
			entities={lifts}
			fetchEntities={fetchLifts}
			isLoading={isLoading}
			updateEntity={updateLift}
			deleteEntity={deleteLift}
			onAddEntity={onAddLift}
			mountainId={mountainId}
			mountainName={mountainName}
			areas={areas}
			getEmptyNewRow={getEmptyNewLiftRow}
			mapToRow={mapLiftToRow}
			inputPayloadConverter={liftRowToInputPayload}
			columnDefs={columnDefs}
			requiredFields={['name', 'status', 'type', 'capacity']}
			specialCellRenderers={{
				StatusDropdown,
				statusToggleButton: StatusToggleButton,
				ActionButtons,
				NumberOnlyCellEditor,
			}}
			editingRowId={editingRowId}
			setEditingRowId={setEditingRowId}
			agGridContext={{
				editingRowId,
				updateEntity: async (id: string, update: Partial<LiftRow>) => {
					await updateLift(id, update);
				},
				fetchEntities: fetchLifts,
			}}
			confirmOpen={confirmOpen}
			confirmTitle="Delete Lift"
			confirmMessage={`Are you sure you want to delete "${liftToDelete?.name}"?`}
			onConfirmDelete={async () => {
				if (liftToDelete) {
					await deleteLift(liftToDelete.id);
					closeConfirm();
				}
			}}
			onCancelDelete={closeConfirm}
		/>
	);
};

export default AdminLiftsTableAgGrid;
