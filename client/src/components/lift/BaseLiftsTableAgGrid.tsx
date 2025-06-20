import React, { useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { themeQuartz, colorSchemeDarkBlue } from 'ag-grid-community';

import type { BaseLiftsTableAgGridProps } from '../../utils/AgGrid/tableTypes';
import { LIFT_TYPE_LABELS, STATUS_LABELS, getEnumLabel } from '../../types/generated-enums';
import { useAreas } from '../../hooks/useAreas';
import { mapLiftToRow } from '../../utils/AgGrid/mapToRow';
import { areaValueFormatter } from '../../utils/common/formatData';
import { StatusToggleButton } from '../buttons/StatusControl';

const myTheme = themeQuartz.withPart(colorSchemeDarkBlue);

const BaseLiftsTableAgGrid: React.FC<BaseLiftsTableAgGridProps> = ({
    lifts,
    fetchLifts,
    isLoading,
    updateLift,
    mountainId,
    mountainName,
}) => {
    const { areas } = useAreas(mountainId);
    const gridRef = useRef<AgGridReact>(null);
    const [pageSize, setPageSize] = useState(25);

    const columnDefs = useMemo(
        () => [
            {
                headerName: 'Name',
                field: 'name',
                flex: 1,
                sort: 'asc' as 'asc' | 'desc' | undefined,
                filter: true,
            },
            {
                headerName: 'Status',
                field: 'status',
                cellRenderer: (params: any) => (
                    <StatusToggleButton
                        value={params.value}
                        data={params.data}
                        type="lift"
                        onStatusChange={fetchLifts}
                    />
                ),
                cellStyle: { display: 'flex' },
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
                headerName: 'Type',
                field: 'type',
                valueFormatter: (params: any) => getEnumLabel(params.value, LIFT_TYPE_LABELS),
                minWidth: 100,
                flex: 1,
            },
            {
                headerName: 'Capacity',
                field: 'capacity',
                minWidth: 100,
                flex: 1,
            },
            {
                headerName: 'Latitude',
                field: 'latitude',
                minWidth: 100,
                flex: 1,
            },
            {
                headerName: 'Longitude',
                field: 'longitude',
                minWidth: 100,
                flex: 1,
            },
        ],
        [fetchLifts, mountainName, areas]
    );

    const rowData = useMemo(() => lifts.map(mapLiftToRow), [lifts, areas]);

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
                    overlayLoadingTemplate={`<span class="ag-overlay-loading-center">Loading lifts...</span>`}
                    loadingOverlayComponentParams={{ loadingMessage: `Loading lifts...` }}
                    loadingOverlayComponent="agLoadingOverlay"
                    noRowsOverlayComponent="agNoRowsOverlay"
                    noRowsOverlayComponentParams={{ noRowsMessage: `No lifts found.` }}
                    loading={isLoading}
                    pagination={true}
                    paginationPageSize={pageSize}
                    paginationAutoPageSize={false}
                    paginationPageSizeSelector={[25, 50, 100]}
                    getRowId={(params) => params.data.id}
                    context={{
                        updateEntity: updateLift,
                        fetchEntities: fetchLifts,
                    }}
                />
            </div>
        </div>
    );
};

export default BaseLiftsTableAgGrid;