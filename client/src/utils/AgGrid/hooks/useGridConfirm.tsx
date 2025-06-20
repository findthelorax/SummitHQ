import { useConfirmDialog } from './useConfirmDialog';
import ConfirmDialog from '../../common/ConfirmationDialog';

export function useGridConfirm<T = unknown>() {
    const {
        confirmOpen,
        itemToDelete,
        requestConfirm,
        closeConfirm,
    } = useConfirmDialog<T>();

    function getDialog({
        title,
        message,
        onConfirm,
        confirmLabel = 'Confirm',
        confirmClassName = 'button-primary',
        cancelLabel = 'Cancel',
        loading = false,
        loadingMessage,
    }: {
        title: string;
        message: string;
        onConfirm: () => void | Promise<void>;
        confirmLabel?: string;
        confirmClassName?: string;
        cancelLabel?: string;
        loading?: boolean;
        loadingMessage?: string;
    }) {
        return (
            <ConfirmDialog
                open={confirmOpen}
                title={title}
                message={message}
                onConfirm={onConfirm}
                onCancel={closeConfirm}
                confirmLabel={confirmLabel}
                confirmClassName={confirmClassName}
                cancelLabel={cancelLabel}
                loading={loading}
                loadingMessage={loadingMessage}
            />
        );
    }

    return {
        confirmOpen,
        itemToDelete,
        requestConfirm,
        closeConfirm,
        getDialog,
    };
}