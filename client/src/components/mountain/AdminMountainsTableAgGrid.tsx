import React, { useMemo, useState } from 'react';

// AG Grid
import { EntityTableAgGrid } from '../aggrid/TableSkeleton';
import DatePickerCellEditor from '../aggrid/DatePickerCellEditor';

// Types & Enums
import type { MountainRow, MountainsTableAgGridProps } from '../../utils/AgGrid/tableTypes';

// Contexts & Hooks
import { useSnackbarContext } from '../../contexts/SnackbarContext';
import { useGridConfirm } from '../../utils/AgGrid/hooks/useGridConfirm';

// Utils & Helpers
import { placeholderFormatter, formatDate } from '../../utils/common/formatData';
import { generateActionCellRendererParams } from '../../utils/common/getActionButtonParams';
import { createEditableCell } from '../../utils/common/createEditableCell';
import { mapMountainToRow } from '../../utils/AgGrid/mapToRow';
import { mountainRowToInputPayload } from '../../utils/AgGrid/InputPayloadConversion';
import { getEmptyNewMountainRow } from '../../utils/AgGrid/rowFactories';

// Components
import ActionButtons from '../buttons/ActionButtons';
import { states } from '../autocomplete/StatesAutoComplete';
const withPlaceholder = (formatter?: (params: any) => string) => (params: any) => {
	const placeholder = placeholderFormatter(params);
	if (placeholder !== params.value) return placeholder;
	return formatter ? formatter(params) : params.value;
};

const AdminMountainsTableAgGrid: React.FC<MountainsTableAgGridProps> = ({
	mountains,
	fetchMountains,
	isLoading,
	updateMountain,
	deleteMountain,
	onAddMountain,
}) => {
	const [addRow, setAddRow] = useState<MountainRow>(getEmptyNewMountainRow());
	const [editRow, setEditRow] = useState<MountainRow>(getEmptyNewMountainRow());
	const [editingRowId, setEditingRowId] = useState<string | null>(null);
	const [deleting, setDeleting] = useState(false);

	const deleteConfirm = useGridConfirm<{ id: string; name: string }>();
	const { showSnackbar } = useSnackbarContext();

	const setRowState = (row: any, params: any) => {
		if (params.data?.isNew) setAddRow(row);
		else if (params.data?.id === editingRowId) setEditRow(row);
	};

	const editableCell = (field: keyof MountainRow) =>
		createEditableCell<MountainRow>(field, {
			selectOptions: field === 'state' ? states : undefined,
			cellEditor: field === 'openingDate' || field === 'closingDate' ? 'datePickerCellEditor' : undefined,
			getRowState: (params) => {
				if (params.data?.isNew) return addRow;
				if (params.data?.id === editingRowId) return editRow;
				return getEmptyNewMountainRow();
			},
			setRowState: (updater, params) => {
				if (params.data?.isNew) setAddRow(updater);
				else if (params.data?.id === editingRowId) setEditRow(updater);
			},
			editable: (params: any) => params.data?.isNew || params.data?.id === editingRowId,
		});

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
			{ headerName: 'City', field: 'city', flex: 1, valueFormatter: withPlaceholder(), ...editableCell('city') },
			{
				headerName: 'State',
				field: 'state',
				flex: 1,
				valueFormatter: withPlaceholder(),
				...editableCell('state'),
			},
			{
				headerName: 'Latitude',
				field: 'latitude',
				valueFormatter: withPlaceholder(),
				...editableCell('latitude'),
			},
			{
				headerName: 'Longitude',
				field: 'longitude',
				valueFormatter: withPlaceholder(),
				...editableCell('longitude'),
			},
			{ headerName: 'Height', field: 'height', valueFormatter: withPlaceholder(), ...editableCell('height') },
			{
				headerName: 'Phone',
				field: 'phoneNumber',
				valueFormatter: withPlaceholder(),
				...editableCell('phoneNumber'),
			},
			{
				headerName: 'Address',
				field: 'address',
				flex: 1,
				valueFormatter: withPlaceholder(),
				...editableCell('address'),
			},
			{ headerName: 'Zip', field: 'zipcode', valueFormatter: withPlaceholder(), ...editableCell('zipcode') },
			{
				headerName: 'Opening Date',
				field: 'openingDate',
				valueFormatter: (params: any) => formatDate(params.value),
				...editableCell('openingDate'),
			},
			{
				headerName: 'Closing Date',
				field: 'closingDate',
				valueFormatter: (params: any) => formatDate(params.value),
				...editableCell('closingDate'),
			},
			{
				headerName: 'Actions',
				cellRenderer: ActionButtons,
				cellRendererParams: generateActionCellRendererParams<MountainRow>(
					editingRowId,
					addRow,
					setAddRow,
					onAddMountain
						? (row: MountainRow) => {
								return onAddMountain(mountainRowToInputPayload(row));
						  }
						: undefined,
					(row: MountainRow) => {
						setEditRow({ ...row });
						setEditingRowId(row.id ?? '');
					},
					async (row: MountainRow) => {
						await updateMountain(row.id ?? '', mountainRowToInputPayload(editRow));
						setEditingRowId(null);
						setEditRow(getEmptyNewMountainRow());
						fetchMountains();
					},
					() => {
						setEditingRowId(null);
						setEditRow(getEmptyNewMountainRow());
					},
					(row: MountainRow) => {
						const mountain = mountains.find((m) => m.id === row.id);
						if (mountain) deleteConfirm.requestConfirm(mountain);
					},
					fetchMountains,
					(msg: string, type?: string) =>
						showSnackbar(msg, (type as 'success' | 'error' | 'info' | 'warning') ?? 'info'),
					getEmptyNewMountainRow,
					['name', 'city', 'state']
				),
				minWidth: 120,
				pinned: 'right',
				suppressSizeToFit: true,
			},
		],
		[
			editingRowId,
			addRow,
			setAddRow,
			editRow,
			setEditRow,
			mountains,
			deleteConfirm.requestConfirm,
			showSnackbar,
			fetchMountains,
			onAddMountain,
			updateMountain,
			deleteMountain,
		]
	);

	return (
		<>
			<EntityTableAgGrid
				entityName="mountain"
				entities={mountains}
				fetchEntities={fetchMountains}
				isLoading={isLoading || deleting}
				updateEntity={updateMountain}
				deleteEntity={deleteMountain}
				onAddEntity={onAddMountain}
				components={{ datePickerCellEditor: DatePickerCellEditor }}
				getEmptyNewRow={getEmptyNewMountainRow}
				mapToRow={mapMountainToRow}
				inputPayloadConverter={mountainRowToInputPayload}
				columnDefs={columnDefs}
				editingRowId={editingRowId}
				setEditingRowId={setEditingRowId}
				newRow={addRow}
				setNewRow={setAddRow}
				editRow={editRow}
				setEditRow={setEditRow}
				agGridContext={{
					editingRowId,
					setRowState: (row: any, params: any) => setRowState(row, params),
				}}
			/>

			{/* Confirm Delete Dialog */}
			{deleteConfirm.getDialog({
				title: 'Delete Mountain',
				message: `Are you sure you want to delete "${deleteConfirm.itemToDelete?.name}"?`,
				onConfirm: async () => {
					if (deleteConfirm.itemToDelete) {
						setDeleting(true);
						try {
							await deleteMountain(deleteConfirm.itemToDelete.id);
							showSnackbar(`Deleted mountain "${deleteConfirm.itemToDelete.name}".`, 'success');
							fetchMountains();
						} catch {
							showSnackbar(`Failed to delete mountain "${deleteConfirm.itemToDelete.name}".`, 'error');
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
		</>
	);
};

export default AdminMountainsTableAgGrid;
