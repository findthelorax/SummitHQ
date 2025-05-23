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

const StatusDropdown: React.FC<StatusToggleButtonProps> = ({ value, data, type, onStatusChange }) => {
    const { selectedMountain } = useMountain();

    const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (!selectedMountain) return;
        const newStatus = e.target.value as STATUS;

        let updatedItem: any = { status: newStatus };

        if (type === 'lift') {
            const lift = data as Lift;
            updatedItem = {
                status: newStatus,
                name: lift.name,
                type: lift.type,
                capacity: lift.capacity,
                latitude: toNumberOrNull(lift.latitude),
                longitude: toNumberOrNull(lift.longitude),
            };
            await liftApi.updateLift(selectedMountain.id, lift.id, updatedItem);
        } else if (type === 'trail') {
            const trail = data as Trail;
            updatedItem = {
                status: newStatus,
                name: trail.name,
                difficulty: trail.difficulty,
                length: trail.length,
                condition: trail.condition,
                latitude: toNumberOrNull(trail.latitude),
                longitude: toNumberOrNull(trail.longitude),
            };
            await trailApi.updateTrail(selectedMountain.id, trail.id, updatedItem);
        } else if (type === 'lodge') {
            const lodge = data as Lodge;
            updatedItem = {
                status: newStatus,
                name: lodge.name,
                capacity: lodge.capacity,
                latitude: toNumberOrNull(lodge.latitude),
                longitude: toNumberOrNull(lodge.longitude),
            };
            await lodgeApi.updateLodge(selectedMountain.id, lodge.id, updatedItem);
        }

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