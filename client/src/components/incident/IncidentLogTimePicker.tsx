import React, { useState, useEffect, useRef } from 'react';

type IncidentLogTimePickerProps = {
    label: string;
    name: string;
    value?: string | null;
    handleTimeChange: (name: string, value: string | null) => void; // <-- string, not Date
    clear?: boolean;
};

const IncidentLogTimePicker: React.FC<IncidentLogTimePickerProps> = ({
    label,
    name,
    value,
    handleTimeChange,
    clear,
}) => {
    const [selectedTime, setSelectedTime] = useState<string>('');
    const prevClear = useRef<boolean | undefined>(undefined);

    useEffect(() => {
        setSelectedTime(value || '');
    }, [value]);

    useEffect(() => {
        if (clear && !prevClear.current) {
            setSelectedTime('');
            handleTimeChange(name, null);
        }
        prevClear.current = clear;
    }, [clear, name, handleTimeChange]);

    const setCurrentTime = () => {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-GB', { hour12: false }).slice(0, 8);
        setSelectedTime(timeString);
        handleTimeChange(name, timeString); // <-- pass string
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedTime(e.target.value);
        if (e.target.value) {
            handleTimeChange(name, e.target.value); // <-- pass string
        } else {
            handleTimeChange(name, null);
        }
    };

    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">{label}</label>
            <div className="flex items-center gap-2">
                <input
                    type="time"
                    step="1"
                    value={selectedTime}
                    onChange={handleInputChange}
                    className="border rounded px-2 py-1 text-sm w-[120px] dark:bg-gray-900 dark:text-white"
                />
                <button
                    type="button"
                    onClick={setCurrentTime}
                    className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-xs"
                >
                    Now
                </button>
            </div>
        </div>
    );
};

export default IncidentLogTimePicker;