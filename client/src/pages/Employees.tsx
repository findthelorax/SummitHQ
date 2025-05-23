import React from 'react';
import { useMountain } from '../contexts/MountainContext';
import { useEmployees } from '../hooks/useEmployees';
import EmployeeForm from '../components/employee/EmployeeForm';
import EmployeeTableAgGrid from '../components/employee/EmployeeTableAgGrid';

const EmployeesPage: React.FC = () => {
    const { selectedMountain } = useMountain();
    const { employees, fetchEmployees, isLoading } = useEmployees(selectedMountain?.id);

    return (
        <>
            <EmployeeForm onCreated={fetchEmployees} />
            <EmployeeTableAgGrid employees={employees} fetchEmployees={fetchEmployees} isLoading={isLoading} />
        </>
    );
};

export default EmployeesPage;