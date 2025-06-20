import React, { useMemo, useRef, useState } from 'react';

// AG Grid
import { AgGridReact } from 'ag-grid-react';
import { themeQuartz, colorSchemeDarkBlue } from 'ag-grid-community';

// Types & Enums
import type { BaseHutsTableAgGridProps } from '../../utils/AgGrid/tableTypes';
import { STATUS_LABELS, getEnumLabel } from '../../types/generated-enums';

// Contexts & Hooks
import { useAreas } from '../../hooks/useAreas';

// Utils & Helpers
import { mapHutToRow } from '../../utils/AgGrid/mapToRow';
import { areaValueFormatter } from '../../utils/common/formatData';

// Components
import { StatusToggleButton } from '../buttons/StatusControl';

const myTheme = themeQuartz.withPart(colorSchemeDarkBlue);

const BaseHutsTableAgGrid: React.FC<BaseHutsTableAgGridProps> = ({
    huts,
    fetchHuts,
    isLoading,
    updateHut,
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
                        type="hut"
                        onStatusChange={fetchHuts}
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
        [fetchHuts, mountainName, areas]
    );

    const rowData = useMemo(() => huts.map(mapHutToRow), [huts, areas]);

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
                    overlayLoadingTemplate={`<span class="ag-overlay-loading-center">Loading huts...</span>`}
                    loadingOverlayComponentParams={{ loadingMessage: `Loading huts...` }}
                    loadingOverlayComponent="agLoadingOverlay"
                    noRowsOverlayComponent="agNoRowsOverlay"
                    noRowsOverlayComponentParams={{ noRowsMessage: `No huts found.` }}
                    loading={isLoading}
                    pagination={true}
                    paginationPageSize={pageSize}
                    paginationAutoPageSize={false}
                    paginationPageSizeSelector={[25, 50, 100]}
                    getRowId={(params) => params.data.id}
                    context={{
                        updateEntity: updateHut,
                        fetchEntities: fetchHuts,
                    }}
                />
            </div>
        </div>
    );
};

export default BaseHutsTableAgGrid;