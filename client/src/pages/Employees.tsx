import React, { useState } from 'react';
import { useMountain } from '../contexts/MountainContext';
import { useEmployees } from '../hooks/employee/useEmployees';
import type { EmployeeDTO } from '../types/index';
import BaseEmployeeTableAgGrid from '../components/employee/BaseEmployeeTableAgGrid';
import NoSelectionNotice from '../components/common/NoSelectionNotice';

const EmployeesPage: React.FC = () => {
    const { mountains, selectedMountain } = useMountain();
    const {
        employees,
        isLoadingEmployees,
        updateEmployee,
        deleteEmployee,
        createEmployee,
        roles,
        fetchEmployees,
    } = useEmployees(selectedMountain?.id);
const [editingEmployee, setEditingEmployee] = useState<EmployeeDTO | null>(null);

    if (!selectedMountain) {
        return (
            <NoSelectionNotice
                title="No Mountain Selected"
                message={
                    <>
                        Please select a mountain to view its employees.<br />
                        You can choose a mountain from the menu above.
                    </>
                }
            />
        );
    }

    const filteredEmployees = employees.filter((emp) =>
        emp.mountainAssignments?.some((a) => a.mountain?.id === selectedMountain.id)
    );

    return (
        <>
            <BaseEmployeeTableAgGrid
                employees={filteredEmployees}
                fetchEmployees={fetchEmployees}
                isLoading={isLoadingEmployees}
                roles={roles}
                mountains={mountains}
                mountainId={selectedMountain.id}
                mountainName={selectedMountain.name}
            />
        </>
    );
};

export default EmployeesPage;