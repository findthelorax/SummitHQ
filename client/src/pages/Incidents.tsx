import React from 'react';
import { useMountain } from '../contexts/MountainContext';
import { useIncidents } from '../hooks/useIncidents';
import IncidentForm from '../components/incident/IncidentForm';
import IncidentTableAgGrid from '../components/incident/BaseIncidentTableAgGrid';

const IncidentsPage: React.FC = () => {
	const { selectedMountain } = useMountain();
	const { incidents, fetchIncidents, updateIncident, deleteIncident, isLoading } = useIncidents(selectedMountain?.id);

	return (
		<div className="w-full">
			<IncidentForm />
			<div className="mt-8">
				<IncidentTableAgGrid
					incidents={incidents}
					fetchIncidents={fetchIncidents}
					updateIncident={updateIncident}
					deleteIncident={deleteIncident}
					isLoading={isLoading}
					mountainId={selectedMountain?.id || ''}
					mountainName={selectedMountain?.name || ''}
				/>
			</div>
		</div>
	);
};

export default IncidentsPage;
