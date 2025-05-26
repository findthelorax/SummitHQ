import React from 'react';
import { useMountain } from '../../contexts/MountainContext';
import { liftApi } from '../../api/LiftAPI';
import { trailApi } from '../../api/TrailAPI';
import { lodgeApi } from '../../api/LodgeAPI';
import type { Lift, Trail, Lodge } from 'shared/types';
import { STATUS } from 'shared/types/enums';
import { STATUS_LABELS } from 'shared/types/utils/enumLabels';

type StatusToggleButtonProps = {
    value: STATUS;
    data: Lift | Trail | Lodge;
    type: 'lift' | 'trail' | 'lodge';
    onStatusChange?: () => void;
};

const toNumberOrNull = (val: any) =>
    val === null || val === undefined ? null : typeof val === 'number' ? val : Number(val);

const typeConfig = {
    lift: {
        api: liftApi.updateLift,
        fields: ['name', 'type', 'capacity', 'latitude', 'longitude'],
    },
    trail: {
        api: trailApi.updateTrail,
        fields: ['name', 'difficulty', 'length', 'condition', 'latitude', 'longitude'],
    },
    lodge: {
        api: lodgeApi.updateLodge,
        fields: ['name', 'capacity', 'latitude', 'longitude'],
    },
} as const;

const StatusDropdown: React.FC<StatusToggleButtonProps> = ({ value, data, type, onStatusChange }) => {
    const { selectedMountain } = useMountain();

    const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (!selectedMountain) return;
        const newStatus = e.target.value as STATUS;

        const config = typeConfig[type];
        const updatedItem: any = { status: newStatus };

        for (const field of config.fields) {
            // Convert latitude/longitude to number or null
            if (field === 'latitude' || field === 'longitude') {
                updatedItem[field] = toNumberOrNull((data as any)[field]);
            } else {
                updatedItem[field] = (data as any)[field];
            }
        }

        await config.api(selectedMountain.id, (data as any).id, updatedItem);

        if (onStatusChange) {
            await onStatusChange();
        }
    };

    return (
        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <select
                value={value}
                onChange={handleChange}
                className="w-28 text-sm font-medium border rounded px-2 py-1 dark:bg-gray-700"
            >
                {Object.values(STATUS).map((status) => (
                    <option key={status} value={status}>
                        {STATUS_LABELS[status as keyof typeof STATUS_LABELS] ?? status}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default StatusDropdown;