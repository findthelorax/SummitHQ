import React, { useMemo, useRef, useState } from 'react';

// AG Grid
import { AgGridReact } from 'ag-grid-react';
import { themeQuartz, colorSchemeDarkBlue, SortDirection } from 'ag-grid-community';

// Types & Enums
import type { BaseLodgesTableAgGridProps } from '../../utils/AgGrid/tableTypes';
import { STATUS_LABELS, getEnumLabel } from '../../types/generated-enums';

// Contexts & Hooks
import { useAreas } from '../../hooks/useAreas';
import { useAgGridAutoSize } from '../../utils/AgGrid/hooks/useAgGridAutoSize';

// Utils & Helpers
import { mapLodgeToRow } from '../../utils/AgGrid/mapToRow';
import { areaValueFormatter } from '../../utils/common/formatData';

const myTheme = themeQuartz.withPart(colorSchemeDarkBlue);

const BaseLodgeTableAgGrid: React.FC<BaseLodgesTableAgGridProps> = ({
	lodges,
	fetchLodges,
	isLoading,
	updateLodge,
	mountainId,
	mountainName,
}) => {
	const { areas } = useAreas(mountainId);
	const gridRef = useRef<AgGridReact>(null);
	const { onFirstDataRendered, onGridSizeChanged } = useAgGridAutoSize();
	const [pageSize, setPageSize] = useState(25);

	const columnDefs = useMemo(
		() => [
			{
				headerName: 'Name',
				field: 'name',
				flex: 1,
				sort: 'asc' as SortDirection,
			},
			{
				headerName: 'Status',
				field: 'status',
				minWidth: 150,
				valueFormatter: (params: any) => getEnumLabel(params.value, STATUS_LABELS),
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
				headerName: 'Capacity',
				field: 'capacity',
				minWidth: 100,
				flex: 1,
				valueFormatter: (params: any) =>
					params.value !== undefined && params.value !== null ? params.value.toString() : '-',
			},
			{
				headerName: 'Latitude',
				field: 'latitude',
				valueFormatter: (params: any) =>
					params.value !== undefined && params.value !== null ? params.value.toString() : '-',
			},
			{
				headerName: 'Longitude',
				field: 'longitude',
				valueFormatter: (params: any) =>
					params.value !== undefined && params.value !== null ? params.value.toString() : '-',
			},
		],
		[areas, mountainName]
	);

	const rowData = useMemo(() => lodges.map(mapLodgeToRow), [lodges, areas]);

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
					overlayLoadingTemplate={`<span class="ag-overlay-loading-center">Loading lodges...</span>`}
					loadingOverlayComponentParams={{ loadingMessage: `Loading lodges...` }}
					loadingOverlayComponent="agLoadingOverlay"
					noRowsOverlayComponent="agNoRowsOverlay"
					noRowsOverlayComponentParams={{ noRowsMessage: `No lodges found.` }}
					loading={isLoading}
					pagination={true}
					paginationPageSize={pageSize}
					paginationAutoPageSize={false}
					paginationPageSizeSelector={[25, 50, 100]}
					onGridSizeChanged={onGridSizeChanged}
					onFirstDataRendered={onFirstDataRendered}
					getRowId={(params) => params.data.id}
				/>
			</div>
		</div>
	);
};

export default BaseLodgeTableAgGrid;
