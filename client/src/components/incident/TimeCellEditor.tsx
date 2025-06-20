import React, { useRef, useEffect, useImperativeHandle, forwardRef, useState } from 'react';

export const CustomTimeCellEditor = forwardRef((props: any, ref) => {
    const initial = props.value ? new Date(props.value) : null;
    let hours = initial ? initial.getHours() : '';
    let minutes = initial ? initial.getMinutes() : '';
    let ampm = hours !== '' ? (typeof hours === 'number' && hours >= 12 ? 'PM' : 'AM') : 'AM';
    hours = hours === '' ? '' : (Number(hours) % 12 || 12);

    const [hh, setHh] = useState(hours === '' ? '' : String(hours).padStart(2, '0'));
    const [mm, setMm] = useState(minutes === '' ? '' : String(minutes).padStart(2, '0'));
    const [ampmState, setAmpm] = useState(ampm);

    const hourRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        hourRef.current?.focus();
        hourRef.current?.select();
    }, []);

    useImperativeHandle(ref, () => ({
        getValue: () => {
            if (!hh || !mm) return null;
            let h = parseInt(hh, 10);
            if (ampmState === 'PM' && h !== 12) h += 12;
            if (ampmState === 'AM' && h === 12) h = 0;
            const d = new Date();
            d.setHours(h, parseInt(mm, 10), 0, 0);
            return d.toISOString();
        }
    }));

    return (
        <span style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <input
                ref={hourRef}
                type="text"
                className="time-input"
                value={hh}
                maxLength={2}
                style={{ width: 22, textAlign: 'center' }}
                placeholder="hh"
                onChange={e => {
                    let val = e.target.value.replace(/\D/g, '').slice(0, 2);
                    if (parseInt(val, 10) > 12) val = '12';
                    setHh(val);
                }}
            />
            :
            <input
                type="text"
                className="time-input"
                value={mm}
                maxLength={2}
                style={{ width: 22, textAlign: 'center' }}
                placeholder="mm"
                onChange={e => {
                    let val = e.target.value.replace(/\D/g, '').slice(0, 2);
                    if (parseInt(val, 10) > 59) val = '59';
                    setMm(val);
                }}
            />
            <select
                className="time-input"
                value={ampmState}
                style={{ width: 36 }}
                onChange={e => setAmpm(e.target.value)}
            >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
            </select>
        </span>
    );
});