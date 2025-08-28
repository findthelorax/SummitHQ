import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { mountainApi } from '../api/MountainAPI';
import type { MountainDTO } from '../types/index';
import type { MountainInputPayload } from '../api/MountainAPI';

type MountainContextType = {
	mountains: MountainDTO[];
	isLoadingMountains: boolean;
	selectedMountain: MountainDTO | null;
	setSelectedMountain: (mountain: MountainDTO | null, persist?: boolean) => void;
	fetchMountains: () => Promise<void>;
	createMountain: (mountain: MountainInputPayload) => Promise<MountainDTO>;
	updateMountain: (mountainId: string, updated: Partial<MountainInputPayload>) => Promise<MountainDTO>;
	deleteMountain: (mountainId: string) => Promise<void>;

	getWeather: (
		mountainId: string,
		params?: { limit?: number; offset?: number; order?: 'asc' | 'desc' }
	) => Promise<any[]>;
	getEmployees: (mountainId: string) => Promise<any[]>;
	getEquipment: (mountainId: string) => Promise<any[]>;
	getLocations: (mountainId: string) => Promise<any[]>;
	getLiftChecks: (mountainId: string) => Promise<any[]>;
};

const MountainContext = createContext<MountainContextType | undefined>(undefined);

const MountainProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [selectedMountain, setSelectedMountainState] = useState<MountainDTO | null>(null);
	const [mountains, setMountains] = useState<MountainDTO[]>([]);
	const [isLoadingMountains, setIsLoadingMountains] = useState(false);

	const fetchMountains = useCallback(async () => {
		setIsLoadingMountains(true);
		try {
			const data = await mountainApi.getAllMountains();
			setMountains(data);
		} finally {
			setIsLoadingMountains(false);
		}
	}, []);

	useEffect(() => {
		fetchMountains();
	}, [fetchMountains]);

	const setSelectedMountain = (mountain: MountainDTO | null, persist = true) => {
		setSelectedMountainState(mountain);
		if (persist) {
			if (mountain) {
				localStorage.setItem('selectedMountainId', mountain.id);
			} else {
				localStorage.removeItem('selectedMountainId');
			}
		}
	};

	useEffect(() => {
		const storedId = localStorage.getItem('selectedMountainId');
		if (storedId && mountains.length > 0) {
			const found = mountains.find((m) => m.id === storedId);
			if (found) setSelectedMountainState(found);
		}
	}, [mountains]);

	const createMountain = async (mountain: MountainInputPayload) => {
		const created = await mountainApi.createMountain(mountain);
		await fetchMountains();
		return created;
	};

	const updateMountain = async (mountainId: string, updated: Partial<MountainInputPayload>): Promise<MountainDTO> => {
		const updatedMountain = await mountainApi.updateMountain(mountainId, updated);
		await fetchMountains();
		return updatedMountain;
	};

	const deleteMountain = async (mountainId: string) => {
		await mountainApi.deleteMountain(mountainId);
		await fetchMountains();
	};

	const getWeather = async (
		mountainId: string,
		params?: { limit?: number; offset?: number; order?: 'asc' | 'desc' }
	) => {
		return await mountainApi.getWeather(mountainId, params);
	};
	const getEmployees = async (mountainId: string) => {
		return await mountainApi.getEmployees(mountainId);
	};
	const getEquipment = async (mountainId: string) => {
		return await mountainApi.getEquipment(mountainId);
	};
	const getLocations = async (mountainId: string) => {
		return await mountainApi.getLocations(mountainId);
	};
	const getLiftChecks = async (mountainId: string) => {
		return await mountainApi.getLiftChecks(mountainId);
	};
	return (
		<MountainContext.Provider
			value={{
				mountains,
				selectedMountain,
				isLoadingMountains,
				setSelectedMountain,
				fetchMountains,
				createMountain,
				updateMountain,
				deleteMountain,

				getWeather,
				getEmployees,
				getEquipment,
				getLocations,
				getLiftChecks,
			}}
		>
			{children}
		</MountainContext.Provider>
	);
};

export const useMountain = () => {
	const context = useContext(MountainContext);
	if (!context) throw new Error('useMountain must be used within a MountainProvider');
	return context;
};

export default MountainProvider;
