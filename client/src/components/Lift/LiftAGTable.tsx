import React, { useContext, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { useMountain } from '../../contexts/MountainContext';
import { useLifts } from '../../hooks/useLifts';
import StatusToggleButton from '../Buttons/StatusToggleButton';
import { placeholderFormatter } from '../../utils/placeHolderFormatter';

const LiftsTableAgGrid: React.FC = () => {
	const { selectedMountain } = useMountain();
	const { lifts, fetchLifts, isLoading } = useLifts(selectedMountain?.id);
	const [inputRow, setInputRow] = useState({
		name: '',
		area: '',
		status: '',
		equipment: '',
		coordinates: '',
	});

	interface InputRow {
		name: string;
		area: string;
		status: string;
		equipment: string;
		coordinates: string;
	}

	interface Coordinates {
		lat: number;
		lng: number;
	}

	interface LiftRow {
		name: string;
		area: string;
		status: string;
		equipment: string;
		coordinates: Coordinates | string;
	}

	interface CellValueChangedParams {
		node: { rowPinned?: string };
		newValue: string;
	}

	const columnDefs: Array<{
		headerName: string;
		field: keyof LiftRow;
		editable?: boolean;
		onCellValueChanged?: (params: CellValueChangedParams) => void;
		cellRenderer?: string;
		cellRendererParams?: Record<string, unknown>;
		valueFormatter?: (params: { value: Coordinates | string }) => string;
	}> = [
		{
			headerName: 'Name',
			field: 'name',
			editable: true,
			onCellValueChanged: (params: CellValueChangedParams) => {
				if (params.node.rowPinned === 'top') {
					setInputRow((prev) => ({ ...prev, name: params.newValue }));
				}
			},
		},
		// {
		// 	headerName: 'Area',
		// 	field: 'area',
		// 	valueGetter: (params: any) => areaMap[params.data.area] ?? 'Unknown',
		// },
		{
			headerName: 'Status',
			field: 'status',
			cellRenderer: 'statusToggleButton',
			cellRendererParams: { type: 'lift' },
		},
		{
			headerName: 'Location',
			field: 'coordinates',
			valueFormatter: (params: { value: Coordinates | string }) =>
				params.value && typeof params.value !== 'string'
					? `${params.value.lat}, ${params.value.lng}`
					: 'No coordinates',
		},
	];

	return (
		<div className="ag-theme-quartz-dark" style={{ height: '40vh', width: '100%' }}>
			<AgGridReact<LiftRow>
				columnDefs={columnDefs as any}
				rowData={lifts
					? lifts.map(lift => ({
						name: lift.name,
						area: '',
						status: lift.status as unknown as string,
						equipment: '',
						coordinates:
							lift.latitude !== null && lift.longitude !== null
								? { lat: Number(lift.latitude), lng: Number(lift.longitude) }
								: 'No coordinates',
					}))
					: []
				}
				pinnedTopRowData={[inputRow]}
				components={{ statusToggleButton: StatusToggleButton }}
			/>
		</div>
	);
};

export default LiftsTableAgGrid;
