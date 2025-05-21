import React from 'react';
import { useMountain } from '../contexts/MountainContext';
import AreaTabs from '../components/Area/AreaTabs';
import AreaTable from '../components/Area/AreaTable';
import useAreaHandlers from '../hooks/useAreaHandlers';
import { useAreas } from '../hooks/useAreas';
import { useTrails } from '../hooks/useTrails';
import { useLifts } from '../hooks/useLifts';
// import { useHuts } from '../hooks/useHuts';
// import { useAidRooms } from '../hooks/useAidRooms';
// import { useLodges } from '../hooks/useLodges';
// import { useEquipment } from '../hooks/useEquipment';
// import { useLocations } from '../hooks/useLocations';
import type {
	Area,
	Trail,
	Lift,
	// Hut,
	// AidRoom,
	// Lodge,
	// Employee,
	// Equipment,
	// Location,
	AreaWithEntities,
} from 'shared/types';

function Areas() {
	const { selectedMountain } = useMountain();
	const { areas, isLoading: areasLoading } = useAreas(selectedMountain?.id);
	const { trails, isLoading: trailsLoading } = useTrails(selectedMountain?.id);
	const { lifts, isLoading: liftsLoading } = useLifts(selectedMountain?.id);
	// const { huts, isLoading: hutsLoading } = useHuts(selectedMountain?.id);
	// const { aidRooms, isLoading: aidRoomsLoading } = useAidRooms(selectedMountain?.id);
	// const { lodges, isLoading: lodgesLoading } = useLodges(selectedMountain?.id);
	// const { equipment, isLoading: equipmentLoading } = useEquipment(selectedMountain?.id);
	// const { locations, isLoading: locationsLoading } = useLocations(selectedMountain?.id);
	const { value, handleTabChange } = useAreaHandlers();

	const isLoading =
		areasLoading ||
		trailsLoading ||
		liftsLoading ||
		// hutsLoading ||
		// aidRoomsLoading ||
		// lodgesLoading ||
		// equipmentLoading ||
		// locationsLoading;

	// Build AreaWithEntities by matching areaId for each entity type using locations as the source of truth
	const areasWithEntities: AreaWithEntities[] = areas.map((area) => {
		const areaLocations = locations ? locations.filter((loc) => loc.areaId === area.id) : [];

		// Helper to get entity by id from array
		const getById = <T extends { id: string }>(arr: T[], id?: string | null) => arr.find((item) => item.id === id);

		// For each entity type, find the matching objects by entityId in locations
		const areaTrails: Trail[] = areaLocations
			.filter((loc) => loc.entityType === 'TRAIL')
			.map((loc) => getById(trails, loc.entityId))
			.filter(Boolean) as Trail[];

		const areaLifts: Lift[] = areaLocations
			.filter((loc) => loc.entityType === 'LIFT')
			.map((loc) => getById(lifts, loc.entityId))
			.filter(Boolean) as Lift[];

		// const areaHuts: Hut[] = areaLocations
		// 	.filter((loc) => loc.entityType === 'HUT')
		// 	.map((loc) => getById(huts, loc.entityId))
		// 	.filter(Boolean) as Hut[];

		// const areaAidRooms: AidRoom[] = areaLocations
		// 	.filter((loc) => loc.entityType === 'AID_ROOM')
		// 	.map((loc) => getById(aidRooms, loc.entityId))
		// 	.filter(Boolean) as AidRoom[];

		// const areaLodges: Lodge[] = areaLocations
		// 	.filter((loc) => loc.entityType === 'LODGE')
		// 	.map((loc) => getById(lodges, loc.entityId))
		// .filter(Boolean) as Lodge[];

		// const areaEquipment: Equipment[] = equipment
		// 	? equipment.filter((eq) => areaLocations.some((loc) => loc.id === eq.locationId))
		// 	: [];

		return {
			...area,
			trails: areaTrails,
			lifts: areaLifts,
			// huts: areaHuts,
			// aidrooms: areaAidRooms,
			// lodges: areaLodges,
			// equipment: areaEquipment,
			locations: areaLocations,
		};
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="flex flex-col items-center pt-8">
			<div className="w-full max-w-5xl">
				<AreaTabs value={value} onChange={handleTabChange} areas={areasWithEntities} />
				<AreaTable value={value} areas={areasWithEntities} employees={employees} />
			</div>
		</div>
	);
}

export default Areas;
