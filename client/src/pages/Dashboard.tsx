import React from 'react';
import MountainForm from '../components/mountain/MountainForm';
import { useMountain } from '../contexts/MountainContext';
import MountainStatsPanel from '../components/mountain/MountainStatsPanel';

const Dashboard: React.FC = () => {
	const { selectedMountain } = useMountain();

	return (
		<div className="mx-auto p-4 space-y-8">
			{!selectedMountain && (
				<div>
					<h2 className="text-xl font-bold mb-2">Add a New Mountain</h2>
					<MountainForm />
				</div>
			)}
			{selectedMountain && <MountainStatsPanel mountain={selectedMountain} />}
		</div>
	);
};

export default Dashboard;
