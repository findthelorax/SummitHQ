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

const StatusToggleButton: React.FC<StatusToggleButtonProps> = ({ value, data, type, onStatusChange }) => {
    const { selectedMountain } = useMountain();

    const toggleStatus = async () => {
        if (!selectedMountain) return;

        const config = typeConfig[type];
        const newStatus = value === STATUS.OPEN ? STATUS.CLOSED : STATUS.OPEN;
        const updatedItem: any = { status: newStatus };

        for (const field of config.fields) {
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
        <div className="flex items-center">
            <span className="mr-1 w-14 text-sm font-medium">
                {STATUS_LABELS[value as keyof typeof STATUS_LABELS] ?? value}
            </span>
            <button
                onClick={toggleStatus}
                className={`px-2 py-1 rounded text-white text-xs font-semibold transition
                    ${value === STATUS.OPEN ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}
                `}
            >
                {value === STATUS.OPEN ? `Close` : `Open`}
            </button>
        </div>
    );
};

export default StatusToggleButton;