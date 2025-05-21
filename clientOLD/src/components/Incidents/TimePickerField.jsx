import IncidentLogTimePicker from '../DatePickers/IncidentLogTimePicker';

const TimePickerField = ({ label, name, handleTimeChange, clear }) => {
    return (
        <IncidentLogTimePicker
            label={label}
            name={name}
            handleTimeChange={handleTimeChange}
            clear={clear}
        />
    );
};

export default TimePickerField;