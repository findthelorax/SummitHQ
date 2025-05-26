import * as React from 'react';
import { useState, useMemo } from 'react';
import { useMountain } from '../../contexts/MountainContext';
import { useSnackbarContext } from '../../contexts/SnackbarContext';
import IncidentLogTimePicker from './IncidentLogTimePicker';
import { FiSend, FiTrash2, FiDownload } from 'react-icons/fi';
import { useIncidents } from '../../hooks/useIncidents';
import { useLocations } from '../../hooks/useLocations';
import { useEmployees } from '../../hooks/useEmployees';
import type { IncidentInputPayload } from '../../api/IncidentsAPI';
import { LOCATION_TYPE, DEPARTMENT } from 'shared/types/enums';
import { LOCATION_TYPE_LABELS, enumToOptions } from 'shared/types/utils/enumLabels';

const LOCATION_TYPE_OPTIONS = enumToOptions(LOCATION_TYPE, LOCATION_TYPE_LABELS);

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
        <label className="block mb-1 font-semibold">{label}</label>
        <select value={value} onChange={onChange} name={name} className="dropdown" {...props}>
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
        <input
            type="text"
            value={employeeInput}
            onChange={(e) => {
                setEmployeeInput(e.target.value);
                setEmployeeDropdown(true);
            }}
            onFocus={() => setEmployeeDropdown(true)}
            onBlur={() => setTimeout(() => setEmployeeDropdown(false), 150)}
            placeholder="Type or select employees..."
            className="w-full border rounded px-3 py-2 mb-1"
            autoComplete="off"
        />
        {employeeDropdown && filteredEmployees.length > 0 && (
            <ul className="absolute z-10 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded w-full max-h-40 overflow-y-auto shadow">
                {filteredEmployees.map((emp: any) => (
                    <li
                        key={emp.id}
                        className="px-3 py-2 flex items-center gap-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900"
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        <input
                            type="checkbox"
                            checked={selectedEmployees.includes(emp.id)}
                            onChange={() => {
                                setSelectedEmployees((prev: any[]) =>
                                    prev.includes(emp.id)
                                        ? prev.filter((id) => id !== emp.id)
                                        : [...prev, emp.id]
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
                        <span
                            key={id}
                            className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 px-2 py-1 rounded text-xs flex items-center gap-1"
                        >
                            {emp.firstName} {emp.lastName}
                            <button
                                type="button"
                                className="ml-1 text-red-500 hover:text-red-700"
                                onClick={() =>
                                    setSelectedEmployees((prev: any[]) => prev.filter((eid) => eid !== id))
                                }
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
    const [selectedDepartment, setSelectedDepartment] = useState<DEPARTMENT | ''>('');
    const [employeeInput, setEmployeeInput] = useState('');
    const [employeeDropdown, setEmployeeDropdown] = useState(false);

    const [newRow, setNewRow] = useState<IncidentInputPayload>({
        title: '',
        description: '',
        location: '',
        status: undefined,
        callTime: '',
        onSceneTime: '',
        stableTime: '',
        transportTime: '',
        dryRun: false,
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

    const handleTimeChange = (name: string, time: string | null) => {
        setNewRow((prevState) => ({
            ...prevState,
            [name]: time || '',
        }));
    };

    const handleSubmit = async () => {
        try {
            if (
                !(newRow.callTime && !isNaN(new Date(newRow.callTime).getTime())) ||
                (!newRow.dryRun &&
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
                title: '',
                description: '',
                location: '',
                status: undefined,
                callTime: '',
                onSceneTime: '',
                stableTime: '',
                transportTime: '',
                dryRun: false,
                employees: [],
                incidentEquipmentUsageLog: [],
            });
            setLocationType(LOCATION_TYPE.TRAIL);
            setLocation(null);
            setLocationInput('');
            setOtherLocation('');
            setSelectedDepartment('');
            setEmployeeInput('');
        } catch (error) {
            showSnackbar('Error creating log', 'error');
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewRow((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setNewRow((prevState) => ({
            ...prevState,
            [name]: checked,
            onSceneTime: checked ? '' : prevState.onSceneTime,
            stableTime: checked ? '' : prevState.stableTime,
            transportTime: checked ? '' : prevState.transportTime,
        }));
    };

    const clearForm = () => {
        setNewRow({
            title: '',
            description: '',
            location: '',
            status: undefined,
            callTime: '',
            onSceneTime: '',
            stableTime: '',
            transportTime: '',
            dryRun: false,
            employees: [],
            incidentEquipmentUsageLog: [],
        });
        setLocationType(LOCATION_TYPE.TRAIL);
        setLocation(null);
        setLocationInput('');
        setOtherLocation('');
        setSelectedEmployees([]);
        setSelectedDepartment('');
        setEmployeeInput('');
    };

    return (
        <div className="max-w-3xl mx-auto mt-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-wrap gap-4">
                <div className="w-full sm:w-auto flex-1 min-w-[220px]">
                    <IncidentLogTimePicker
                        label="Call Time"
                        name="callTime"
                        value={newRow.callTime}
                        handleTimeChange={handleTimeChange}
                    />
                </div>
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
                            <input
                                type="text"
                                value={
                                    location
                                        ? locations.find((l) => l.id === location)?.name || locationInput
                                        : locationInput
                                }
                                onChange={(e) => {
                                    setLocationInput(e.target.value);
                                    setLocation(null);
                                    setShowDropdown(true);
                                }}
                                onFocus={() => setShowDropdown(true)}
                                onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Tab' && showDropdown && filteredLocations.length > 0 && !location) {
                                        e.preventDefault();
                                        const first = filteredLocations[0];
                                        setLocation(first.id);
                                        setLocationInput(first.name);
                                        setNewRow((prev) => ({
                                            ...prev,
                                            location: first.id,
                                        }));
                                        setShowDropdown(false);
                                    }
                                }}
                                placeholder="Type or select location..."
                                className="w-full border rounded px-3 py-2 mb-1"
                                autoComplete="off"
                            />
                            {showDropdown && filteredLocations.length > 0 && (
                                <ul className="absolute z-10 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded w-full max-h-40 overflow-y-auto shadow">
                                    {filteredLocations.map((loc) => (
                                        <li
                                            key={loc.id}
                                            className="px-3 py-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900"
                                            onMouseDown={() => {
                                                setLocation(loc.id);
                                                setLocationInput(loc.name);
                                                setNewRow((prev) => ({
                                                    ...prev,
                                                    location: loc.id,
                                                }));
                                                setShowDropdown(false);
                                            }}
                                        >
                                            {loc.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ) : (
                        <input
                            type="text"
                            value={otherLocation}
                            onChange={(e) => {
                                setOtherLocation(e.target.value);
                                setNewRow((prev) => ({
                                    ...prev,
                                    location: e.target.value,
                                }));
                            }}
                            placeholder="Enter location"
                            className="w-full border rounded px-3 py-2 mb-1"
                        />
                    )}
                </div>
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
                <div className="w-full flex flex-wrap gap-4">
                    <IncidentLogTimePicker
                        label="On Scene"
                        name="onSceneTime"
                        value={newRow.onSceneTime}
                        handleTimeChange={handleTimeChange}
                        clear={newRow.dryRun}
                    />
                    <IncidentLogTimePicker
                        label="Stable"
                        name="stableTime"
                        value={newRow.stableTime}
                        handleTimeChange={handleTimeChange}
                        clear={newRow.dryRun}
                    />
                    <IncidentLogTimePicker
                        label="Transport"
                        name="transportTime"
                        value={newRow.transportTime}
                        handleTimeChange={handleTimeChange}
                        clear={newRow.dryRun}
                    />
                </div>
                <div className="w-full flex items-center gap-2 mt-2">
                    <input
                        type="checkbox"
                        id="dryRun"
                        name="dryRun"
                        checked={newRow.dryRun}
                        onChange={handleCheckboxChange}
                        className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <label htmlFor="dryRun" className="text-gray-700 dark:text-gray-200 select-none">
                        Dry Run
                    </label>
                </div>
                <div className="w-full flex gap-3 mt-4">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition"
                    >
                        <FiSend className="w-5 h-5" />
                        Submit
                    </button>
                    <button
                        type="button"
                        onClick={clearForm}
                        className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded transition"
                    >
                        <FiTrash2 className="w-5 h-5" />
                        Clear
                    </button>
                    <button
                        type="button"
                        onClick={() => gridApi && gridApi.exportDataAsCsv()}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded transition"
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