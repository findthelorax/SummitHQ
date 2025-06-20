import * as React from 'react';
import TextField from '@mui/material/TextField';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

type IncidentLogTimePickerProps = {
    label: string;
    name: string;
    value?: string | null;
    handleTimeChange: (name: string, value: string | null) => void;
    clear?: boolean;
};

const IncidentLogTimePicker: React.FC<IncidentLogTimePickerProps> = ({
    label,
    name,
    value,
    handleTimeChange,
    clear,
}) => {
    const [open, setOpen] = React.useState(false);
    const [pickerValue, setPickerValue] = React.useState<string | null>(value ?? null);
    const lastConfirmed = React.useRef<string | null>(value ?? null);

    React.useEffect(() => {
        setPickerValue(value ?? null);
        lastConfirmed.current = value ?? null;
    }, [value]);

    const handleChange = (newValue: any) => {
        setPickerValue(newValue ? dayjs(newValue).format('hh:mm A') : null);
    };

    const handleAccept = (newValue: any) => {
        const formatted = newValue ? dayjs(newValue).format('hh:mm A') : null;
        lastConfirmed.current = formatted;
        handleTimeChange(name, formatted);
        setOpen(false);
    };

    const handleClose = () => {
        // If closed by cancel, revert to last confirmed value
        setPickerValue(lastConfirmed.current);
        setOpen(false);
    };

    const handleNow = () => {
        const now = dayjs();
        setPickerValue(now.format('hh:mm A'));
        handleTimeChange(name, now.format('hh:mm A'));
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <TimePicker
                    label={label}
                    value={pickerValue ? dayjs(pickerValue, ['hh:mm A', 'HH:mm']) : null}
                    onChange={handleChange}
                    onAccept={handleAccept}
                    onClose={handleClose}
                    ampm={true}
                    open={open}
                    onOpen={() => setOpen(true)}
                    closeOnSelect={false}
                    slotProps={{
                        textField: {
                            fullWidth: true,
                            variant: "outlined",
                            size: "small",
                            onClick: () => setOpen(true),
                            style: { cursor: "pointer" },
                            disabled: clear,
                        },
                        actionBar: {
                            actions: ['cancel', 'accept'],
                            sx: {
                                '& button': {
                                    background: '#1976d2',
                                    color: '#fff',
                                    borderRadius: 2,
                                    padding: '6px 16px',
                                    margin: '0 8px',
                                    fontWeight: 600,
                                    fontSize: 14,
                                    textTransform: 'none',
                                    '&:hover': {
                                        background: '#1565c0',
                                    },
                                },
                            },
                        },
                    }}
                    disabled={clear}
                />
                <button
                    type="button"
                    onClick={handleNow}
                    disabled={clear}
                    style={{
                        marginLeft: 8,
                        padding: '6px 12px',
                        borderRadius: 4,
                        border: '1px solid #1976d2',
                        background: '#1976d2',
                        color: '#fff',
                        cursor: 'pointer',
                        fontSize: 14,
                        height: 36,
                    }}
                >
                    Now
                </button>
            </div>
        </LocalizationProvider>
    );
};

export default IncidentLogTimePicker;