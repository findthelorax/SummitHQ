import React, { useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';

export default function DatePickerCellEditor(props: any) {
    const ref = useRef<any>(null);
    const value = props.value ? new Date(props.value) : null;

    useEffect(() => {
        setTimeout(() => ref.current?.setFocus?.(), 0);
    }, []);

    const handleChange = (date: Date | null) => {
        const formatted = date ? date.toISOString().slice(0, 10) : '';
        if (props.onValueChange) props.onValueChange(formatted);
        if (props.api && props.api.stopEditing) props.api.stopEditing();
    };

    return (
        <DatePicker
            ref={ref}
            selected={value}
            onChange={handleChange}
            dateFormat="MMM dd, yyyy"
            className="ag-input-field-input ag-text-field-input"
            onBlur={() => {
                if (props.api && props.api.stopEditing) props.api.stopEditing();
            }}
            autoFocus
            showMonthDropdown
            showYearDropdown
            renderCustomHeader={({
                date,
                changeYear,
                changeMonth,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled
            }) => (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    <button
                        type="button"
                        onClick={decreaseMonth}
                        disabled={prevMonthButtonDisabled}
                        style={{
                            marginTop: -8,
                            marginRight: 8,
                            fontSize: 32,
                            padding: '4px 12px',
                            lineHeight: 1,
                            cursor: 'pointer'
                        }}
                        aria-label="Previous Month"
                    >
                        ‹
                    </button>
                    <select
                        value={date.getMonth()}
                        onChange={({ target: { value } }) => changeMonth(Number(value))}
                        style={{ marginRight: 8 }}
                    >
                        {Array.from({ length: 12 }, (_, i) => (
                            <option key={i} value={i}>
                                {new Date(0, i).toLocaleString('default', { month: 'long' })}
                            </option>
                        ))}
                    </select>
                    <select
                        value={date.getFullYear()}
                        onChange={({ target: { value } }) => changeYear(Number(value))}
                        style={{ marginLeft: 8, maxWidth: 80 }}
                    >
                        {Array.from({ length: 11 }, (_, i) => {
                            const year = new Date().getFullYear() - 5 + i;
                            return <option key={year} value={year}>{year}</option>;
                        })}
                    </select>
                    <button
                        type="button"
                        onClick={increaseMonth}
                        disabled={nextMonthButtonDisabled}
                        style={{
                            marginTop: -8,
                            marginLeft: 8,
                            fontSize: 32,
                            padding: '4px 12px',
                            lineHeight: 1,
                            cursor: 'pointer'
                        }}
                        aria-label="Next Month"
                    >
                        ›
                    </button>
                </div>
            )}
        />
    );
}