import React, { useMemo, useRef, useState } from 'react';

// AG Grid
import { AgGridReact } from 'ag-grid-react';
import { themeQuartz, colorSchemeDarkBlue } from 'ag-grid-community';

// Types & Enums
import type { BaseTrailsTableAgGridProps } from '../../utils/AgGrid/tableTypes';
import {
	TRAIL_CONDITION_LABELS,
	TRAIL_DIFFICULTY_LABELS,
	STATUS_LABELS,
	STATUS,
	getEnumLabel,
} from '../../types/generated-enums';

// Contexts & Hooks
import { useSnackbarContext } from '../../contexts/SnackbarContext';
import { useAreas } from '../../hooks/useAreas';
import { useAgGridAutoSize } from '../../utils/AgGrid/hooks/useAgGridAutoSize';
import { useGridConfirm } from '../../utils/AgGrid/hooks/useGridConfirm';

// Utils & Helpers
import { mapTrailToRow } from '../../utils/AgGrid/mapToRow';
import { areaValueFormatter } from '../../utils/common/formatData';

// Components
import { ConditionCellRenderer } from '../../utils/AgGrid/ConditionCellRenderer';
import { ShowAllHeader } from '../../utils/AgGrid/ShowAllHeader';
import { StatusToggleButton } from '../buttons/StatusControl';
import StatusHeader from '../../components/aggrid/StatusHeader';

const myTheme = themeQuartz.withPart(colorSchemeDarkBlue);

const BaseTrailsTableAgGrid: React.FC<BaseTrailsTableAgGridProps> = ({
	trails,
	fetchTrails,
	isLoading,
	updateTrail,
	mountainId,
	mountainName,
}) => {
	const { areas } = useAreas(mountainId);
	const gridRef = useRef<AgGridReact>(null);
	const { onFirstDataRendered, onGridSizeChanged } = useAgGridAutoSize();
	const { showSnackbar } = useSnackbarContext();
	const [pageSize, setPageSize] = useState(25);

	const openAllConfirm = useGridConfirm();
	const closeAllConfirm = useGridConfirm();

	const doOpenAll = async () => {
		try {
			await Promise.all(
				trails
					.filter((trail) => trail.status !== 'OPEN')
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
					.filter((trail) => trail.status !== 'CLOSED')
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

	const showAllRows = () => setPageSize(trails.length);

	const columnDefs = useMemo(
		() => [
			{
				headerName: 'Name',
				field: 'name',
				flex: 1,
				sort: 'asc' as 'asc' | 'desc' | undefined,
				headerComponent: (params: any) => <ShowAllHeader showAllRows={showAllRows} params={params} />,
				filter: true,
			},
			{
				headerName: 'Status',
				field: 'status',
				headerComponent: (params: any) => (
					<StatusHeader
						openAll={() => openAllConfirm.requestConfirm(undefined)}
						closeAll={() => closeAllConfirm.requestConfirm(undefined)}
						params={params}
					/>
				),
				cellRenderer: (params: any) => (
					<StatusToggleButton
						value={params.value}
						data={params.data}
						type="trail"
						onStatusChange={fetchTrails}
					/>
				),
				cellStyle: { display: 'flex' },
				minWidth: 150,
				valueFormatter: (params: any) => getEnumLabel(params.value, STATUS_LABELS),
			},
			{
				headerName: 'Difficulty',
				field: 'difficulty',
				valueFormatter: (params: any) => getEnumLabel(params.value, TRAIL_DIFFICULTY_LABELS),
				cellClassRules: {
					'difficulty-green': (params: any) => params.value === 'GREEN_CIRCLE',
					'difficulty-blue': (params: any) => params.value === 'BLUE_SQUARE',
					'difficulty-black': (params: any) => params.value === 'BLACK_DIAMOND',
					'difficulty-double-black': (params: any) => params.value === 'DOUBLE_BLACK_DIAMOND',
					'difficulty-terrain-park': (params: any) => params.value === 'TERRAIN_PARK',
					'difficulty-race-course': (params: any) => params.value === 'RACE_COURSE',
					'difficulty-other': (params: any) => params.value === 'OTHER',
				},
			},
			{
				headerName: 'Condition',
				field: 'condition',
				cellRenderer: ConditionCellRenderer,
				minWidth: 160,
				valueFormatter: (params: any) => getEnumLabel(params.value, TRAIL_CONDITION_LABELS),
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
			},
			{
				headerName: 'Length (mi)',
				field: 'length',
			},
			{
				headerName: 'Latitude',
				field: 'latitude',
			},
			{
				headerName: 'Longitude',
				field: 'longitude',
			},
		],
		[fetchTrails, mountainName, areas, openAllConfirm, closeAllConfirm, trails.length]
	);

	const rowData = useMemo(() => trails.map(mapTrailToRow), [trails, areas]);

	return (
		<div className="ag-grid">
			<div id="ag-table-container" className="ag-theme-quartz-dark">
				<AgGridReact
					ref={gridRef}
					columnDefs={columnDefs}
					rowData={rowData}
					defaultColDef={{
						resizable: true,
						sortable: true,
						filter: true,
						flex: 1,
					}}
					domLayout="autoHeight"
					animateRows={true}
					theme={myTheme}
					overlayLoadingTemplate={`<span class="ag-overlay-loading-center">Loading trails...</span>`}
					loadingOverlayComponentParams={{ loadingMessage: `Loading trails...` }}
					loadingOverlayComponent="agLoadingOverlay"
					noRowsOverlayComponent="agNoRowsOverlay"
					noRowsOverlayComponentParams={{ noRowsMessage: `No trails found.` }}
					loading={isLoading}
					pagination={true}
					paginationPageSize={pageSize}
					paginationAutoPageSize={false}
					paginationPageSizeSelector={[25, 50, 100]}
					onGridSizeChanged={onGridSizeChanged}
					onFirstDataRendered={onFirstDataRendered}
					getRowId={(params) => params.data.id}
					context={{
						updateEntity: updateTrail,
						fetchEntities: fetchTrails,
					}}
				/>
			</div>
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
		</div>
	);
};

export default BaseTrailsTableAgGrid;
