import React from 'react';
import type { Employee, Trail, Lift, Hut, AidRoom, Lodge } from 'shared/types';
import { useMountain } from '../../contexts/MountainContext';
import { useAreas } from '../../hooks/useAreas';

interface AreaTableProps {
    value: number;
    employees: Employee[];
}

type EntityRow = {
    id: string;
    name: string;
    type: string;
    status?: string;
    length?: number;
    difficulty?: string;
    condition?: string;
    capacity?: number;
};

function getEntityRows(area: any): EntityRow[] {
    const rows: EntityRow[] = [];
    area.trails?.forEach((t: Trail) =>
        rows.push({
            id: t.id,
            name: t.name,
            type: 'Trail',
            status: t.status,
            length: t.length,
            difficulty: t.difficulty,
            condition: t.condition,
        })
    );
    area.lifts?.forEach((l: Lift) =>
        rows.push({
            id: l.id,
            name: l.name,
            type: 'Lift',
            status: l.status,
            capacity: l.capacity,
        })
    );
    area.lodges?.forEach((l: Lodge) =>
        rows.push({
            id: l.id,
            name: l.name,
            type: 'Lodge',
            status: l.status,
            capacity: l.capacity,
        })
    );
    area.huts?.forEach((h: Hut) =>
        rows.push({
            id: h.id,
            name: h.name,
            type: 'Hut',
            status: h.status,
        })
    );
    area.aidrooms?.forEach((a: AidRoom) =>
        rows.push({
            id: a.id,
            name: a.name,
            type: 'AidRoom',
            status: a.status,
        })
    );
    return rows;
}

const AreaTable: React.FC<AreaTableProps> = ({ value, employees }) => {
    const { selectedMountain } = useMountain();
    const { areas } = useAreas(selectedMountain?.id);

    return areas.map(
        (area, index) =>
            value === index && (
                <div key={area.id} className="overflow-x-auto mb-4">
                    <table className="min-w-full bg-white text-black rounded shadow">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Type</th>
                                <th className="px-4 py-2">Status</th>
                                <th className="px-4 py-2">Length</th>
                                <th className="px-4 py-2">Difficulty</th>
                                <th className="px-4 py-2">Condition</th>
                                <th className="px-4 py-2">Capacity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getEntityRows(area).map((entity) => (
                                <tr key={entity.id}>
                                    <td className="border px-4 py-2">{entity.name}</td>
                                    <td className="border px-4 py-2">{entity.type}</td>
                                    <td className="border px-4 py-2">{entity.status ?? ''}</td>
                                    <td className="border px-4 py-2">{entity.length ?? ''}</td>
                                    <td className="border px-4 py-2">{entity.difficulty ?? ''}</td>
                                    <td className="border px-4 py-2">{entity.condition ?? ''}</td>
                                    <td className="border px-4 py-2">{entity.capacity ?? ''}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )
    );
};

export default AreaTable;