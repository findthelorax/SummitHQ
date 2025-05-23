import React from 'react';
import type { Lift } from 'shared/types';
import StatusToggleButton from '../buttons/StatusToggleButton';
import { STATUS } from 'shared/types/enums';
import { humanizeEnum } from 'shared/types/utils/utils';

interface LiftTableProps {
    lifts: Lift[];
    fetchLifts: () => Promise<void>;
    isLoading: boolean;
}

const LiftTable: React.FC<LiftTableProps> = ({ lifts, fetchLifts, isLoading }) => {
    return (
        <div className="rounded shadow bg-white text-black mx-auto w-fit">
            <table className="text-sm w-fit">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="px-2 py-2 text-left min-w-[120px]">Name</th>
                        <th className="px-2 py-2 text-left min-w-[140px]">Status</th>
                        <th className="px-2 py-2 text-left">Type</th>
                        <th className="px-2 py-2 text-left">Capacity</th>
                        <th className="px-2 py-2 text-left">Latitude</th>
                        <th className="px-2 py-2 text-left">Longitude</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <tr>
                            <td colSpan={6} className="px-2 py-8 text-center text-gray-500">
                                Loading lifts...
                            </td>
                        </tr>
                    ) : lifts.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="px-2 py-8 text-center text-gray-500">
                                No lifts found.
                            </td>
                        </tr>
                    ) : (
                        lifts.map((lift: Lift) => (
                            <tr key={lift.id} className="border-t">
                                <td className="px-2 py-2 min-w-[120px]">{lift.name}</td>
                                <td className="px-2 py-2 min-w-[140px]">
                                    <StatusToggleButton
                                        value={lift.status as STATUS}
                                        data={lift}
                                        type="lift"
                                        onStatusChange={fetchLifts}
                                    />
                                </td>
                                <td className="px-2 py-2">{humanizeEnum(lift.type)}</td>
                                <td className="px-2 py-2">{lift.capacity}</td>
                                <td className="px-2 py-2">
                                    {lift.latitude !== undefined && lift.latitude !== null ? lift.latitude.toString() : '-'}
                                </td>
                                <td className="px-2 py-2">
                                    {lift.longitude !== undefined && lift.longitude !== null
                                        ? lift.longitude.toString()
                                        : '-'}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default LiftTable;