import React from 'react';

type ConfirmationDialogProps = {
    open: boolean;
    title?: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
};

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
    open,
    title = 'Are you sure?',
    message,
    onConfirm,
    onCancel,
}) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 min-w-[300px]">
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="mb-4">{message}</p>
                <div className="flex justify-end gap-3 mt-4">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 rounded border border-gray-500 bg-gray-700 text-gray-200 hover:bg-gray-600 transition cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition cursor-pointer"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationDialog;