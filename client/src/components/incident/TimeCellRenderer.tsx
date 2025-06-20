import React from 'react';

const formatTimeDisplay = (value: any) => {
    if (!value) return '';
    const date = new Date(value);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
};

export const TimeCellRenderer = (props: any) => {
    const { value, data, editingRowId, field, onClearTime } = props;
    const isRowEditing = editingRowId === data.id;

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <span>{formatTimeDisplay(value)}</span>
            {isRowEditing && (
                <button
                    onClick={() => onClearTime(data.id, field)}
                    style={{
                        marginLeft: 8,
                        color: 'red',
                        background: 'none',
                        border: 'none',
                        fontSize: 28,
                        cursor: 'pointer',
                        lineHeight: 1,
                        padding: 0,
                    }}
                    tabIndex={-1}
                    title="Clear time"
                >
                    ×
                </button>
            )}
        </div>
    );
};