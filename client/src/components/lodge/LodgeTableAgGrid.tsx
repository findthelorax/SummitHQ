import React, { useCallback, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import StatusToggleButton from '../buttons/StatusToggleButton';
import { humanizeEnum } from 'shared/types/utils/utils';
import { STATUS } from 'shared/types/enums';
import type { ColDef, GridSizeChangedEvent, FirstDataRenderedEvent } from 'ag-grid-community';
import type { Lodge } from 'shared/types';

type LodgesTableAgGridProps = {
    lodges: Lodge[];
    fetchLodges: () => Promise<void>;
    isLoading: boolean;
};

const LodgesTableAgGrid: React.FC<LodgesTableAgGridProps> = ({ lodges, fetchLodges, isLoading }) => {
    const gridRef = useRef<AgGridReact>(null);

    type LodgeRow = {
        id: string;
        name: string;
        capacity: number;
        status: STATUS;
        latitude: number | null;
        longitude: number | null;
    };

    const columnDefs: ColDef<LodgeRow>[] = [
        { headerName: 'Name', field: 'name', minWidth: 100 },
        {
            headerName: 'Status',
            field: 'status',
            cellRenderer: 'statusToggleButton',
            cellRendererParams: (params: any) => ({
                value: params.value,
                data: params.data,
                type: 'lodge',
                onStatusChange: fetchLodges,
            }),
            minWidth: 140,
        },
        {
            headerName: 'Capacity',
            field: 'capacity',
            minWidth: 100,
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

    const rowData = lodges
        ? lodges.map((lodge) => ({
            id: lodge.id,
            name: lodge.name,
            capacity: lodge.capacity,
            status: lodge.status,
            latitude:
                lodge.latitude !== null && lodge.latitude !== undefined
                    ? typeof lodge.latitude === 'object' && 'toNumber' in lodge.latitude
                        ? (lodge.latitude as any).toNumber()
                        : Number(lodge.latitude)
                    : null,
            longitude:
                lodge.longitude !== null && lodge.longitude !== undefined
                    ? typeof lodge.longitude === 'object' && 'toNumber' in lodge.longitude
                        ? (lodge.longitude as any).toNumber()
                        : Number(lodge.longitude)
                    : null,
        }))
        : [];

    // Hide columns if they don't fit the container
    const onGridSizeChanged = useCallback((params: GridSizeChangedEvent) => {
        const container = document.getElementById('ag-lodge-table-container');
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
                id="ag-lodge-table-container"
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
                    overlayLoadingTemplate={'<span class="ag-overlay-loading-center">Loading lodges...</span>'}
                    loadingOverlayComponentParams={{ loadingMessage: 'Loading lodges...' }}
                    loadingOverlayComponent="agLoadingOverlay"
                    noRowsOverlayComponent="agNoRowsOverlay"
                    noRowsOverlayComponentParams={{ noRowsMessage: 'No lodges found.' }}
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

export default LodgesTableAgGrid;