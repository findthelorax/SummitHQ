import React, { useCallback, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import StatusToggleButton from '../buttons/StatusToggleButton';
import type { Lift } from 'shared/types';
import { LIFT_TYPE, STATUS } from 'shared/types/enums';
import { LIFT_TYPE_LABELS, STATUS_LABELS } from 'shared/types/utils/enumLabels';
import type { ColDef, GridSizeChangedEvent, FirstDataRenderedEvent } from 'ag-grid-community';
import StatusDropdown from '../buttons/StatusDropdown';

interface LiftsTableAgGridProps {
	lifts: Lift[];
	fetchLifts: () => Promise<void>;
	isLoading: boolean;
}

const LiftsTableAgGrid: React.FC<LiftsTableAgGridProps> = ({ lifts, fetchLifts, isLoading }) => {
	const gridRef = useRef<AgGridReact>(null);

	type LiftRow = {
		name: string;
		status: STATUS;
		type: LIFT_TYPE;
		capacity: number;
		latitude: number | null;
		longitude: number | null;
	};

	const columnDefs: ColDef<LiftRow>[] = [
		{ headerName: 'Name', field: 'name', minWidth: 80 },
		{
			headerName: 'Status',
			field: 'status',
			cellRenderer: 'StatusDropdown',
			cellRendererParams: { type: 'lift', onStatusChange: fetchLifts },
			valueFormatter: (params: any) => STATUS_LABELS[params.value as keyof typeof STATUS_LABELS] ?? params.value,
			minWidth: 180,
			maxWidth: 200,
		},
		{
			headerName: 'Type',
			field: 'type',
			valueFormatter: (params: any) =>
				LIFT_TYPE_LABELS[params.value as keyof typeof LIFT_TYPE_LABELS] ?? params.value,
			minWidth: 70,
			maxWidth: 100,
		},
		{
			headerName: 'Capacity',
			field: 'capacity',
			minWidth: 115,
			maxWidth: 115,
		},
		{
			headerName: 'Latitude',
			field: 'latitude',
			valueFormatter: (params: any) =>
				params.value !== undefined && params.value !== null ? params.value.toString() : '-',
			minWidth: 110,
			maxWidth: 110,
		},
		{
			headerName: 'Longitude',
			field: 'longitude',
			valueFormatter: (params: any) =>
				params.value !== undefined && params.value !== null ? params.value.toString() : '-',
			minWidth: 120,
			maxWidth: 120,
		},
	];

    const rowData = lifts
        ? lifts.map((lift) => ({
            id: lift.id,
            name: lift.name,
            status: lift.status as STATUS,
            type: lift.type as LIFT_TYPE,
            capacity: lift.capacity,
            latitude:
                lift.latitude !== null && lift.latitude !== undefined
                    ? typeof lift.latitude === 'object' && 'toNumber' in lift.latitude
                        ? (lift.latitude as any).toNumber()
                        : Number(lift.latitude)
                    : null,
            longitude:
                lift.longitude !== null && lift.longitude !== undefined
                    ? typeof lift.longitude === 'object' && 'toNumber' in lift.longitude
                        ? (lift.longitude as any).toNumber()
                        : Number(lift.longitude)
                    : null,
          }))
        : [];

	// Hide columns if they don't fit the container
	const onGridSizeChanged = useCallback((params: GridSizeChangedEvent) => {
		// Use the actual container width, not the grid's current width
		const container = document.getElementById('ag-lift-table-container');
		const gridWidth = container ? container.offsetWidth : window.innerWidth;

		let totalColsWidth = 0;
		const columnsToShow: string[] = [];
		const columnsToHide: string[] = [];
		const allColumns = params.api.getColumns();
		if (allColumns && allColumns.length > 0) {
			for (let i = 0; i < allColumns.length; i++) {
				const column = allColumns[i];
				totalColsWidth += column.getMinWidth() || 0;
				if (totalColsWidth > gridWidth) {
					columnsToHide.push(column.getColId());
				} else {
					columnsToShow.push(column.getColId());
				}
			}
		}
		params.api.setColumnsVisible(columnsToShow, true);
		params.api.setColumnsVisible(columnsToHide, false);
		setTimeout(() => {
			params.api.sizeColumnsToFit();
		}, 10);
	}, []);

	// Auto-size columns to fit content on first render
	const onFirstDataRendered = useCallback((params: FirstDataRenderedEvent) => {
		params.api.sizeColumnsToFit();
	}, []);

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'flex-start',
				width: '100%',
				marginTop: 24,
			}}
		>
			<div
				id="ag-lift-table-container"
				className="ag-theme-quartz-dark"
				style={{
					width: '100%',
					maxWidth: 750,
					minWidth: 300,
				}}
			>
				<AgGridReact
					ref={gridRef}
					columnDefs={columnDefs}
					rowData={rowData}
					domLayout="autoHeight"
					components={{ StatusDropdown: StatusDropdown }}
					overlayLoadingTemplate={'<span class="ag-overlay-loading-center">Loading lifts...</span>'}
					loadingOverlayComponentParams={{ loadingMessage: 'Loading lifts...' }}
					loadingOverlayComponent="agLoadingOverlay"
					noRowsOverlayComponent="agNoRowsOverlay"
					noRowsOverlayComponentParams={{ noRowsMessage: 'No lifts found.' }}
					loading={isLoading}
					autoSizeStrategy={{
						type: 'fitCellContents',
					}}
					onGridSizeChanged={onGridSizeChanged}
					onFirstDataRendered={onFirstDataRendered}
					suppressHorizontalScroll
				/>
			</div>
		</div>
	);
};

export default LiftsTableAgGrid;
