import React, { useState } from 'react';
import { useEmployees } from '../../hooks/employee/useEmployees';
import { useMountain } from '../../contexts/MountainContext';
import type { EmployeeDTO, MountainDTO } from '../../types/index';
import AdminEmployeeTableAgGrid from '../../components/employee/AdminEmployeeTableAgGrid';

const AdminEmployees: React.FC = () => {
    const {
        employees,
        roles,
        isLoadingEmployees,
        fetchEmployees,
        updateEmployee,
        deleteEmployee,
        createEmployee,
    } = useEmployees();
    const { mountains } = useMountain();
const [editingEmployee, setEditingEmployee] = useState<EmployeeDTO | null>(null);

    return (
        <>
            <AdminEmployeeTableAgGrid
                employees={employees}
                mountains={mountains}
                roles={roles}
                isLoading={isLoadingEmployees}
                fetchEmployees={fetchEmployees}
                updateEmployee={updateEmployee}
                deleteEmployee={deleteEmployee}
                onAddEmployee={createEmployee}
                onEditEmployee={setEditingEmployee}
            />
        </>
    );
};

export default AdminEmployees;