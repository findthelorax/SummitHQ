import { useCallback } from 'react';
import type { GridApi } from 'ag-grid-community';

export function useAgGridAutoSize() {
    const autoSizeAll = useCallback((params: { api: GridApi }) => {
        const allColumns = params.api.getColumns() || [];
        const nonPinnedColumnIds: string[] = [];
        allColumns.forEach((col) => {
            if (!col.getPinned()) {
                nonPinnedColumnIds.push(col.getColId());
            }
        });

        if (nonPinnedColumnIds.length > 0) {
            params.api.autoSizeColumns(nonPinnedColumnIds, false);
            params.api.sizeColumnsToFit();
        }
    }, []);

    interface AgGridAutoSizeParams {
        api: GridApi;
    }

    interface AgGridAutoSizeHandlers {
        onFirstDataRendered: (params: AgGridAutoSizeParams) => void;
        onGridSizeChanged: (params: AgGridAutoSizeParams) => void;
    }

    return {
        onFirstDataRendered: useCallback((params: AgGridAutoSizeParams) => autoSizeAll(params), [autoSizeAll]),
        onGridSizeChanged: useCallback((params: AgGridAutoSizeParams) => autoSizeAll(params), [autoSizeAll]),
    } as AgGridAutoSizeHandlers;
}
