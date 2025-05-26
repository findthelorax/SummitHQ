import React, { useCallback, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import type { Equipment, EquipmentWithLocation } from 'shared/types';
import { EQUIPMENT_STATUS } from 'shared/types/enums';
import { EQUIPMENT_STATUS_LABELS } from 'shared/types/utils/enumLabels';
import type { ColDef, GridSizeChangedEvent, FirstDataRenderedEvent } from 'ag-grid-community';

interface EquipmentTableAgGridProps {
	equipment: Equipment[];
	fetchEquipment: () => Promise<void>;
	isLoading: boolean;
}

const EquipmentTableAgGrid: React.FC<EquipmentTableAgGridProps> = ({ equipment, fetchEquipment, isLoading }) => {
	const gridRef = useRef<AgGridReact>(null);

	type EquipmentRow = {
		id: string;
		name: string;
		type: string;
		number?: number | null;
		description?: string | null;
		status: EQUIPMENT_STATUS;
		picture?: string | null;
		cost?: number | null;
		latitude?: number | null;
		longitude?: number | null;
		mountainId?: string | null;
		locationId?: string | null;
		dateAdded: Date;
		location?: {
			entityType: string;
		} | null;
	};

	const columnDefs: ColDef<EquipmentRow>[] = [
		{ headerName: 'Name', field: 'name', minWidth: 100 },
		{ headerName: 'Type', field: 'type', minWidth: 80 },
		{ headerName: 'Number', field: 'number', minWidth: 80 },
		{ headerName: 'Description', field: 'description', minWidth: 120 },
		{
			headerName: 'Status',
			field: 'status',
			minWidth: 160,
			valueFormatter: (params: { value: EQUIPMENT_STATUS }) =>
				params.value ? EQUIPMENT_STATUS_LABELS[params.value] ?? params.value.replace(/_/g, ' ') : '',
		},
		{ headerName: 'Cost', field: 'cost', minWidth: 80 },
		{
			headerName: 'Latitude',
			field: 'latitude',
			minWidth: 90,
			valueFormatter: (params: any) =>
				params.value !== undefined && params.value !== null ? params.value.toString() : '-',
		},
		{
			headerName: 'Longitude',
			field: 'longitude',
			minWidth: 90,
			valueFormatter: (params: any) =>
				params.value !== undefined && params.value !== null ? params.value.toString() : '-',
		},
		{
			headerName: 'Location',
			field: 'location',
			minWidth: 120,
			valueGetter: (params: any) =>
				params.data.location ? `${params.data.location.name} (${params.data.location.entityType})` : '-',
		},
	];

	const rowData = equipment
		? equipment.map((item) => {
				const itemWithLocation = item as EquipmentWithLocation;
				return {
					id: item.id,
					name: item.name,
					type: item.type,
					number: item.number,
					description: item.description,
					status: item.status as EQUIPMENT_STATUS,
					picture: item.picture,
					cost: item.cost,
					latitude:
						item.latitude !== null && item.latitude !== undefined
							? typeof item.latitude === 'object' && 'toNumber' in item.latitude
								? (item.latitude as any).toNumber()
								: Number(item.latitude)
							: null,
					longitude:
						item.longitude !== null && item.longitude !== undefined
							? typeof item.longitude === 'object' && 'toNumber' in item.longitude
								? (item.longitude as any).toNumber()
								: Number(item.longitude)
							: null,
					locationName: itemWithLocation.location,
					location: itemWithLocation.location
						? {
								entityType: itemWithLocation.location.entityType,
						  }
						: null,
				};
		  })
		: [];

	const onGridSizeChanged = useCallback((params: GridSizeChangedEvent) => {
		params.api.sizeColumnsToFit();
	}, []);

	const onFirstDataRendered = useCallback((params: FirstDataRenderedEvent) => {
		params.api.sizeColumnsToFit();
		setTimeout(() => {
			params.api.sizeColumnsToFit();
		}, 100);
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
				id="ag-equipment-table-container"
				className="ag-theme-quartz-dark"
				style={{
					width: '100%',
					maxWidth: 900,
					minWidth: 300,
				}}
			>
				<AgGridReact
					ref={gridRef}
					columnDefs={columnDefs}
					rowData={rowData}
					domLayout="autoHeight"
					overlayLoadingTemplate={'<span class="ag-overlay-loading-center">Loading equipment...</span>'}
					loadingOverlayComponentParams={{ loadingMessage: 'Loading equipment...' }}
					loadingOverlayComponent="agLoadingOverlay"
					noRowsOverlayComponent="agNoRowsOverlay"
					noRowsOverlayComponentParams={{ noRowsMessage: 'No equipment found.' }}
					loading={isLoading}
					autoSizeStrategy={{
						type: 'fitCellContents',
					}}
					onGridSizeChanged={onGridSizeChanged}
					onFirstDataRendered={onFirstDataRendered}
					suppressHorizontalScroll
					getRowId={(params) => params.data.id}
				/>
			</div>
		</div>
	);
};

export default EquipmentTableAgGrid;
