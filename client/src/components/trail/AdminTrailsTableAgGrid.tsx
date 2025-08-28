import React, { useMemo, useState } from 'react';

// AG Grid
import { EntityTableAgGrid } from '../aggrid/TableSkeleton';

// Types & Enums
import type { TrailRow, TrailsTableAgGridProps } from '../../utils/AgGrid/tableTypes';
import {
    STATUS,
    TRAIL_CONDITION_LABELS,
    TRAIL_DIFFICULTY_LABELS,
    STATUS_LABELS,
    getEnumLabel,
} from '../../types/generated-enums';

// Contexts & Hooks
import { useSnackbarContext } from '../../contexts/SnackbarContext';
import { useGridConfirm } from '../../utils/AgGrid/hooks/useGridConfirm';
import { useAreas } from '../../hooks/useAreas';

// Utils & Helpers
import { createEditableCell } from '../../utils/common/createEditableCell';
import { placeholderFormatter, areaValueFormatter } from '../../utils/common/formatData';
import { generateActionCellRendererParams } from '../../utils/common/getActionButtonParams';
import { getEmptyNewTrailRow } from '../../utils/AgGrid/rowFactories';
import { mapTrailToRow } from '../../utils/AgGrid/mapToRow';
import { trailRowToInputPayload } from '../../utils/AgGrid/InputPayloadConversion';

// Components
import ActionButtons from '../buttons/ActionButtons';
import StatusHeader from '../aggrid/StatusHeader';
import { StatusToggleButton } from '../buttons/StatusControl';
import { ConditionCellRenderer } from '../../utils/AgGrid/ConditionCellRenderer';

const AdminTrailsTableAgGrid: React.FC<TrailsTableAgGridProps> = ({
	trails,
	fetchTrails,
	isLoading,
	updateTrail,
	deleteTrail,
	onEditTrail,
	onAddTrail,
	mountainId,
	mountainName,
}) => {
	const [addTrailRow, setAddTrailRow] = useState<TrailRow>(getEmptyNewTrailRow());
	const [editTrailRow, setEditTrailRow] = useState<TrailRow>(getEmptyNewTrailRow());
	const { areas } = useAreas(mountainId);
	const [editingRowId, setEditingRowId] = useState<string | null>(null);
	const [deleting, setDeleting] = useState(false);

	// Use the generic confirmation hook for each dialog
	const deleteConfirm = useGridConfirm<{ id: string; name: string }>();
	const openAllConfirm = useGridConfirm();
	const closeAllConfirm = useGridConfirm();

	const { showSnackbar } = useSnackbarContext();

	const setRowState = (row: any, params: any) => {
		if (params.data?.isNew) setAddTrailRow(row);
		else if (params.data?.id === editingRowId) setEditTrailRow(row);
	};

	const editableCell = (field: keyof TrailRow) =>
		createEditableCell<TrailRow>(field, {
			selectOptions:
				field === 'difficulty'
					? Object.keys(TRAIL_DIFFICULTY_LABELS)
					: field === 'status'
					? Object.keys(STATUS_LABELS)
					: field === 'condition'
					? Object.keys(TRAIL_CONDITION_LABELS)
					: field === 'areaId'
					? ['', ...areas.map((a) => a.id)]
					: undefined,
			numberEditor: field === 'length',
			getRowState: (params) => {
				if (params.data?.isNew) return addTrailRow;
				if (params.data?.id === editingRowId) return editTrailRow;
				return getEmptyNewTrailRow();
			},
			setRowState: (updater, params) => {
				if (params.data?.isNew) setAddTrailRow(updater);
				else if (params.data?.id === editingRowId) setEditTrailRow(updater);
			},
			alwaysEditable: field === 'status',
			editable: (params: any) => params.data?.isNew || params.data?.id === editingRowId,
		});

	const withPlaceholder = (formatter?: (params: any) => string) => (params: any) => {
		const placeholder = placeholderFormatter(params);
		if (placeholder !== params.value) return placeholder;
		return formatter ? formatter(params) : params.value;
	};

	const handleOpenAll = () => {
		openAllConfirm.requestConfirm(undefined);
	};

	const handleCloseAll = () => {
		closeAllConfirm.requestConfirm(undefined);
	};

	const doOpenAll = async () => {
		try {
			await Promise.all(
				trails
					.filter((trail) => trail.status !== STATUS.OPEN)
					.map((trail) => updateTrail(trail.id, { ...trail, status: STATUS.OPEN }))
			);
			showSnackbar('All trails opened.', 'success');
			fetchTrails();
		} catch (err) {
			showSnackbar('Failed to open all trails.', 'error');
		} finally {
			openAllConfirm.closeConfirm();
		}
	};

	const doCloseAll = async () => {
		try {
			await Promise.all(
				trails
					.filter((trail) => trail.status !== STATUS.CLOSED)
					.map((trail) => updateTrail(trail.id, { ...trail, status: STATUS.CLOSED }))
			);
			showSnackbar('All trails closed.', 'success');
			fetchTrails();
		} catch (err) {
			showSnackbar('Failed to close all trails.', 'error');
		} finally {
			closeAllConfirm.closeConfirm();
		}
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
				headerComponent: (params: any) => (
					<StatusHeader openAll={handleOpenAll} closeAll={handleCloseAll} params={params} />
				),
				cellRenderer: (params: any) => {
					if (params.data?.isNew) {
						return params.value ? getEnumLabel(params.value, STATUS_LABELS) : '';
					}
					return (
						<StatusToggleButton
							value={params.value}
							data={params.data}
							type="trail"
							onStatusChange={fetchTrails}
						/>
					);
				},
				editable: false,
				cellStyle: { display: 'flex' },
				valueFormatter: withPlaceholder((params: any) => getEnumLabel(params.value, STATUS_LABELS)),
				...editableCell('status'),
			},
			{
				headerName: 'Difficulty',
				field: 'difficulty',
				valueFormatter: withPlaceholder((params: any) => getEnumLabel(params.value, TRAIL_DIFFICULTY_LABELS)),
				cellClassRules: {
					'difficulty-green': (params: any) => params.value === 'GREEN_CIRCLE',
					'difficulty-blue': (params: any) => params.value === 'BLUE_SQUARE',
					'difficulty-black': (params: any) => params.value === 'BLACK_DIAMOND',
					'difficulty-double-black': (params: any) => params.value === 'DOUBLE_BLACK_DIAMOND',
					'difficulty-terrain-park': (params: any) => params.value === 'TERRAIN_PARK',
					'difficulty-race-course': (params: any) => params.value === 'RACE_COURSE',
					'difficulty-other': (params: any) => params.value === 'OTHER',
				},
				...editableCell('difficulty'),
			},
			{
				headerName: 'Condition',
				field: 'condition',
				// cellRenderer: ConditionCellRenderer,
				...editableCell('condition'),
				minWidth: 160,
				valueFormatter: withPlaceholder((params: any) => getEnumLabel(params.value, TRAIL_CONDITION_LABELS)),
			},
			{
				headerName: 'Area',
				field: 'areaId',
				minWidth: 120,
				flex: 1,
				singleClickEdit: true,
				valueFormatter: (params: any) => {
					if (!params.value) return 'None';
					if (!areas || areas.length === 0) return '';
					return areaValueFormatter(areas, mountainName)(params);
				},
				...editableCell('areaId'),
			},
			{
				headerName: 'Length (mi)',
				field: 'length',
				valueFormatter: withPlaceholder((params: any) =>
					params.value !== null && params.value !== null ? params.value.toString() : '-'
				),
				...editableCell('length'),
			},
			{
				headerName: 'Latitude',
				field: 'latitude',
				valueFormatter: withPlaceholder((params: any) =>
					params.value !== null && params.value !== null ? params.value.toString() : '-'
				),
				...editableCell('latitude'),
			},
			{
				headerName: 'Longitude',
				field: 'longitude',
				valueFormatter: withPlaceholder((params: any) =>
					params.value !== null && params.value !== null ? params.value.toString() : '-'
				),
				...editableCell('longitude'),
			},
			{
				headerName: 'Actions',
				cellRenderer: ActionButtons,
				cellRendererParams: generateActionCellRendererParams<TrailRow>(
					editingRowId,
					addTrailRow,
					setAddTrailRow,
					onAddTrail
						? (row: TrailRow) => {
								return onAddTrail({
									...trailRowToInputPayload(row),
									areaId: row.areaId || undefined,
								});
						}
						: undefined,
					(row: TrailRow) => {
						setEditTrailRow({ ...row });
						setEditingRowId(row.id ?? '');
					},
					async (row: TrailRow) => {
						const updateRow = {
							...editTrailRow,
							length:
								typeof editTrailRow.length === 'number' && !isNaN(editTrailRow.length)
									? editTrailRow.length
									: 0,
						};
						await updateTrail(row.id ?? '', updateRow);
						setEditingRowId(null);
						setEditTrailRow(getEmptyNewTrailRow());
					},
					() => {
						setEditingRowId(null);
						setEditTrailRow(getEmptyNewTrailRow());
					},
					(row: TrailRow) => {
						const trail = trails.find((t) => t.id === row.id);
						if (trail) deleteConfirm.requestConfirm(trail);
					},
					fetchTrails,
					(msg: string, type?: string) =>
						showSnackbar(msg, (type as 'success' | 'error' | 'info' | 'warning') ?? 'info'),
					getEmptyNewTrailRow,
					['name', 'difficulty', 'status', 'condition']
				),
				minWidth: 120,
				pinned: 'right',
				suppressSizeToFit: true,
			},
		],
		[
			fetchTrails,
			onAddTrail,
			mountainName,
			editingRowId,
			updateTrail,
			addTrailRow,
			setAddTrailRow,
			editTrailRow,
			setEditTrailRow,
			areas,
			trails,
			deleteConfirm.requestConfirm,
			showSnackbar,
		]
	);

	return (
		<>
			<EntityTableAgGrid
				entityName="trail"
				entities={trails}
				fetchEntities={fetchTrails}
				isLoading={deleting || isLoading}
				updateEntity={updateTrail}
				deleteEntity={deleteTrail}
				onAddEntity={onAddTrail}
				mountainId={mountainId}
				mountainName={mountainName}
				areas={areas}
				getEmptyNewRow={getEmptyNewTrailRow}
				mapToRow={mapTrailToRow}
				inputPayloadConverter={trailRowToInputPayload}
				columnDefs={columnDefs}
				requiredFields={['name', 'difficulty', 'status', 'condition']}
				specialCellRenderers={{
					statusToggleButton: StatusToggleButton,
					ConditionCellRenderer,
					ActionButtons,
				}}
				editingRowId={editingRowId}
				setEditingRowId={setEditingRowId}
				agGridContext={{
					editingRowId,
					setRowState: (row: any, params: any) => setRowState(row, params),
				}}
				newRow={addTrailRow}
				setNewRow={setAddTrailRow}
				loadingMessage={deleting ? `Deleting "${deleteConfirm.itemToDelete?.name}"...` : undefined}
			/>

			{/* Confirm Delete Dialog */}
			{deleteConfirm.getDialog({
				title: 'Delete Trail',
				message: `Are you sure you want to delete "${deleteConfirm.itemToDelete?.name}"?`,
				onConfirm: async () => {
					if (deleteConfirm.itemToDelete) {
						setDeleting(true);
						try {
							await deleteTrail(deleteConfirm.itemToDelete.id);
						} finally {
							setDeleting(false);
							deleteConfirm.closeConfirm();
						}
					}
				},
				confirmLabel: 'Delete',
				confirmClassName: 'button-danger',
				cancelLabel: 'Cancel',
				loading: deleting,
				loadingMessage: deleting ? `Deleting "${deleteConfirm.itemToDelete?.name}"...` : undefined,
			})}

			{/* Confirm Open All Dialog */}
			{openAllConfirm.getDialog({
				title: 'Open All Trails',
				message: 'Are you sure you want to open all trails for this mountain?',
				onConfirm: doOpenAll,
				confirmLabel: 'Open All',
				confirmClassName: 'button-primary',
				cancelLabel: 'Cancel',
			})}

			{/* Confirm Close All Dialog */}
			{closeAllConfirm.getDialog({
				title: 'Close All Trails',
				message: 'Are you sure you want to close all trails for this mountain?',
				onConfirm: doCloseAll,
				confirmLabel: 'Close All',
				confirmClassName: 'button-primary',
				cancelLabel: 'Cancel',
			})}
		</>
	);
};

export default AdminTrailsTableAgGrid;
