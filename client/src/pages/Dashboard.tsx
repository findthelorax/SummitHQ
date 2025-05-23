import React from 'react';
import MountainForm from '../components/mountain/MountainForm';
import TrailsList from '../components/trail/TrailsList';
import TrailForm from '../components/trail/TrailForm';
import LiftForm from '../components/lift/LiftForm';
import AreaForm from '../components/area/AreaForm';

const Dashboard: React.FC = () => {

	return (
		<div className="max-w-2xl mx-auto p-4 space-y-8">
			<div>
				<h2 className="text-xl font-bold mb-2">Add a New Mountain</h2>
				<MountainForm />
			</div>
			<div>
				<h2 className="text-xl font-bold mb-2">Add a New Area</h2>
				<AreaForm/>
			</div>
			<div>
				<h2 className="text-xl font-bold mb-2">Add a New Lift</h2>
				<LiftForm/>
			</div>
			<div>
				<h2 className="text-xl font-bold mb-2">Add a New Trail</h2>
				<TrailForm/>
			</div>
		</div>
	);
};

export default Dashboard;