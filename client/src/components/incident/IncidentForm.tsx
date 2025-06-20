import * as React from 'react';
import { useState, useMemo, useCallback } from 'react';
import { useMountain } from '../../contexts/MountainContext';
import { useSnackbarContext } from '../../contexts/SnackbarContext';
import IncidentLogTimePicker from './IncidentLogTimePicker';
import { FiSend, FiTrash2, FiDownload } from 'react-icons/fi';
import { useIncidents } from '../../hooks/useIncidents';
import { useLocations } from '../../hooks/useLocations';
import { useEmployees } from '../../hooks/employee/useEmployees';
import type { IncidentInputPayload } from '../../api/IncidentAPI';
import {
	INCIDENT_STATUS,
	LOCATION_TYPE,
	DEPARTMENT,
	INCIDENT_STATUS_LABELS,
	LOCATION_TYPE_LABELS,
	enumToOptions,
} from '../../types/generated-enums';

const LOCATION_TYPE_OPTIONS = enumToOptions(LOCATION_TYPE, LOCATION_TYPE_LABELS);
const INCIDENT_STATUS_OPTIONS = enumToOptions(INCIDENT_STATUS, INCIDENT_STATUS_LABELS);

const InputField = ({
	label,
	name,
	value,
	onChange,
	...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => (
	<div className="w-full sm:w-auto flex-1 min-w-[220px]">
		<label className="block mb-1 font-semibold" htmlFor={name}>
			{label}
		</label>
		<input id={name} name={name} value={value} onChange={onChange} className="input" {...props} />
	</div>
);

const TextAreaField = ({
	label,
	name,
	value,
	onChange,
	...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) => (
	<div className="w-full sm:w-auto flex-1 min-w-[220px]">
		<label className="block mb-1 font-semibold" htmlFor={name}>
			{label}
		</label>
		<textarea id={name} name={name} value={value} onChange={onChange} className="input" {...props} />
	</div>
);

const SelectField = ({
	label,
	value,
	onChange,
	options,
	name,
	...props
}: {
	label: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	options: { value: string; label: string }[];
	name: string;
	[key: string]: any;
}) => (
	<div className="w-full sm:w-auto flex-1 min-w-[220px]">
		<label className="block mb-1 font-semibold" htmlFor={name}>
			{label}
		</label>
		<select value={value} onChange={onChange} name={name} id={name} className="dropdown" {...props}>
			{options.map((opt) => (
				<option key={opt.value} value={opt.value}>
					{opt.label}
				</option>
			))}
		</select>
	</div>
);

const EmployeeDropdown = ({
	employees,
	filteredEmployees,
	selectedEmployees,
	setSelectedEmployees,
	employeeInput,
	setEmployeeInput,
	employeeDropdown,
	setEmployeeDropdown,
}: any) => (
	<div className="relative">
		<InputField
			label=""
			name="employeeInput"
			value={employeeInput}
			onChange={(e) => {
				setEmployeeInput(e.target.value);
				setEmployeeDropdown(true);
			}}
			onFocus={() => setEmployeeDropdown(true)}
			onBlur={() => setTimeout(() => setEmployeeDropdown(false), 150)}
			placeholder="Type or select employees..."
			autoComplete="off"
		/>
		{employeeDropdown && filteredEmployees.length > 0 && (
			<ul className="dropdown-list">
				{filteredEmployees.map((emp: any) => (
					<li key={emp.id} className="dropdown-option" onMouseDown={(e) => e.preventDefault()}>
						<input
							type="checkbox"
							checked={selectedEmployees.includes(emp.id)}
							onChange={() => {
								setSelectedEmployees((prev: any[]) =>
									prev.includes(emp.id) ? prev.filter((id) => id !== emp.id) : [...prev, emp.id]
								);
							}}
						/>
						<span>
							{emp.firstName} {emp.lastName}
						</span>
					</li>
				))}
			</ul>
		)}
		<div className="flex flex-wrap gap-1 mt-1">
			{selectedEmployees.map((id: string) => {
				const emp = employees.find((e: any) => e.id === id);
				return (
					emp && (
						<span key={id} className="chip chip-blue">
							{emp.firstName} {emp.lastName}
							<button
								type="button"
								className="chip-remove"
								onClick={() => setSelectedEmployees((prev: any[]) => prev.filter((eid) => eid !== id))}
							>
								×
							</button>
						</span>
					)
				);
			})}
		</div>
	</div>
);

const getNowTimeString = () => {
	const now = new Date();
	return now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
};

const IncidentForm = () => {
	const { selectedMountain } = useMountain();
	const { showSnackbar } = useSnackbarContext();
	const [gridApi, setGridApi] = useState<any>(null);
	const [locationType, setLocationType] = useState<string>(LOCATION_TYPE.TRAIL);
	const [location, setLocation] = useState<any>(null);
	const [locationInput, setLocationInput] = useState('');
	const [showDropdown, setShowDropdown] = useState(false);
	const [selectedEmployees, setSelectedEmployees] = useState<any[]>([]);
	const [otherLocation, setOtherLocation] = useState('');
	const [selectedDepartment, setSelectedDepartment] = useState<DEPARTMENT | ''>(DEPARTMENT.PATROL);
	const [employeeInput, setEmployeeInput] = useState('');
	const [employeeDropdown, setEmployeeDropdown] = useState(false);
	const [callTimeSetByLocation, setCallTimeSetByLocation] = useState(false);

	const [newRow, setNewRow] = useState<IncidentInputPayload>({
		description: '',
		locationId: '',
		status: undefined,
		callTime: '',
		onSceneTime: '',
		stableTime: '',
		transportTime: '',
		emptyRun: false,
		employees: [],
		incidentEquipmentUsageLog: [],
	});

	const { createIncident } = useIncidents(selectedMountain?.id);
	const { locations } = useLocations(selectedMountain?.id);
	const { employees, departmentOptions } = useEmployees(selectedMountain?.id);

	const filteredLocations = useMemo(
		() =>
			locations.filter(
				(loc) =>
					loc.entityType === locationType &&
					(!locationInput || loc.name.toLowerCase().includes(locationInput.toLowerCase()))
			),
		[locations, locationType, locationInput]
	);

	const filteredEmployees = useMemo(
		() =>
			employees.filter((emp) => {
				const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase();
				return (
					(!selectedDepartment || emp.role?.department === selectedDepartment) &&
					(!employeeInput || fullName.includes(employeeInput.toLowerCase()))
				);
			}),
		[employees, selectedDepartment, employeeInput]
	);

	const handleTimeChange = useCallback((name: string, time: string | null) => {
		setNewRow((prevState) => ({
			...prevState,
			[name]: time || '',
		}));
	}, []);

	const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = event.target;
		setNewRow((prevState) => ({
			...prevState,
			[name]: value,
		}));
	}, []);

	const handleCheckboxChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = event.target;
		setNewRow((prevState) => ({
			...prevState,
			[name]: checked,
			onSceneTime: checked ? '' : prevState.onSceneTime,
			stableTime: checked ? '' : prevState.stableTime,
			transportTime: checked ? '' : prevState.transportTime,
		}));
	}, []);

	const handleLocationSelect = useCallback(
		(loc: any) => {
			setLocation(loc.id);
			setLocationInput(loc.name);
			setNewRow((prev) => ({
				...prev,
				location: loc.id,
				callTime: callTimeSetByLocation && prev.callTime ? prev.callTime : getNowTimeString(),
			}));
			if (!callTimeSetByLocation) setCallTimeSetByLocation(true);
			setShowDropdown(false);
		},
		[callTimeSetByLocation]
	);

	const handleLocationInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setLocationInput(e.target.value);
		setLocation(null);
		setShowDropdown(true);
	}, []);

	const handleOtherLocationInput = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setOtherLocation(e.target.value);
			setNewRow((prev) => ({
				...prev,
				location: e.target.value,
				callTime: callTimeSetByLocation && prev.callTime ? prev.callTime : getNowTimeString(),
			}));
			if (!callTimeSetByLocation) setCallTimeSetByLocation(true);
		},
		[callTimeSetByLocation]
	);

	const clearForm = useCallback(() => {
		setNewRow({
			description: '',
			locationId: '',
			status: undefined,
			callTime: '',
			onSceneTime: '',
			stableTime: '',
			transportTime: '',
			emptyRun: false,
			employees: [],
			incidentEquipmentUsageLog: [],
		});
		setLocationType(LOCATION_TYPE.TRAIL);
		setLocation(null);
		setLocationInput('');
		setOtherLocation('');
		setSelectedEmployees([]);
		setSelectedDepartment(DEPARTMENT.PATROL);
		setEmployeeInput('');
		setCallTimeSetByLocation(false);
	}, []);

	const handleSubmit = useCallback(async () => {
		try {
			if (
				!(newRow.callTime && !isNaN(new Date(newRow.callTime).getTime())) ||
				(!newRow.emptyRun &&
					(!(newRow.onSceneTime && !isNaN(new Date(newRow.onSceneTime).getTime())) ||
						!(newRow.stableTime && !isNaN(new Date(newRow.stableTime).getTime())) ||
						!(newRow.transportTime && !isNaN(new Date(newRow.transportTime).getTime()))))
			) {
				showSnackbar('Please enter a valid date.', 'error');
				return;
			}

			await createIncident({
				...newRow,
				employees: selectedEmployees,
			});

			showSnackbar('Incident log created!', 'success');
			setSelectedEmployees([]);
			setNewRow({
				description: '',
				locationId: '',
				status: undefined,
				callTime: '',
				onSceneTime: '',
				stableTime: '',
				transportTime: '',
				emptyRun: false,
				employees: [],
				incidentEquipmentUsageLog: [],
			});
			setLocationType(LOCATION_TYPE.TRAIL);
			setLocation(null);
			setLocationInput('');
			setOtherLocation('');
			setSelectedDepartment(DEPARTMENT.PATROL);
			setEmployeeInput('');
			setCallTimeSetByLocation(false);
		} catch (error) {
			showSnackbar('Error creating log', 'error');
		}
	}, [createIncident, newRow, selectedEmployees, showSnackbar]);

	return (
		<div className="incident-form-container mt-8">
			<div className="flex flex-wrap gap-4">
				{/* Row 1: Location Type, Location, Description */}
				<div className="w-full flex flex-wrap gap-4">
					<SelectField
						label="Location Type"
						name="locationType"
						value={locationType}
						onChange={(e) => {
							setLocationType(e.target.value);
							setLocation(null);
							setLocationInput('');
							setOtherLocation('');
						}}
						options={LOCATION_TYPE_OPTIONS}
					/>
					<div className="w-full sm:w-auto flex-1 min-w-[220px]">
						<label className="block mb-1 font-semibold">Location</label>
						{locationType !== LOCATION_TYPE.OTHER ? (
							<div className="relative">
								<InputField
									label=""
									name="locationInput"
									value={
										location
											? locations.find((l) => l.id === location)?.name || locationInput
											: locationInput
									}
									onChange={handleLocationInput}
									onFocus={() => setShowDropdown(true)}
									onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
									onKeyDown={(e) => {
										if (
											e.key === 'Tab' &&
											showDropdown &&
											filteredLocations.length > 0 &&
											!location
										) {
											e.preventDefault();
											handleLocationSelect(filteredLocations[0]);
										}
									}}
									placeholder="Type or select location..."
									autoComplete="off"
								/>
								{showDropdown && filteredLocations.length > 0 && (
									<ul className="dropdown-list">
										{filteredLocations.map((loc) => (
											<li
												key={loc.id}
												className="dropdown-option"
												onMouseDown={() => handleLocationSelect(loc)}
											>
												{loc.name}
											</li>
										))}
									</ul>
								)}
							</div>
						) : (
							<InputField
								label=""
								name="otherLocation"
								value={otherLocation}
								onChange={handleOtherLocationInput}
								placeholder="Enter location"
							/>
						)}
					</div>
					<TextAreaField
						label="Description"
						name="description"
						value={newRow.description}
						onChange={handleInputChange}
						rows={2}
						placeholder="Describe the incident..."
						required
					/>
				</div>
				{/* Row 2: Department, Employees, Status */}
				<div className="w-full flex flex-wrap gap-4">
					<SelectField
						label="Department"
						name="department"
						value={selectedDepartment}
						onChange={(e) => {
							setSelectedDepartment(e.target.value as DEPARTMENT);
							setEmployeeInput('');
						}}
						options={departmentOptions}
					/>
					<div className="w-full sm:w-auto flex-1 min-w-[220px]">
						<label className="block mb-1 font-semibold">Employees</label>
						<EmployeeDropdown
							employees={employees}
							filteredEmployees={filteredEmployees}
							selectedEmployees={selectedEmployees}
							setSelectedEmployees={setSelectedEmployees}
							employeeInput={employeeInput}
							setEmployeeInput={setEmployeeInput}
							employeeDropdown={employeeDropdown}
							setEmployeeDropdown={setEmployeeDropdown}
						/>
					</div>
					<SelectField
						label="Status"
						name="status"
						value={newRow.status || INCIDENT_STATUS.REPORTED}
						onChange={(e) =>
							setNewRow((prev) => ({
								...prev,
								status: e.target.value as INCIDENT_STATUS,
							}))
						}
						options={INCIDENT_STATUS_OPTIONS}
					/>
				</div>
				{/* Times, Dry Run, Buttons */}
				<div className="w-full flex flex-wrap gap-4 items-end">
					<IncidentLogTimePicker
						label="Call Time"
						name="callTime"
						value={newRow.callTime}
						handleTimeChange={handleTimeChange}
					/>
					<IncidentLogTimePicker
						label="On Scene"
						name="onSceneTime"
						value={newRow.onSceneTime}
						handleTimeChange={handleTimeChange}
						clear={newRow.emptyRun}
					/>
					<IncidentLogTimePicker
						label="Stable"
						name="stableTime"
						value={newRow.stableTime}
						handleTimeChange={handleTimeChange}
						clear={newRow.emptyRun}
					/>
					<IncidentLogTimePicker
						label="Transport"
						name="transportTime"
						value={newRow.transportTime}
						handleTimeChange={handleTimeChange}
						clear={newRow.emptyRun}
					/>
					<div className="flex items-center" style={{ marginBottom: '0.25rem' }}>
						<input
							type="checkbox"
							id="emptyRun"
							name="emptyRun"
							checked={newRow.emptyRun}
							onChange={handleCheckboxChange}
							className="form-checkbox mr-2"
							style={{ width: '1.5rem', height: '1.5rem' }}
						/>
						<label htmlFor="emptyRun" className="select-none text-lg font-semibold">
							Dry Run
						</label>
					</div>
				</div>
				{/* <div className="w-full flex items-center gap-2 mt-2">
					<input
						type="checkbox"
						id="emptyRun"
						name="emptyRun"
						checked={newRow.emptyRun}
						onChange={handleCheckboxChange}
						className="form-checkbox"
					/>
					<label htmlFor="emptyRun" className="select-none">
						Dry Run
					</label>
				</div> */}
				<div className="w-full flex gap-3 mt-4">
					<button
						type="button"
						onClick={handleSubmit}
						className="button-primary flex items-center gap-2 justify-center"
					>
						<FiSend className="w-5 h-5" />
						Submit
					</button>
					<button
						type="button"
						onClick={clearForm}
						className="button-secondary flex items-center gap-2 justify-center"
					>
						<FiTrash2 className="w-5 h-5" />
						Clear
					</button>
					<button
						type="button"
						onClick={() => gridApi && gridApi.exportDataAsCsv()}
						className="button-export flex items-center gap-2 justify-center"
					>
						<FiDownload className="w-5 h-5" />
						Export
					</button>
				</div>
			</div>
		</div>
	);
};

export default IncidentForm;
