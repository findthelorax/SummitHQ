import React, { useContext } from 'react';
import { Grid } from '@mui/material';
import { MountainContext } from '../contexts/MountainContext';
import AreaTabs from '../components/Areas/AreaTabs';
import AreaTable from '../components/Areas/AreaTable';
import useAreaHandlers from '../hooks/useAreaHandlers';

function Areas() {
	const { areas, trails, patrollers, isLoading } = useContext(MountainContext);
	const { value, handleTabChange } = useAreaHandlers();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<Grid container rowSpacing={2} columnSpacing={3} sx={{ pt: 8 }}>
			<Grid item xs={12} s={12} m={10} l={10} xl={10}>
				<AreaTabs value={value} onChange={handleTabChange} areas={areas} />
				<AreaTable value={value} areas={areas} trails={trails} patrollers={patrollers} />
			</Grid>
		</Grid>
	);
}

export default Areas;