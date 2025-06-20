import React, { useRef, useEffect } from 'react';

const NumberOnlyCellEditor: React.FC<any> = (props) => {
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (
			['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)
		) {
			return;
		}
		if ((e.ctrlKey || e.metaKey) && ['a', 'c', 'v', 'x'].includes(e.key.toLowerCase())) {
			return;
		}
		if (!/^[0-9]$/.test(e.key)) {
			e.preventDefault();
		}
	};

	return (
		<input
			ref={inputRef}
			type="number"
			min={0}
			value={props.value ?? ''}
			onChange={(e) => props.onValueChange(Number(e.target.value))}
			onKeyDown={onKeyDown}
			style={{ width: '100%', padding: '0px 15px' }}
		/>
	);
};

export default NumberOnlyCellEditor;
