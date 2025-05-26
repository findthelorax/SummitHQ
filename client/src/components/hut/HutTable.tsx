import React, { useCallback, useRef, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import StatusToggleButton from '../buttons/StatusToggleButton';
import { useMountain } from '../../contexts/MountainContext';
import { useSnackbarContext } from '../../contexts/SnackbarContext';
import { useHuts } from '../../hooks/useHuts';
import { STATUS } from 'shared/types/enums';
import type { ColDef, GridSizeChangedEvent, FirstDataRenderedEvent } from 'ag-grid-community';
import type { Hut } from 'shared/types';

type HutRow = {
    id: string;
    name: string;
    status: STATUS;
    latitude: number | null;
    longitude: number | null;
};

const normalizeCoordinate = (coord: any): number | null => {
    if (coord === null || coord === undefined) return null;
    if (typeof coord === 'object' && 'toNumber' in coord) return coord.toNumber();
    return Number(coord);
};

const getColumnDefs = (
    fetchHuts: () => Promise<void>,
    showSnackbar: (message: string, severity: "success" | "error" | "info" | "warning", once?: boolean) => void
): ColDef<HutRow>[] => [
    { headerName: 'Name', field: 'name', minWidth: 100 },
    {
        headerName: 'Status',
        field: 'status',
        cellRenderer: 'statusToggleButton',
        cellRendererParams: (params: any) => ({
            value: params.value,
            data: params.data,
            type: 'hut',
            onStatusChange: async () => {
                await fetchHuts();
                showSnackbar('Status updated!', 'success');
            },
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

const HutTable: React.FC = () => {
    const gridRef = useRef<AgGridReact>(null);
    const { selectedMountain } = useMountain();
    const { showSnackbar } = useSnackbarContext();

    const {
        huts,
        isLoading,
        fetchHuts,
    } = useHuts(selectedMountain?.id);

    const columnDefs = useMemo(
        () => getColumnDefs(fetchHuts, showSnackbar),
        [fetchHuts, showSnackbar]
    );

    const rowData = useMemo(() => (
        huts
            ? huts.map((hut: Hut) => ({
                id: hut.id,
                name: hut.name,
                status: hut.status,
                latitude: normalizeCoordinate(hut.latitude),
                longitude: normalizeCoordinate(hut.longitude),
            }))
            : []
    ), [huts]);

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
                    getRowId={(params) => params.data.id}
                />
            </div>
        </div>
    );
};

export default HutTable;