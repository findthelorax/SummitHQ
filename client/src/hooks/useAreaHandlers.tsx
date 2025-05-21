import { useState } from 'react';

function useAreaHandlers() {
    const [value, setValue] = useState<number>(0);

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return {
        value,
        handleTabChange,
    };
}

export default useAreaHandlers;