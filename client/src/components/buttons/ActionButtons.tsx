import React from 'react';
import type { ICellRendererParams } from 'ag-grid-community';

type ActionButtonsProps<T, TResult = any> = ICellRendererParams<T> & {
    isNewRow?: boolean;
    isEditing?: boolean;
    newRowData?: T;
    setNewRowData?: React.Dispatch<React.SetStateAction<T>>;
    onAdd?: (row: T) => Promise<TResult>;
    onEdit?: (row: T) => void;
    onUpdate?: (row: T) => Promise<TResult>;
    onCancel?: () => void;
    onDeleteClick?: (row: T) => void;
    fetchRows?: () => Promise<void>;
    showSnackbar?: (msg: string, type?: string) => void;
    getEmptyRow?: () => T;
    requiredFields?: (keyof T)[];
};

function ActionButtons<T extends { id?: string }, TResult = any>(props: ActionButtonsProps<T, TResult>) {
    const {
        data,
        isNewRow,
        isEditing,
        newRowData,
        setNewRowData,
        onAdd,
        onEdit,
        onUpdate,
        onCancel,
        onDeleteClick,
        fetchRows,
        showSnackbar,
        getEmptyRow,
        requiredFields = [],
    } = props;

    // New row (add/cancel)
    if (isNewRow && newRowData && setNewRowData && onAdd && getEmptyRow) {
        return (
            <div className="table-action-buttons">
                <button
                    onClick={async () => {
                        const missing = requiredFields.some(
                            (field) =>
                                newRowData[field] === null ||
                                newRowData[field] === undefined ||
                                (typeof newRowData[field] === 'string' && !(newRowData[field] as string).trim())
                        );
                        if (missing) {
                            showSnackbar?.('Please fill out required fields.', 'warning');
                            return;
                        }
                        try {
                            await onAdd(newRowData);
                            setNewRowData(getEmptyRow());
                            fetchRows?.();
                        } catch {
                            showSnackbar?.('Failed to add. Try again.', 'error');
                        }
                    }}
                    className="button-grid table-action-add"
                    type="button"
                >
                    Add
                </button>
                <button
                    onClick={() => {
                        setNewRowData(getEmptyRow());
                        props.api?.stopEditing?.();
                    }}
                    className="button-grid table-action-cancel"
                    type="button"
                >
                    Cancel
                </button>
            </div>
        );
    }

    // Editing row (update/cancel)
    if (isEditing && onUpdate && onCancel) {
        return (
            <div className="table-action-buttons">
                <button
                    onClick={() => data && onUpdate(data)}
                    className="button-grid table-action-update"
                    type="button"
                >
                    Save
                </button>
                <button
                    onClick={onCancel}
                    className="button-grid table-action-cancel"
                    type="button"
                >
                    Cancel
                </button>
            </div>
        );
    }

    // Default (edit/delete)
    return (
        <div className="table-action-buttons">
            <button
                onClick={() => data && onEdit?.(data)}
                
                className="button-grid table-action-edit"
                type="button"
            >
                Edit
            </button>
            <button
                onClick={() => data && onDeleteClick?.(data)}
                className="button-grid table-action-delete"
                type="button"
            >
                Delete
            </button>
        </div>
    );
}

export default ActionButtons;