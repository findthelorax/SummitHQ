import React from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import TrailRow from './TrailRow';

function AreaTable({
	value,
	areas,
	trails,
	patrollers,
}) {
	return areas.map(
		(area, index) =>
			value === index && (
				<TableContainer key={area._id}>
					<Table size="small" stickyHeader>
						<TableHead>
							<TableRow>
								<TableCell>Trail</TableCell>
								<TableCell>Opening Time</TableCell>
								<TableCell>Patroller</TableCell>
								<TableCell>Condition</TableCell>
								<TableCell>Closing Patroller</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{trails &&
								trails.map(
									(trail) =>
										area.trails.includes(trail._id) && (
											<TrailRow
												key={trail._id}
												trail={trail}
												patrollers={patrollers}
											/>
										)
								)}
						</TableBody>
					</Table>
				</TableContainer>
			)
	);
}

export default AreaTable;