import React, { useState } from 'react';
import type { Trail } from 'shared/types';
import { useTrails } from '../hooks/useTrails';
import { useMountain } from '../contexts/MountainContext';
import TrailsTableAgGrid from '../components/trail/TrailsTableAgGrid';
import TrailForm from '../components/trail/TrailForm';
import TrailsList from '../components/trail/TrailsList';
import ConfirmationDialog from '../components/ConfirmationDialog';

const TrailsPage: React.FC = () => {
	const { selectedMountain } = useMountain();
	const { trails, fetchTrails, isLoading, updateTrail, deleteTrail } = useTrails(selectedMountain?.id);

	const [editingTrail, setEditingTrail] = useState<Trail | null>(null);
	const [editForm, setEditForm] = useState<Partial<Trail>>({});

	const [confirmOpen, setConfirmOpen] = useState(false);
	const [trailToDelete, setTrailToDelete] = useState<string | null>(null);

	const handleEditTrail = (trail: Trail) => {
		setEditingTrail(trail);
		setEditForm(trail);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEditForm({ ...editForm, [e.target.name]: e.target.value });
	};

	const handleSave = async () => {
		if (editingTrail) {
			await updateTrail(editingTrail.id, editForm);
			setEditingTrail(null);
		}
	};

	const handleCancel = () => setEditingTrail(null);

	const handleDeleteTrail = async (trailId: string): Promise<void> => {
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

	if (!selectedMountain) {
		return <div>Please select a mountain to view trails.</div>;
	}

	return (
		<>
			<TrailForm onCreated={fetchTrails} />
			<TrailsTableAgGrid
				trails={trails}
				fetchTrails={fetchTrails}
				isLoading={isLoading}
				updateTrail={updateTrail}
				deleteTrail={handleDeleteTrail}
				onEditTrail={handleEditTrail}
			/>
			<ConfirmationDialog
				open={confirmOpen}
				message="Are you sure you want to delete this trail? This action cannot be undone."
				onConfirm={confirmDelete}
				onCancel={cancelDelete}
			/>
			{editingTrail && (
				<div className="modal">
					<h2>Edit Trail</h2>
					<input name="name" value={editForm.name || ''} onChange={handleChange} placeholder="Trail Name" />
					{/* Add more fields as needed */}
					<button onClick={handleSave}>Save</button>
					<button onClick={handleCancel}>Cancel</button>
				</div>
			)}
		</>
	);
};

export default TrailsPage;
