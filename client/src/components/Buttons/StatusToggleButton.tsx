import React from 'react';
import { useMountain } from '../../contexts/MountainContext';
import { liftApi } from '../../api/LiftAPI';
import { trailApi } from '../../api/TrailAPI';
import { lodgeApi } from '../../api/LodgeAPI';
import type { Lift, Trail, Lodge } from 'shared/types';
import { STATUS, LIFT_TYPE, TRAIL_DIFFICULTY, TRAIL_CONDITION } from 'shared/types/enums';

type StatusToggleButtonProps = {
	value: STATUS;
	data: Lift | Trail | Lodge;
	type: 'lift' | 'trail' | 'lodge';
	onStatusChange?: () => void; // <-- Add this prop
};

const toNumberOrNull = (val: any) =>
	val === null || val === undefined ? null : typeof val === 'number' ? val : Number(val);

const StatusToggleButton: React.FC<StatusToggleButtonProps> = ({ value, data, type, onStatusChange }) => {
	const { selectedMountain } = useMountain();

	const toggleStatus = async () => {
		if (!selectedMountain) return;

		let updatedItem: any = { status: data.status === STATUS.OPEN ? STATUS.CLOSED : STATUS.OPEN };

		if (type === 'lift') {
			const lift = data as Lift;
			updatedItem = {
				status: updatedItem.status,
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
				status: updatedItem.status,
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
				status: updatedItem.status,
				name: lodge.name,
				capacity: lodge.capacity,
				latitude: toNumberOrNull(lodge.latitude),
				longitude: toNumberOrNull(lodge.longitude),
			};
			await lodgeApi.updateLodge(selectedMountain.id, lodge.id, updatedItem);
		}

		if (onStatusChange) {
			await onStatusChange(); // <-- Call fetchLifts after update
		}
	};

	return (
		<div className="flex items-center">
			<span className="mr-2 w-16 inline-block text-sm font-medium">
				{value === STATUS.OPEN ? 'Open' : value === STATUS.CLOSED ? 'Closed' : 'Unknown'}
			</span>
			<button
				onClick={toggleStatus}
				className={`px-3 py-1 rounded text-white text-xs font-semibold transition w-24
        ${value === STATUS.OPEN ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}
    `}
			>
				{value === STATUS.OPEN ? `Close ${type}` : `Open ${type}`}
			</button>
		</div>
	);
};

export default StatusToggleButton;
