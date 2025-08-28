import React from 'react';
import type { ICellRendererParams } from 'ag-grid-community';
import { Button } from '@mui/material'; // Or your preferred button component
import { AddCircleOutline, DeleteOutline } from '@mui/icons-material';

interface ChecksActionCellRendererParams extends ICellRendererParams {
    onCreate: () => void;
    onDelete: (id: string) => void;
}

export const ChecksActionCellRenderer: React.FC<ChecksActionCellRendererParams> = (props) => {
    // Render a "Create" button for the pinned top row
    if (props.node.rowPinned) {
        return (
            <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<AddCircleOutline />}
                    onClick={() => props.onCreate()}
                >
                    Create
                </Button>
            </div>
        );
    }

    // Render a "Delete" button for regular data rows
    return (
        <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <Button
                variant="outlined"
                color="error"
                size="small"
                startIcon={<DeleteOutline />}
                onClick={() => props.onDelete(props.data.id)}
            >
                Delete
            </Button>
        </div>
    );
};