import React, { useMemo, useRef, useState } from 'react';

// AG Grid
import { AgGridReact } from 'ag-grid-react';
import { themeQuartz, colorSchemeDarkBlue } from 'ag-grid-community';

// Types & Enums
import type { BaseEquipmentTableAgGridProps } from '../../utils/AgGrid/tableTypes';
import { EQUIPMENT_STATUS_LABELS } from '../../types/generated-enums';

// Contexts & Hooks
import { useSnackbarContext } from '../../contexts/SnackbarContext';
import { useAreas } from '../../hooks/useAreas';
import { useLocations } from '../../hooks/useLocations';
import { useAgGridAutoSize } from '../../utils/AgGrid/hooks/useAgGridAutoSize';

// Utils & Helpers
import { mapEquipmentToRow } from '../../utils/AgGrid/mapToRow';
import { areaValueFormatter } from '../../utils/common/formatData';

// Components
// (add any custom cell renderers if needed)

const myTheme = themeQuartz.withPart(colorSchemeDarkBlue);

const BaseEquipmentTableAgGrid: React.FC<BaseEquipmentTableAgGridProps> = ({
    equipment,
    fetchEquipment,
    isLoadingEquipment,
    mountainId,
    mountainName,
}) => {
    const { areas } = useAreas(mountainId);
    const { locations } = useLocations(mountainId);
    const gridRef = useRef<AgGridReact>(null);
    const { onFirstDataRendered, onGridSizeChanged } = useAgGridAutoSize();
    const { showSnackbar } = useSnackbarContext();
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
                headerName: 'Type',
                field: 'type',
            },
            {
                headerName: 'Number',
                field: 'number',
            },
            {
                headerName: 'Description',
                field: 'description',
                flex: 1,
            },
            {
                headerName: 'Status',
                field: 'status',
                valueFormatter: (params: any) =>
                    params.value ? EQUIPMENT_STATUS_LABELS[params.value as keyof typeof EQUIPMENT_STATUS_LABELS] : '-',
            },
            {
                headerName: 'Cost',
                field: 'cost',
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
                headerName: 'Location',
                field: 'locationId',
                flex: 1,
                valueFormatter: (params: any) => {
                    const l = locations?.find((l) => l.id === params.value);
                    return l ? `${l.entityType}: ${l.name}` : 'None';
                },
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
        [mountainName, areas, locations]
    );

    const rowData = useMemo(() => equipment.map(mapEquipmentToRow), [equipment, areas, locations]);

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
                    overlayLoadingTemplate={`<span class="ag-overlay-loading-center">Loading equipment...</span>`}
                    loadingOverlayComponentParams={{ loadingMessage: `Loading equipment...` }}
                    loadingOverlayComponent="agLoadingOverlay"
                    noRowsOverlayComponent="agNoRowsOverlay"
                    noRowsOverlayComponentParams={{ noRowsMessage: `No equipment found.` }}
                    loading={isLoadingEquipment}
                    pagination={true}
                    paginationPageSize={pageSize}
                    paginationAutoPageSize={false}
                    paginationPageSizeSelector={[25, 50, 100]}
                    onGridSizeChanged={onGridSizeChanged}
                    onFirstDataRendered={onFirstDataRendered}
                    getRowId={(params) => params.data.id}
                    context={{
                        fetchEntities: fetchEquipment,
                    }}
                />
            </div>
        </div>
    );
};

export default BaseEquipmentTableAgGrid;