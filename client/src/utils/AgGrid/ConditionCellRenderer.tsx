import * as React from 'react';
import { useSnackbarContext } from '../../contexts/SnackbarContext';
import { TRAIL_CONDITION_LABELS } from '../../types/generated-enums';

export const ConditionCellRenderer: React.FC<any> = (params) => {
	const { value, data } = params;
	const { showSnackbar } = useSnackbarContext();

	const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newCondition = e.target.value;
		try {
			if (data) {
				await params.context.updateEntity(data.id, { condition: newCondition });
				showSnackbar(
					`${data.name} updated to "${
						TRAIL_CONDITION_LABELS[newCondition as keyof typeof TRAIL_CONDITION_LABELS]
					}"`,
					'success'
				);
			}
			if (params.context.fetchEntities) params.context.fetchEntities();
		} catch (err) {
			showSnackbar(
				`Failed to update ${data?.name ?? 'trail'} to "${
					TRAIL_CONDITION_LABELS[newCondition as keyof typeof TRAIL_CONDITION_LABELS]
				}"`,
				'error'
			);
		}
	};

	return (
		<select value={value} onChange={handleChange} className="trail-condition-dropdown">
			{Object.entries(TRAIL_CONDITION_LABELS).map(([key, label]) => (
				<option key={key} value={key}>
					{label}
				</option>
			))}
		</select>
	);
};