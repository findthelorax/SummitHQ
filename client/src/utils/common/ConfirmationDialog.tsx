import * as React from 'react';

type ConfirmationDialogProps = {
    open: boolean;
    title?: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    loading?: boolean;
    loadingMessage?: string;
    confirmLabel?: string;
    confirmClassName?: string;
    cancelLabel?: string;
};

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
    open,
    title = 'Are you sure?',
    message,
    onConfirm,
    onCancel,
    loading = false,
    loadingMessage,
    confirmLabel = 'Confirm',
    confirmClassName = 'button-primary',
    cancelLabel = 'Cancel',
}) => {
    if (!open) return null;
    return (
        <div className="dialog-backdrop">
            <div className="dialog-container">
                <h3 className="dialog-title">{title}</h3>
                <p className="dialog-message">{message}</p>
                {loading ? (
                    <div className="dialog-loading">
                        <div className="spinner" />
                        <span>{loadingMessage || 'Processing...'}</span>
                    </div>
                ) : (
                    <div className="dialog-actions">
                        <button
                            onClick={onConfirm}
                            className={confirmClassName}
                            type="button"
                            disabled={loading}
                        >
                            {confirmLabel}
                        </button>
                        <button
                            onClick={onCancel}
                            className="button-secondary"
                            type="button"
                            disabled={loading}
                        >
                            {cancelLabel}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConfirmationDialog;