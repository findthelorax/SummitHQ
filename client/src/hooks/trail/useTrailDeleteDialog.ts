import { useState } from 'react';

export function useTrailDeleteDialog(deleteTrail: (id: string) => Promise<void>) {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [trailToDelete, setTrailToDelete] = useState<string | null>(null);

    const handleDeleteTrail = (trailId: string) => {
        setTrailToDelete(trailId);
        setConfirmOpen(true);
    };

    const confirmDelete = async () => {
        if (trailToDelete) {
            await deleteTrail(trailToDelete);
            setTrailToDelete(null);
            setConfirmOpen(false);
        }
    };

    const cancelDelete = () => {
        setTrailToDelete(null);
        setConfirmOpen(false);
    };

    return {
        confirmOpen,
        trailToDelete,
        handleDeleteTrail,
        confirmDelete,
        cancelDelete,
    };
}