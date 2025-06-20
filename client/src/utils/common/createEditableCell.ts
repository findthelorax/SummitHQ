import { ColDef } from 'ag-grid-community';

export function createEditableCell<T>(
    field: keyof T,
    options: {
        selectOptions?: string[];
        numberEditor?: boolean;
        cellEditor?: string;
        getRowState: (params: any) => T;
        setRowState: (updater: (prev: T) => T, params: any) => void;
        alwaysEditable?: boolean;
        editable?: (params: any) => boolean;
    }
): Partial<ColDef<T>> {
    return {
        editable: options.editable
            ? options.editable
            : (params: any) =>
                    options.alwaysEditable || params.data?.isNew || params.data?.id === params.context?.editingRowId,
        cellEditorSelector: (params: any) => {
            if (options.numberEditor) {
                return { component: 'NumberOnlyCellEditor' };
            }
            if (options.selectOptions) {
                return {
                    component: 'agSelectCellEditor',
                    params: { values: options.selectOptions },
                };
            }
            if (options.cellEditor) {
                return { component: options.cellEditor, popup: true };
            }
            return undefined;
        },
        valueGetter: (params: any) => {
            if (params.data?.isNew || params.data?.id === params.context?.editingRowId) {
                return options.getRowState(params)[field] ?? '';
            }
            return params.data?.[field] ?? '';
        },
        valueSetter: (params: any) => {
            if (params.data?.isNew || params.data?.id === params.context?.editingRowId) {
                options.setRowState((prev) => ({ ...prev, [field]: params.newValue }), params);
                return true;
            }
            return false;
        },
    };
}