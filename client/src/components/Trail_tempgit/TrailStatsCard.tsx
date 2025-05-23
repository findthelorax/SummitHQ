import React from 'react';
import { useMountain } from '../../contexts/MountainContext';

const TrailStatsCard: React.FC = () => {
    const { trails } = useMountain();

    const totalTrails = trails.length;
    const openTrails = trails.filter((trail: any) => trail.status === 'open').length;
    const percentOpen = totalTrails > 0 ? Math.round((openTrails / totalTrails) * 100) : 0;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Trail Stats</h2>
            <div className="text-gray-700 dark:text-gray-300">Total Trails: {totalTrails}</div>
            <div className="text-gray-700 dark:text-gray-300">Open Trails: {openTrails}</div>
            <div className="text-gray-700 dark:text-gray-300">Percent Open: {percentOpen}%</div>
        </div>
    );
};

export default TrailStatsCard;