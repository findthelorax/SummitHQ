import React, { useImperativeHandle, useRef, useState } from 'react';
import StatesAutocomplete from '../autocomplete/StatesAutoComplete';

const StatesAutocompleteCellEditor = React.forwardRef((props: any, ref) => {
	const [value, setValue] = useState(props.value || '');

	useImperativeHandle(ref, () => ({
		getValue: () => value,
		isPopup: () => true,
	}));

	return <StatesAutocomplete state={value} setState={setValue} placeholder="State" />;
});

export default StatesAutocompleteCellEditor;
