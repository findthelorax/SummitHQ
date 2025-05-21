// useFetchLogs.js
import { useState, useEffect } from 'react';
import { api } from '../api/IncidentLogAPI';

export const useFetchLogs = (selectedMountain) => {
	const [rowData, setRowData] = useState([]);

	useEffect(() => {
		const fetchLogs = async () => {
			try {
				// Add a null check for selectedMountain
				if (selectedMountain && selectedMountain._id) {
					const logs = await api.getAllLogs(selectedMountain._id);
					const rowData = logs.map((log) => ({ id: log._id, ...log }));
					setRowData(Array.isArray(rowData) ? rowData : []);
				}
			} catch (error) {
				console.error('Error fetching logs', error);
				setRowData([]);
			}
		};

		fetchLogs();
	}, [selectedMountain]);

	return { rowData, setRowData };
};
