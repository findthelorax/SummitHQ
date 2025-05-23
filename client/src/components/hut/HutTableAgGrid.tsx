import React, { useCallback, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import StatusToggleButton from '../buttons/StatusToggleButton';
import { humanizeEnum } from 'shared/types/utils/utils';
import { STATUS } from 'shared/types/enums';
import type { ColDef, GridSizeChangedEvent, FirstDataRenderedEvent } from 'ag-grid-community';
import type { Hut } from 'shared/types';

type HutsTableAgGridProps = {
    huts: Hut[];
    fetchHuts: () => Promise<void>;
    isLoading: boolean;
};

const HutsTableAgGrid: React.FC<HutsTableAgGridProps> = ({ huts, fetchHuts, isLoading }) => {
    const gridRef = useRef<AgGridReact>(null);

    type HutRow = {
        id: string;
        name: string;
        status: STATUS;
        latitude: number | null;
        longitude: number | null;
    };

    const columnDefs: ColDef<HutRow>[] = [
        { headerName: 'Name', field: 'name', minWidth: 100 },
        {
            headerName: 'Status',
            field: 'status',
            cellRenderer: 'statusToggleButton',
            cellRendererParams: (params: any) => ({
                value: params.value,
                data: params.data,
                type: 'hut',
                onStatusChange: fetchHuts,
            }),
            minWidth: 140,
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

    const rowData = huts
        ? huts.map((hut) => ({
            id: hut.id,
            name: hut.name,
            status: hut.status,
            latitude:
                hut.latitude !== null && hut.latitude !== undefined
                    ? typeof hut.latitude === 'object' && 'toNumber' in hut.latitude
                        ? (hut.latitude as any).toNumber()
                        : Number(hut.latitude)
                    : null,
            longitude:
                hut.longitude !== null && hut.longitude !== undefined
                    ? typeof hut.longitude === 'object' && 'toNumber' in hut.longitude
                        ? (hut.longitude as any).toNumber()
                        : Number(hut.longitude)
                    : null,
        }))
        : [];

    // Hide columns if they don't fit the container
    const onGridSizeChanged = useCallback((params: GridSizeChangedEvent) => {
        const container = document.getElementById('ag-hut-table-container');
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
                id="ag-hut-table-container"
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
                    overlayLoadingTemplate={'<span class="ag-overlay-loading-center">Loading huts...</span>'}
                    loadingOverlayComponentParams={{ loadingMessage: 'Loading huts...' }}
                    loadingOverlayComponent="agLoadingOverlay"
                    noRowsOverlayComponent="agNoRowsOverlay"
                    noRowsOverlayComponentParams={{ noRowsMessage: 'No huts found.' }}
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

export default HutsTableAgGrid;