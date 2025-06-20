import React, { useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { themeQuartz, colorSchemeDarkBlue } from 'ag-grid-community';
import { IncidentsTableAgGridProps } from '../../utils/AgGrid/tableTypes';
import { INCIDENT_STATUS_LABELS } from '../../types/generated-enums';
import { useSnackbarContext } from '../../contexts/SnackbarContext';
import { useAreas } from '../../hooks/useAreas';
import { useLocations } from '../../hooks/useLocations';
import { useAgGridAutoSize } from '../../utils/AgGrid/hooks/useAgGridAutoSize';
import { getEmptyNewIncidentRow } from '../../utils/AgGrid/rowFactories';
import { incidentRowToInputPayload } from '../../utils/AgGrid/InputPayloadConversion';
import ActionButtons from '../buttons/ActionButtons';
import { generateActionCellRendererParams } from '../../utils/common/getActionButtonParams';

const myTheme = themeQuartz.withPart(colorSchemeDarkBlue);

const timeFields = ['callTime', 'onSceneTime', 'stableTime', 'transportTime'];

function formatTimeDisplay(value: any) {
	if (!value) return '';
	const date = new Date(value);
	return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
}

// Helper to split ISO or blank into {hh, mm, ampm}
function parseTimeParts(iso: string | null | undefined) {
	if (!iso) return { hh: '', mm: '', ampm: 'AM' };
	const d = new Date(iso);
	let hours = d.getHours();
	const mm = String(d.getMinutes()).padStart(2, '0');
	const ampm = hours >= 12 ? 'PM' : 'AM';
	hours = hours % 12;
	hours = hours ? hours : 12;
	return { hh: String(hours).padStart(2, '0'), mm, ampm };
}

// Helper to build ISO from {hh, mm, ampm}
function buildTimeISO(row: any, field: string, hh: string, mm: string, ampm: string) {
	if (!hh || !mm || !ampm) return { ...row, [field]: null };
	let hours = parseInt(hh, 10);
	if (ampm === 'PM' && hours !== 12) hours += 12;
	if (ampm === 'AM' && hours === 12) hours = 0;
	const base = new Date(row[field] || new Date());
	base.setHours(hours, parseInt(mm, 10), 0, 0);
	return { ...row, [field]: base.toISOString() };
}

type TimeInputRowProps = {
	value: { hh: string; mm: string; ampm: string };
	onChange: (val: { hh: string; mm: string; ampm: string }) => void;
	onNow: () => void;
	onClear: () => void;
};

function TimeInputRow({ value, onChange, onNow, onClear }: TimeInputRowProps) {
	const { hh, mm, ampm } = value;
	const hourRef = React.useRef<HTMLInputElement>(null);
	const minRef = React.useRef<HTMLInputElement>(null);
	const ampmRef = React.useRef<HTMLSelectElement>(null);

	// Helper to move focus
	const focus = (ref: React.RefObject<HTMLInputElement | HTMLSelectElement | null>) => {
		if (ref && ref.current) ref.current.focus();
	};

	return (
		<span style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
			<input
				ref={hourRef}
				type="text"
				className="time-input"
				value={hh}
				maxLength={2}
				style={{ width: 28, textAlign: 'center' }}
				placeholder="hh"
				onChange={(e) => {
					let val = e.target.value.replace(/\D/g, '').slice(0, 2);
					if (parseInt(val, 10) > 12) val = '12';
					onChange({ hh: val, mm, ampm });
					if (val.length === 2) focus(minRef);
				}}
				onKeyDown={(e) => {
					e.stopPropagation();
					if (e.key === 'ArrowRight' || e.key === 'Tab') {
						e.preventDefault();
						focus(minRef);
					}
					if (e.key === 'ArrowLeft' || (e.shiftKey && e.key === 'Tab')) {
						e.preventDefault();
						// Optionally: focus previous cell if needed
					}
				}}
				onFocus={(e) => e.target.select()}
			/>
			:
			<input
				ref={minRef}
				type="text"
				className="time-input"
				value={mm}
				maxLength={2}
				style={{ width: 28, textAlign: 'center' }}
				placeholder="mm"
				onChange={(e) => {
					let val = e.target.value.replace(/\D/g, '').slice(0, 2);
					if (parseInt(val, 10) > 59) val = '59';
					onChange({ hh, mm: val, ampm });
					if (val.length === 2) focus(ampmRef);
				}}
				onKeyDown={(e) => {
					e.stopPropagation();
					if (e.key === 'ArrowLeft') {
						e.preventDefault();
						focus(hourRef);
					}
					if (e.key === 'ArrowRight' || e.key === 'Tab') {
						e.preventDefault();
						focus(ampmRef);
					}
					if (e.shiftKey && e.key === 'Tab') {
						e.preventDefault();
						focus(hourRef);
					}
				}}
				onFocus={(e) => e.target.select()}
			/>
			<select
				ref={ampmRef}
				className="time-input"
				value={ampm}
				style={{ width: 48 }}
				onChange={(e) => onChange({ hh, mm, ampm: e.target.value })}
				onKeyDown={(e) => {
					e.stopPropagation();
					if (e.key === 'ArrowLeft' || (e.shiftKey && e.key === 'Tab')) {
						e.preventDefault();
						focus(minRef);
					}
					// Optionally: handle ArrowRight/Tab to move to next cell
				}}
			>
				<option value="AM">AM</option>
				<option value="PM">PM</option>
			</select>
			<span
				style={{ cursor: 'pointer', marginLeft: 2 }}
				title="Set to now"
				onMouseDown={(e) => e.preventDefault()}
				onClick={onNow}
			>
				🕒
			</span>
			<span
				style={{ cursor: 'pointer', color: 'red', fontWeight: 'bold', marginLeft: 2 }}
				title="Clear"
				onMouseDown={(e) => e.preventDefault()}
				onClick={onClear}
			>
				✖️
			</span>
		</span>
	);
}

const IncidentTableAgGrid: React.FC<IncidentsTableAgGridProps> = ({
	incidents,
	fetchIncidents,
	updateIncident,
	isLoading,
	mountainId,
	onAddIncident,
	deleteIncident,
}) => {
	const { areas } = useAreas(mountainId);
	const { locations } = useLocations(mountainId);
	const gridRef = useRef<AgGridReact>(null);
	const { onFirstDataRendered, onGridSizeChanged } = useAgGridAutoSize();
	const { showSnackbar } = useSnackbarContext();
	const [pageSize, setPageSize] = useState(25);

	// Add row state
	const [addIncidentRow, setAddIncidentRow] = useState<any>(getEmptyNewIncidentRow());
	// Edit row state
	const [editIncidentRow, setEditIncidentRow] = useState<any>({});
	const [editingRowId, setEditingRowId] = useState<string | null>(null);

	// Column definitions
	const columnDefs = useMemo(
		() => [
			{
				headerName: 'Description',
				field: 'description',
				flex: 2,
				editable: (params: any) => params.data?.isNew || params.data?.id === editingRowId,
				cellEditor: 'agTextCellEditor',
			},
			{
				headerName: 'Status',
				field: 'status',
				editable: (params: any) => params.data?.isNew || params.data?.id === editingRowId,
				cellEditor: 'agSelectCellEditor',
				cellEditorParams: {
					values: Object.keys(INCIDENT_STATUS_LABELS),
				},
				valueFormatter: (params: any) =>
					params.value ? INCIDENT_STATUS_LABELS[params.value as keyof typeof INCIDENT_STATUS_LABELS] : '-',
			},
			{
				headerName: 'Employees',
				field: 'employees',
				valueFormatter: (params: any) => {
					if (!params.value || params.value.length === 0) return 'None';
					return params.value.map((emp: any) => `${emp.firstName} ${emp.lastName}`).join(', ');
				},
			},
			{
				headerName: 'Area',
				field: 'areaId',
				flex: 1,
				editable: (params: any) => params.data?.isNew || params.data?.id === editingRowId,
				cellEditor: 'agSelectCellEditor',
				cellEditorParams: {
					values: ['', ...(areas?.map((a) => a.id) ?? [])],
				},
				valueFormatter: (params: any) => {
					const area = areas?.find((a) => a.id === params.value);
					return area ? area.name : 'None';
				},
			},
			{
				headerName: 'Location',
				field: 'locationId',
				flex: 1,
				editable: (params: any) => params.data?.isNew || params.data?.id === editingRowId,
				cellEditor: 'agSelectCellEditor',
				cellEditorParams: {
					values: ['', ...(locations?.map((l) => l.id) ?? [])],
				},
				valueFormatter: (params: any) => {
					const l = locations?.find((l) => l.id === params.value);
					return l ? `${l.entityType}: ${l.name}` : 'None';
				},
			},
			{
				headerName: 'Latitude',
				field: 'latitude',
				editable: (params: any) => params.data?.isNew || params.data?.id === editingRowId,
			},
			{
				headerName: 'Longitude',
				field: 'longitude',
				editable: (params: any) => params.data?.isNew || params.data?.id === editingRowId,
			},
			...timeFields.map((field) => ({
				headerName: field
					.replace(/([A-Z])/g, ' $1')
					.replace(/^./, (str) => str.toUpperCase())
					.trim(),
				field,
				editable: false,
				minWidth: 200,
				cellRenderer: (params: any) => {
					// Add row
					if (params.data?.isNew) {
						const { hh, mm, ampm } = parseTimeParts(addIncidentRow[field]);
						return (
							<TimeInputRow
								value={{ hh, mm, ampm }}
								onChange={({ hh, mm, ampm }) =>
									setAddIncidentRow(buildTimeISO(addIncidentRow, field, hh, mm, ampm))
								}
								onNow={() => {
									const now = new Date();
									let hours = now.getHours();
									let ampmNow = hours >= 12 ? 'PM' : 'AM';
									let displayHours = hours % 12;
									displayHours = displayHours ? displayHours : 12;
									setAddIncidentRow(
										buildTimeISO(
											addIncidentRow,
											field,
											String(displayHours).padStart(2, '0'),
											String(now.getMinutes()).padStart(2, '0'),
											ampmNow
										)
									);
								}}
								onClear={() => setAddIncidentRow({ ...addIncidentRow, [field]: null })}
							/>
						);
					}
					// Edit row
					if (params.data?.id === editingRowId) {
						const { hh, mm, ampm } = parseTimeParts(editIncidentRow[field]);
						return (
							<TimeInputRow
								value={{ hh, mm, ampm }}
								onChange={({ hh, mm, ampm }) =>
									setEditIncidentRow(buildTimeISO(editIncidentRow, field, hh, mm, ampm))
								}
								onNow={() => {
									const now = new Date();
									let hours = now.getHours();
									let ampmNow = hours >= 12 ? 'PM' : 'AM';
									let displayHours = hours % 12;
									displayHours = displayHours ? displayHours : 12;
									setEditIncidentRow(
										buildTimeISO(
											editIncidentRow,
											field,
											String(displayHours).padStart(2, '0'),
											String(now.getMinutes()).padStart(2, '0'),
											ampmNow
										)
									);
								}}
								onClear={() => setEditIncidentRow({ ...editIncidentRow, [field]: null })}
							/>
						);
					}
					// Normal display
					return <span className="time-cell">{formatTimeDisplay(params.value)}</span>;
				},
			})),
			{
				headerName: 'Actions',
				cellRenderer: ActionButtons,
				cellRendererParams: generateActionCellRendererParams(
					editingRowId,
					addIncidentRow,
					setAddIncidentRow,
					onAddIncident
						? async (row: any) => {
								if (!onAddIncident) return;
								await onAddIncident(incidentRowToInputPayload(row));
								setAddIncidentRow(getEmptyNewIncidentRow());
								fetchIncidents();
						  }
						: undefined,
					(row: any) => {
						setEditIncidentRow({ ...row });
						setEditingRowId(row.id ?? '');
					},
					async (row: any) => {
						await updateIncident(row.id ?? '', incidentRowToInputPayload(editIncidentRow));
						setEditingRowId(null);
						setEditIncidentRow({});
						fetchIncidents();
					},
					() => {
						setEditingRowId(null);
						setEditIncidentRow({});
					},
					(row: any) => {
						if (deleteIncident) deleteIncident(row.id);
					},
					fetchIncidents,
					(msg: string, type?: string) =>
						showSnackbar(msg, (type as 'success' | 'error' | 'info' | 'warning') ?? 'info'),
					getEmptyNewIncidentRow,
					['description', 'status', 'areaId', 'locationId']
				),
				minWidth: 120,
				pinned: 'right' as 'right',
				suppressSizeToFit: true,
			},
		],
		[
			areas,
			locations,
			editingRowId,
			editIncidentRow,
			addIncidentRow,
			setAddIncidentRow,
			setEditIncidentRow,
			updateIncident,
			fetchIncidents,
			onAddIncident,
			deleteIncident,
			showSnackbar,
		]
	);

	// Only show add row at top, not when editing
	const rowData = useMemo(() => {
		const rows = [...incidents];
		if (Object.values(addIncidentRow).some((v) => v !== null && v !== '' && v !== undefined)) {
			rows.unshift({ ...addIncidentRow, isNew: true });
		}
		return rows;
	}, [addIncidentRow, incidents]);

	return (
		<div className="ag-grid">
			<div id="ag-table-container" className="ag-theme-quartz-dark">
				<AgGridReact
					ref={gridRef}
					columnDefs={columnDefs}
					rowData={rowData}
					defaultColDef={{
						resizable: true,
						sortable: true,
						filter: true,
						flex: 1,
					}}
					domLayout="autoHeight"
					animateRows={true}
					theme={myTheme}
					overlayLoadingTemplate={`<span class="ag-overlay-loading-center">Loading incidents...</span>`}
					loadingOverlayComponentParams={{ loadingMessage: `Loading incidents...` }}
					loadingOverlayComponent="agLoadingOverlay"
					noRowsOverlayComponent="agNoRowsOverlay"
					noRowsOverlayComponentParams={{ noRowsMessage: `No incidents found.` }}
					loading={isLoading}
					pagination={true}
					paginationPageSize={pageSize}
					paginationAutoPageSize={false}
					paginationPageSizeSelector={[25, 50, 100]}
					onGridSizeChanged={onGridSizeChanged}
					onFirstDataRendered={onFirstDataRendered}
					getRowId={(params) => params.data.id ?? 'new'}
					context={{
						fetchEntities: fetchIncidents,
					}}
					singleClickEdit={true}
					stopEditingWhenCellsLoseFocus={true}
				/>
			</div>
		</div>
	);
};

export default IncidentTableAgGrid;
