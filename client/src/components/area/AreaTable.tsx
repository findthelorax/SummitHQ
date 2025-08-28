import * as React from 'react';
import type { AreaFull, LocationDTO, TrailDTO, LiftDTO, HutDTO, AidRoomDTO, LodgeDTO } from '../../types/index';

interface AreaTableProps {
	area: AreaFull;
}

const AreaTable: React.FC<AreaTableProps> = ({ area }) => {
	if (!area) return null;

	// Show locations in a dedicated table
	const locations = area.locations ?? [];

	return (
		<div className="overflow-x-auto mb-4">
			<h2 className="text-lg font-semibold mb-2">Locations ({locations.length})</h2>
			{locations.length === 0 ? (
				<div className="text-gray-500 mb-4">No locations in this area.</div>
			) : (
				<table className="min-w-full bg-white text-black rounded shadow mb-6">
					<thead>
						<tr>
							<th className="px-4 py-2">Name</th>
							<th className="px-4 py-2">Entity Type</th>
						</tr>
					</thead>
					<tbody>
						{locations.map((loc: LocationDTO) => (
							<tr key={loc.id}>
								<td className="border px-4 py-2">{loc.name}</td>
								<td className="border px-4 py-2">{loc.entityType}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default AreaTable;
