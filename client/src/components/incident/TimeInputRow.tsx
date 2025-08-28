import React, { useRef } from 'react';

type TimeInputRowProps = {
	value: { hh: string; mm: string; ampm: string };
	onChange: (val: { hh: string; mm: string; ampm: string }) => void;
	onNow: () => void;
	onClear: () => void;
};

export function TimeInputRow({ value, onChange, onNow, onClear }: TimeInputRowProps) {
	const { hh, mm, ampm } = value;
	const hourRef = useRef<HTMLInputElement>(null);
	const minRef = useRef<HTMLInputElement>(null);
	const ampmRef = useRef<HTMLSelectElement>(null);

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
