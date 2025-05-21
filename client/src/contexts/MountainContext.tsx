import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { mountainApi } from '../api/MountainAPI';
import type { Mountain } from 'shared/types';

type MountainContextType = {
    selectedMountain: Mountain | null;
    setSelectedMountain: (mountain: Mountain | null) => void;
    mountains: Mountain[];
    fetchMountains: () => Promise<void>;
    isLoading: boolean;
};

const MountainContext = createContext<MountainContextType | undefined>(undefined);

const MountainProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedMountain, setSelectedMountainState] = useState<Mountain | null>(null);
    const [mountains, setMountains] = useState<Mountain[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchMountains = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await mountainApi.getAllMountains();
            setMountains(data);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMountains();
    }, [fetchMountains]);

    const setSelectedMountain = (mountain: Mountain | null) => {
        setSelectedMountainState(mountain);
        if (mountain) {
            localStorage.setItem('selectedMountainId', mountain.id);
        } else {
            localStorage.removeItem('selectedMountainId');
        }
    };

    useEffect(() => {
        const storedId = localStorage.getItem('selectedMountainId');
        if (storedId && mountains.length > 0) {
            const found = mountains.find((m) => m.id === storedId);
            if (found) setSelectedMountainState(found);
        }
    }, [mountains]);

    return (
        <MountainContext.Provider
            value={{
                selectedMountain,
                setSelectedMountain,
                mountains,
                fetchMountains,
                isLoading,
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