import React, { useState } from 'react';
import { useEmployees } from '../../hooks/employee/useEmployees';
import { useMountain } from '../../contexts/MountainContext';
import type { RoleDTO } from '../../types/index';
import AdminRoleTableAgGrid from '../../components/employee/AdminRolesTableAgGrid';

const AdminRoles: React.FC = () => {
        const { selectedMountain, setSelectedMountain, mountains, fetchMountains, isLoadingMountains, updateMountain, deleteMountain, createMountain } = useMountain();
    const { roles, fetchRoles, isLoadingRoles, updateRole, deleteRole, createRole } = useEmployees(
        selectedMountain?.id
    );
	const [editingRole, setEditingRole] = useState<RoleDTO | null>(null);

	return (
		<>
			<AdminRoleTableAgGrid
				roles={roles}
				fetchRoles={fetchRoles}
				isLoading={isLoadingRoles}
				updateRole={updateRole}
				deleteRole={deleteRole}
				onAddRole={createRole}
				onEditRole={setEditingRole}
				mountainId={selectedMountain?.id ?? ''}
				mountainName={selectedMountain?.name ?? ''}
			/>
		</>
	);
};

export default AdminRoles;
