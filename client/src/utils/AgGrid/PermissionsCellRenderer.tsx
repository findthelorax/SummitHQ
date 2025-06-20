function formatPermission(permission: string) {
	return permission
		.toLowerCase()
		.split('_')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}

export const PermissionsCellRenderer: React.FC<{ value?: string }> = (params) => {
	if (!params.value) return null;
	const permissions = params.value
		.split(',')
		.map((p: string) => p.trim())
		.filter(Boolean);
	return (
		<ul style={{ margin: 0, paddingLeft: '1.2em' }}>
			{permissions.map((perm: string, idx: number) => (
				<li key={idx} style={{ marginBottom: -5 }}>
					{formatPermission(perm)}
				</li>
			))}
		</ul>
	);
};
