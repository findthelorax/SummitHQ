import { useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';

export function useAgGridEditableTable<T>(getEmptyRow: () => T) {
    const gridRef = useRef<AgGridReact>(null);
    const [newRow, setNewRow] = useState<T>(getEmptyRow());
    const [editingRowId, setEditingRowId] = useState<string | null>(null);

    const handleStopEditing = () => {
        setEditingRowId(null);
        if (gridRef.current && gridRef.current.api) {
            gridRef.current.api.refreshCells({ force: true });
        }
    };

    return {
        gridRef,
        newRow,
        setNewRow,
        editingRowId,
        setEditingRowId,
        handleStopEditing,
    };
}