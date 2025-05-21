import React from 'react';
import type { AreaWithEntities } from 'shared/types';

interface AreaTabsProps {
    value: number;
    onChange: (event: React.MouseEvent<HTMLButtonElement>, newValue: number) => void;
    areas: AreaWithEntities[];
}

const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500'];

const AreaTabs: React.FC<AreaTabsProps> = ({ value, onChange, areas }) => (
    <div className="flex space-x-2 mb-4">
        {areas.map((area, index) => (
            <button
                key={area.id}
                className={`px-4 py-2 rounded text-black ${colors[index % colors.length]} ${value === index ? 'ring-2 ring-black' : ''}`}
                onClick={e => onChange(e, index)}
            >
                {area.name}
            </button>
        ))}
    </div>
);

export default AreaTabs;