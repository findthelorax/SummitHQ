import React from 'react';
import { useMountain } from '../contexts/MountainContext';
import { useIncidents } from '../hooks/useIncidents';
import IncidentForm from '../components/incident/incidentForm';

// import IncidentsTable from '../../components/incident/IncidentsTable';

const IncidentsPage: React.FC = () => {
    const { selectedMountain } = useMountain();
    const { incidents, fetchIncidents, isLoading } = useIncidents(selectedMountain?.id);

    return (
        <>
            <IncidentForm />
            {/* <IncidentsTable incidents={incidents} fetchIncidents={fetchIncidents} isLoading={isLoading} /> */}
        </>
    );
};

export default IncidentsPage;