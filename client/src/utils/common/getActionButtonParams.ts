import React from 'react';

export interface ActionButtonParams<T, TResult = any> {
    isNewRow: boolean;
    newRowData: T;
    setNewRowData: React.Dispatch<React.SetStateAction<T>>;
    onAdd?: (row: T) => Promise<TResult>;
    onEdit?: (row: T) => void;
    onUpdate?: (row: T) => Promise<TResult>;
    onCancel?: () => void;
    onDeleteClick?: (row: T) => void;
    fetchRows: () => Promise<void>;
    showSnackbar: (msg: string, type?: string) => void;
    getEmptyRow: () => T;
    requiredFields: string[];
    isEditing?: boolean;
}

export function getActionButtonParams<T, TResult = any>(params: ActionButtonParams<T, TResult>) {
    return params;
}

export function generateActionCellRendererParams<T, TResult = any>(
    editingRowId: string | null,
    newRowData: T,
    setNewRowData: React.Dispatch<React.SetStateAction<T>>,
    onAdd: ((row: T) => Promise<TResult>) | undefined,
    onEdit: (row: T) => void,
    onUpdate: ((row: T) => Promise<TResult>) | undefined,
    onCancel: (() => void) | undefined,
    onDeleteClick: (row: T) => void,
    fetchRows: () => Promise<void>,
    showSnackbar: (msg: string, type?: string) => void,
    getEmptyRow: () => T,
    requiredFields: (keyof T)[]
) {
    return (params: any) => {
        const isEditing = editingRowId === params.data?.id;
        return getActionButtonParams<T, TResult>({
            isNewRow: params.data?.isNew === true,
            newRowData,
            setNewRowData,
            onAdd,
            onEdit,
            onUpdate: isEditing ? onUpdate : undefined,
            onCancel: isEditing ? onCancel : undefined,
            onDeleteClick,
            fetchRows,
            showSnackbar,
            getEmptyRow,
            requiredFields: requiredFields.map(String),
            isEditing,
        });
    };
}