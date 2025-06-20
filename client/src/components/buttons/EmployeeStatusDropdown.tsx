import React from 'react';
import { EMPLOYEE_STATUS, EMPLOYEE_STATUS_LABELS } from '../../types/generated-enums';

interface StatusDropdownProps {
    value: EMPLOYEE_STATUS;
    data: any;
    node: any;
    api: any;
    colDef: any;
    column: any;
    setValue: (value: EMPLOYEE_STATUS) => void;
}

const EmployeeStatusDropdown: React.FC<StatusDropdownProps> = (props) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value as EMPLOYEE_STATUS;
        props.setValue(newStatus);
    };

    return (
        <select
            value={props.value || EMPLOYEE_STATUS.UNKNOWN}
            onChange={handleChange}
            style={{ width: '100%' }}
        >
            {Object.values(EMPLOYEE_STATUS).map((status) => (
                <option key={status} value={status}>
                    {EMPLOYEE_STATUS_LABELS[status]}
                </option>
            ))}
        </select>
    );
};

export default EmployeeStatusDropdown;