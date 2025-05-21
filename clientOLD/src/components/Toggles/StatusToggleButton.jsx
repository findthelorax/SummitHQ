import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { useMountain } from '../../contexts/MountainContext';

function StatusToggleButton({ value, data, type }) {
	const context = useMountain();

	const toggleStatus = async () => {
		const updatedItem = { ...data, status: data.status === 'Open' ? 'Closed' : 'Open' };
		try {
			if (type === 'lift') {
				await context.apis.liftApi.updateLift(data.mountain, data._id, updatedItem);
				context.fetchLifts();
			} else if (type === 'trail') {
				await context.apis.trailApi.updateTrail(data.mountain, data._id, updatedItem);
				context.fetchTrails();
			} else if (type === 'lodge') {
				await context.apis.lodgeApi.updateLodge(data.mountain, data._id, updatedItem);
				context.fetchLodges();
			}
		} catch (error) {
			console.error(`Failed to update ${type} status: ${error}`);
		}
	};

	return (
		<div>
			<span style={{ marginRight: 10, display: 'inline-block', width: '60px' }}>
				{value === 'Open' ? 'Open' : value === 'Closed' ? 'Closed' : 'Unknown'}
			</span>
			<Button
				variant="contained"
				color="primary"
				onClick={toggleStatus}
				size="small"
				style={{ fontSize: 12, paddingLeft: 5, paddingRight: 10 }}
			>
				{value === 'Open' ? `Close ${type}` : `Open ${type}`}
			</Button>
		</div>
	);
}

export default StatusToggleButton;
