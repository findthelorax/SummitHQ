import React from 'react';
import MountainForm from '../components/mountain/MountainForm';
import { useMountain } from '../contexts/MountainContext';

const Dashboard: React.FC = () => {
    const { selectedMountain } = useMountain();

    return (
        <div className="max-w-2xl mx-auto p-4 space-y-8">
            {!selectedMountain && (
                <div>
                    <h2 className="text-xl font-bold mb-2">Add a New Mountain</h2>
                    <MountainForm />
                </div>
            )}
        </div>
    );
};

export default Dashboard;