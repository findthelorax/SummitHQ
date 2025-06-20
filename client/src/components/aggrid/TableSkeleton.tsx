import { useMemo, useRef, useEffect } from 'react';

// AG Grid
import { AgGridReact } from 'ag-grid-react';
import { themeQuartz, colorSchemeDarkBlue } from 'ag-grid-community';

// Types & Enums
import type { AddEntityHandler, UpdateEntityHandler } from '../../utils/AgGrid/tableTypes';

// Contexts & Hooks
import { useSnackbarContext } from '../../contexts/SnackbarContext';
import { useAgGridAutoSize } from '../../utils/AgGrid/hooks/useAgGridAutoSize';

// Components
import ConfirmationDialog from '../../utils/common/ConfirmationDialog';
import ActionButtons from '../buttons/ActionButtons';

const myTheme = themeQuartz.withPart(colorSchemeDarkBlue);
type EntityWithId = { id: string };

type EntityTableAgGridProps<T extends EntityWithId, TRow, TInput = any, TResult = any> = {
	entityName: string;
	entities: T[];
	fetchEntities: () => void;
	isLoading: boolean;
	updateEntity: UpdateEntityHandler<TInput, TResult>;
	deleteEntity: (id: string) => Promise<void>;
	onAddEntity?: (input: TInput, areaId?: string) => Promise<TResult>;
	onEditEntity?: (row: TRow) => void;
	mountainId?: string;
	mountainName?: string;
	areas?: any[];
	getEmptyNewRow: () => TRow;
	mapToRow: (entity: T) => TRow;
	inputPayloadConverter: (row: TRow) => TInput;
	columnDefs: any[];
	requiredFields?: string[];
	specialCellRenderers?: Record<string, any>;
	components?: any;
	editingRowId: string | null;
	setEditingRowId: (id: string | null) => void;
	agGridContext?: any;
	loadingMessage?: string;
	loading?: boolean;
	confirmOpen?: boolean;
	confirmTitle?: string;
	confirmMessage?: string;
	onConfirmDelete?: () => void;
	onCancelDelete?: () => void;
	newRow?: TRow;
	setNewRow?: (row: TRow) => void;
	editRow?: TRow;
	setEditRow?: (row: TRow) => void;
};

function inputPayloadConverter<TInput>(row: any): Partial<TInput> {
	// Remove 'id' and any AG Grid internal fields from the payload
	const { id, __agGridRowGroup, __agGridGroup, ...rest } = row;
	return rest as Partial<TInput>;
}

export function EntityTableAgGrid<T extends EntityWithId, TRow, TInput = any, TResult = any>({
	entityName,
	entities,
	fetchEntities,
	isLoading,
	updateEntity,
	deleteEntity,
	areas = [],
	getEmptyNewRow,
	mapToRow,
	columnDefs,
	specialCellRenderers = {},
	components,
	editingRowId,
	setEditingRowId,
	agGridContext,
	loadingMessage,
	confirmOpen,
	confirmTitle,
	confirmMessage,
	onConfirmDelete,
	onCancelDelete,
	newRow,
	setNewRow,
	editRow,
	setEditRow,
}: EntityTableAgGridProps<T, TRow, TInput, TResult>) {
	const { showSnackbar } = useSnackbarContext();
	const gridRef = useRef<AgGridReact>(null);
	const { onFirstDataRendered, onGridSizeChanged } = useAgGridAutoSize();

	useEffect(() => {
		const api = gridRef.current?.api;
		if (api) {
			const allNodes = [] as any[];
			api.forEachNode((node) => allNodes.push(node));
			api.redrawRows({ rowNodes: allNodes });
		}
	}, [editingRowId, editRow]);

	const onCellValueChanged = async (params: any) => {
		const { data, colDef, newValue, oldValue } = params;
		if (data && colDef && colDef.field && newValue !== oldValue) {
			// Prevent direct update if editing (use editRow state instead)
			if (editingRowId && data.id === editingRowId) {
				if (setEditRow) {
					setEditRow({ ...data, [colDef.field]: newValue });
				}
				return;
			}
			try {
				await updateEntity(data.id, inputPayloadConverter<TInput>({ ...data, [colDef.field]: newValue }));
				showSnackbar(`${colDef.headerName || colDef.field} updated.`, 'success');
				if (fetchEntities) await fetchEntities();
			} catch (error) {
				showSnackbar(`Failed to update ${colDef.headerName || colDef.field}.`, 'error');
			}
		}
	};

	// Use editRow for the row being edited, newRow for the add row
	const agRowData = useMemo(() => {
		if (editingRowId && editRow && entities.some((e) => e.id === editingRowId)) {
			return entities.map((e) => (e.id === editingRowId ? editRow : mapToRow(e)));
		}
		return entities.map(mapToRow);
	}, [entities, areas, editingRowId, editRow, mapToRow]);

	return (
		<div className="ag-grid">
			<div id="ag-table-container" className="ag-theme-quartz-dark">
				<AgGridReact
					ref={gridRef}
					columnDefs={columnDefs}
					defaultColDef={{
						resizable: true,
						sortable: true,
						filter: true,
						flex: 1,
					}}
					rowData={agRowData}
					pinnedTopRowData={
						typeof newRow !== 'undefined'
							? [newRow]
							: typeof getEmptyNewRow !== 'undefined'
							? [getEmptyNewRow()]
							: undefined
					}
					domLayout="autoHeight"
					animateRows={true}
					theme={myTheme}
					context={agGridContext}
					components={{ ...specialCellRenderers, ActionButtons, ...(components || {}) }}
					overlayLoadingTemplate={`<span class="ag-overlay-loading-center">Loading ${entityName}s...</span>`}
					loadingOverlayComponentParams={{ loadingMessage: `Loading ${entityName}s...` }}
					loadingOverlayComponent="agLoadingOverlay"
					noRowsOverlayComponent="agNoRowsOverlay"
					noRowsOverlayComponentParams={{ noRowsMessage: `No ${entityName}s found.` }}
					loading={isLoading}
					pagination={true}
					paginationPageSize={25}
					paginationAutoPageSize={false}
					paginationPageSizeSelector={[25, 50, 100]}
					onGridSizeChanged={onGridSizeChanged}
					onFirstDataRendered={onFirstDataRendered}
					singleClickEdit={true}
					getRowId={(params) => params.data.id?.toString() ?? ''}
					getRowClass={(params) => (params.data?.id === editingRowId ? 'editing-row' : '')}
					onCellValueChanged={onCellValueChanged}
				/>
			</div>
			<ConfirmationDialog
				open={!!confirmOpen}
				title={confirmTitle}
				message={confirmMessage ?? ''}
				onConfirm={onConfirmDelete ?? (() => {})}
				onCancel={onCancelDelete ?? (() => {})}
				loading={isLoading}
				loadingMessage={loadingMessage}
			/>
		</div>
	);
}
