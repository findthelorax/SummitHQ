import React, { useCallback, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import StatusToggleButton from '../buttons/StatusToggleButton';
import { humanizeEnum } from 'shared/types/utils/utils';
import { TRAIL_DIFFICULTY, STATUS, TRAIL_CONDITION } from 'shared/types/enums';
import type { ColDef, GridSizeChangedEvent, FirstDataRenderedEvent } from 'ag-grid-community';
import type { Trail } from 'shared/types';

type TrailssTableAgGridProps = {
    trails: Trail[];
    fetchTrails: () => Promise<void>;
    isLoading: boolean;
};

const TrailsTableAgGrid: React.FC<TrailssTableAgGridProps> = ({ trails, fetchTrails, isLoading }) => {
    const gridRef = useRef<AgGridReact>(null);

    type TrailRow = {
        name: string;
        difficulty: TRAIL_DIFFICULTY;
        status: STATUS;
        condition: TRAIL_CONDITION;
        length: number | null;
        latitude: number | null;
        longitude: number | null;
        id: string;
    };

    const columnDefs: ColDef<TrailRow>[] = [
        { headerName: 'Name', field: 'name', minWidth: 100 },
        {
            headerName: 'Status',
            field: 'status',
            cellRenderer: 'statusToggleButton',
            cellRendererParams: (params: any) => ({
                value: params.value,
                data: params.data,
                type: 'trail',
                onStatusChange: fetchTrails,
            }),
            minWidth: 200,
        },
        {
            headerName: 'Difficulty',
            field: 'difficulty',
            valueFormatter: (params: any) => humanizeEnum(params.value),
            minWidth: 120,
        },
        {
            headerName: 'Condition',
            field: 'condition',
            valueFormatter: (params: any) => humanizeEnum(params.value),
            minWidth: 120,
        },
        {
            headerName: 'Length (mi)',
            field: 'length',
            valueFormatter: (params: any) =>
                params.value !== undefined && params.value !== null ? params.value.toString() : '-',
            minWidth: 90,
        },
        {
            headerName: 'Latitude',
            field: 'latitude',
            valueFormatter: (params: any) =>
                params.value !== undefined && params.value !== null ? params.value.toString() : '-',
            minWidth: 90,
        },
        {
            headerName: 'Longitude',
            field: 'longitude',
            valueFormatter: (params: any) =>
                params.value !== undefined && params.value !== null ? params.value.toString() : '-',
            minWidth: 90,
        },
    ];

    const rowData = trails
        ? trails.map((trail) => ({
            id: trail.id,
            name: trail.name,
            difficulty: trail.difficulty,
            status: trail.status,
            condition: trail.condition,
            length: trail.length,
            latitude:
                trail.latitude !== null && trail.latitude !== undefined
                    ? typeof trail.latitude === 'object' && 'toNumber' in trail.latitude
                        ? (trail.latitude as any).toNumber()
                        : Number(trail.latitude)
                    : null,
            longitude:
                trail.longitude !== null && trail.longitude !== undefined
                    ? typeof trail.longitude === 'object' && 'toNumber' in trail.longitude
                        ? (trail.longitude as any).toNumber()
                        : Number(trail.longitude)
                    : null,
        }))
        : [];

    // Hide columns if they don't fit the container
    const onGridSizeChanged = useCallback((params: GridSizeChangedEvent) => {
        const container = document.getElementById('ag-trail-table-container');
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
                id="ag-trail-table-container"
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
                    components={{ statusToggleButton: StatusToggleButton }}
                    overlayLoadingTemplate={'<span class="ag-overlay-loading-center">Loading trails...</span>'}
                    loadingOverlayComponentParams={{ loadingMessage: 'Loading trails...' }}
                    loadingOverlayComponent="agLoadingOverlay"
                    noRowsOverlayComponent="agNoRowsOverlay"
                    noRowsOverlayComponentParams={{ noRowsMessage: 'No trails found.' }}
                    loading={isLoading}
                    autoSizeStrategy={{
                        type: 'fitCellContents',
                    }}
                    onGridSizeChanged={onGridSizeChanged}
                    onFirstDataRendered={onFirstDataRendered}
                    suppressHorizontalScroll
                    getRowId={params => params.data.id}
                />
            </div>
        </div>
    );
};

export default TrailsTableAgGrid;