import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatsCard from './StatsCard';
import { FaSkiing, FaUserFriends, FaWarehouse, FaTools, FaClinicMedical, FaHome, FaHiking } from 'react-icons/fa';
import { TbAerialLift, TbTent } from 'react-icons/tb';
import { GiWoodCabin } from 'react-icons/gi';
import { MdOutlineReportProblem } from 'react-icons/md';
import {
	TRAIL_DIFFICULTY,
	TRAIL_DIFFICULTY_LABELS,
	LIFT_TYPE,
	LIFT_TYPE_LABELS,
	INCIDENT_STATUS,
	EMPLOYEE_STATUS,
	EQUIPMENT_STATUS,
} from '../../types/generated-enums';
import type { MountainDTO } from '../../types/index';

import { useMountain } from '../../contexts/MountainContext';
import { useAidRooms } from '../../hooks/useAidRooms';
import { useHuts } from '../../hooks/useHuts';
import { useLodges } from '../../hooks/useLodges';
import { useLifts } from '../../hooks/useLifts';
import { useTrails } from '../../hooks/useTrails';
import { useEmployees } from '../../hooks/employee/useEmployees';
import { useEquipment } from '../../hooks/useEquipment';
import { useIncidents } from '../../hooks/useIncidents';

interface MountainStatsPanelProps {
	mountain?: MountainDTO;
}

const LoadingStats: React.FC = () => (
	<div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
		{[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
			<div
				key={i}
				style={{
					background: '#232b3a',
					borderRadius: 16,
					width: 220,
					height: 140,
					margin: 8,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					opacity: 0.6,
				}}
			>
				<div
					className="animate-pulse"
					style={{ width: 80, height: 20, background: '#3b4252', borderRadius: 4, marginBottom: 12 }}
				/>
				<div
					className="animate-pulse"
					style={{ width: 120, height: 32, background: '#3b4252', borderRadius: 4 }}
				/>
			</div>
		))}
	</div>
);

const MountainStatsPanel: React.FC<MountainStatsPanelProps> = ({ mountain }) => {
	const navigate = useNavigate();
	if (!mountain) return <LoadingStats />;

	const { getWeather } = useMountain();
	const [latestWeather, setLatestWeather] = useState<any | null>(null);

	useEffect(() => {
		if (mountain) {
			getWeather(mountain.id, { limit: 1, order: 'desc' }).then((data) => {
				setLatestWeather(data[0] || null);
			});
		}
	}, [mountain, getWeather]);

	// Trails
	const { trails } = useTrails(mountain.id);
	const trailsOpen = trails.filter((t) => t.status === 'OPEN').length;
	const trailsClosed = trails.filter((t) => t.status !== 'OPEN').length;
	const totalTrails = trails.length;
	const percentOpen = totalTrails > 0 ? Math.round((trailsOpen / totalTrails) * 100) : 0;
	const green = trails.filter((t) => t.difficulty === TRAIL_DIFFICULTY.GREEN_CIRCLE).length;
	const blue = trails.filter((t) => t.difficulty === TRAIL_DIFFICULTY.BLUE_SQUARE).length;
	const black = trails.filter((t) => t.difficulty === TRAIL_DIFFICULTY.BLACK_DIAMOND).length;

	// Lifts
	const { lifts } = useLifts(mountain.id);
	const liftsOpen = lifts.filter((l) => l.status === 'OPEN').length;
	const liftsClosed = lifts.filter((l) => l.status !== 'OPEN').length;
	const totalLifts = lifts.length;
	const percentLiftsOpen = totalLifts > 0 ? Math.round((liftsOpen / totalLifts) * 100) : 0;
	const liftTypes = Object.values(LIFT_TYPE).reduce((acc, type) => {
		acc[type] = lifts.filter((l) => l.type === type && l.status === 'OPEN').length;
		return acc;
	}, {} as Record<LIFT_TYPE, number>);

	// Aid Rooms
	const { aidRooms } = useAidRooms(mountain.id);
	const aidRoomsByArea = aidRooms.reduce((acc, ar) => {
		const areaName = ar.location?.area?.name || 'Unknown Area';
		if (!acc[areaName]) acc[areaName] = [];
		acc[areaName].push(ar);
		return acc;
	}, {} as Record<string, typeof aidRooms>);
	const totalAidRooms = aidRooms.length;

	// Huts
	const { huts } = useHuts(mountain.id);
	const totalHuts = huts.length;
	const hutsByArea = huts.reduce((acc, hut) => {
		const areaName = hut.location?.area?.name || 'Unknown Area';
		if (!acc[areaName]) acc[areaName] = [];
		acc[areaName].push(hut);
		return acc;
	}, {} as Record<string, typeof huts>);

	// Lodges
	const { lodges } = useLodges(mountain.id);
	const totalLodges = lodges.length;
	const lodgesByArea = lodges.reduce((acc, lodge) => {
		const areaName = lodge.location?.area?.name || 'Unknown Area';
		if (!acc[areaName]) acc[areaName] = [];
		acc[areaName].push(lodge);
		return acc;
	}, {} as Record<string, typeof lodges>);

	// Employees
	const { employees } = useEmployees(mountain.id);
	const totalEmployees = employees.length;
	const activeEmployees = employees.filter((e) => e.status === EMPLOYEE_STATUS.ACTIVE).length;

	// Equipment
	const { equipment } = useEquipment(mountain.id);
	const totalEquipment = equipment.length;
	const equipmentByStatus = Object.values(EQUIPMENT_STATUS).reduce((acc, status) => {
		acc[status] = equipment.filter((eq) => eq.status === status).length;
		return acc;
	}, {} as Record<EQUIPMENT_STATUS, number>);

	// Incidents
	const { incidents } = useIncidents(mountain.id);
	const totalIncidents = incidents.length;
	const incidentsByStatus = Object.values(INCIDENT_STATUS).reduce((acc, status) => {
		acc[status] = incidents.filter((inc) => inc.status === status).length;
		return acc;
	}, {} as Record<INCIDENT_STATUS, number>);

	return (
		<div
			style={{
				display: 'grid',
				gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
				gap: 24,
				width: '100%',
				alignItems: 'stretch',
			}}
		>
			{/* Weather Card */}
			<StatsCard
				title="Weather"
				icon={<FaHome />}
				accentColor="#38bdf8"
				stats={
					latestWeather
						? [
								{
									label: 'Temp',
									value: `${
										latestWeather.temperature !== undefined
											? Number(latestWeather.temperature).toFixed(2)
											: '-'
									}°F`,
								},
								{
									label: 'Feels Like',
									value: `${
										latestWeather.feelsLikeTemperature !== undefined
											? Number(latestWeather.feelsLikeTemperature).toFixed(2)
											: '-'
									}°F`,
								},
								{
									label: 'Humidity',
									value: `${
										latestWeather.humidity !== undefined
											? Number(latestWeather.humidity).toFixed(2)
											: '-'
									}%`,
								},
								{
									label: 'Wind',
									value: `${
										latestWeather.windSpeed !== undefined
											? Number(latestWeather.windSpeed).toFixed(2)
											: '-'
									} mph ${latestWeather.windDirection ?? ''}`,
								},
								{ label: 'Conditions', value: latestWeather.conditions ?? '-' },
						  ]
						: [{ label: 'No data', value: '-' }]
				}
			/>
			{/* Trails */}
			<StatsCard
				title="Trails"
				icon={<FaSkiing />}
				accentColor="#22c55e"
				stats={[
					{ label: 'Open', value: trailsOpen, subValue: `${percentOpen}% open` },
					{ label: 'Closed', value: trailsClosed },
					{
						label: TRAIL_DIFFICULTY_LABELS[TRAIL_DIFFICULTY.GREEN_CIRCLE],
						value: green,
						subValue: `${totalTrails ? Math.round((green / totalTrails) * 100) : 0}%`,
					},
					{
						label: TRAIL_DIFFICULTY_LABELS[TRAIL_DIFFICULTY.BLUE_SQUARE],
						value: blue,
						subValue: `${totalTrails ? Math.round((blue / totalTrails) * 100) : 0}%`,
					},
					{
						label: TRAIL_DIFFICULTY_LABELS[TRAIL_DIFFICULTY.BLACK_DIAMOND],
						value: black,
						subValue: `${totalTrails ? Math.round((black / totalTrails) * 100) : 0}%`,
					},
				]}
				onTitleClick={() => navigate(`/trails`)}
			/>
			{/* Lifts */}
			<StatsCard
				title="Lifts"
				icon={<TbAerialLift />}
				accentColor="#3b82f6"
				stats={[
					{ label: 'Open', value: liftsOpen, subValue: `${percentLiftsOpen}% open` },
					{ label: 'Closed', value: liftsClosed },
					{ label: 'Total', value: totalLifts },
					...Object.entries(liftTypes).map(([type, count]) => ({
						label: `${LIFT_TYPE_LABELS[type as keyof typeof LIFT_TYPE_LABELS] || type} Open`,
						value: count,
					})),
				]}
				onTitleClick={() => navigate(`/lifts`)}
			/>
			{/* Aid Rooms */}
			<StatsCard
				title="Aid Rooms"
				icon={<FaClinicMedical />}
				accentColor="#f59e42"
				stats={[
					{ label: 'Total', value: totalAidRooms },
					...Object.entries(aidRoomsByArea).map(([areaId, ars]) => ({
						label: `Area ${areaId}`,
						value: ars.length,
					})),
				]}
				onTitleClick={() => navigate(`/aidRooms`)}
			/>
			{/* Huts */}
			<StatsCard
				title="Huts"
				icon={<TbTent />}
				accentColor="#eab308"
				stats={[
					{ label: 'Total', value: totalHuts },
					...Object.entries(hutsByArea).map(([areaId, huts]) => ({
						label: `Area ${areaId}`,
						value: huts.length,
					})),
				]}
				onTitleClick={() => navigate(`/huts`)}
			/>
			{/* Lodges */}
			<StatsCard
				title="Lodges"
				icon={<GiWoodCabin />}
				accentColor="#a855f7"
				stats={[
					{ label: 'Total', value: totalLodges },
					...Object.entries(lodgesByArea).map(([areaId, lodges]) => ({
						label: `Area ${areaId}`,
						value: lodges.length,
					})),
				]}
				onTitleClick={() => navigate(`/lodges`)}
			/>
			{/* Employees */}
			<StatsCard
				title="Employees"
				icon={<FaUserFriends />}
				accentColor="#f43f5e"
				stats={[
					{ label: 'Total', value: totalEmployees },
					{ label: 'Active', value: activeEmployees },
				]}
				onTitleClick={() => navigate(`/employees`)}
			/>
			{/* Equipment */}
			<StatsCard
				title="Equipment"
				icon={<FaTools />}
				accentColor="#0ea5e9"
				stats={[
					{ label: 'Total', value: totalEquipment },
					...Object.entries(equipmentByStatus).map(([status, count]) => ({
						label: status
							.replace(/_/g, ' ')
							.toLowerCase()
							.replace(/\b\w/g, (c) => c.toUpperCase()),
						value: count,
					})),
				]}
				onTitleClick={() => navigate(`/equipment`)}
			/>
			{/* Incidents */}
			<StatsCard
				title="Incidents"
				icon={<MdOutlineReportProblem />}
				accentColor="#f87171"
				stats={[
					{ label: 'Total', value: totalIncidents },
					...Object.entries(incidentsByStatus).map(([status, count]) => ({
						label: status
							.replace(/_/g, ' ')
							.toLowerCase()
							.replace(/\b\w/g, (c) => c.toUpperCase()),
						value: count,
					})),
				]}
				onTitleClick={() => navigate(`/incidents`)}
			/>
		</div>
	);
};

export default MountainStatsPanel;
