import React, { useRef, useState, forwardRef, useImperativeHandle } from 'react';

const ENTITY_TYPE_LABELS: Record<string, string> = {
    AIDROOM: 'Aid Rooms',
    HUT: 'Huts',
    LIFT: 'Lifts',
    LODGE: 'Lodges',
    TRAIL: 'Trails',
};

export const LocationGroupCellEditor = forwardRef(function LocationGroupCellEditor(props: any, ref) {
    const { value, locations = [] } = props;
    const selectRef = useRef<HTMLSelectElement>(null);
    const [selected, setSelected] = useState(value || '');

    // Group locations by entityType
    const grouped = locations.reduce((acc: any, loc: any) => {
        if (!acc[loc.entityType]) acc[loc.entityType] = [];
        acc[loc.entityType].push(loc);
        return acc;
    }, {});

    useImperativeHandle(ref, () => ({
        getValue: () => selected,
        afterGuiAttached: () => {
            selectRef.current?.focus();
        }
    }));

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelected(e.target.value);
    };

    const handleBlur = () => {
        if (props.api) props.api.stopEditing();
        if (props.stopEditing) props.stopEditing();
    };

    return (
        <select
            ref={selectRef}
            className="ag-dropdown"
            value={selected}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{ width: '100%' }}
        >
            <option value="">None</option>
            {Object.entries(grouped).map(([type, location]) => (
                <optgroup
                    key={type}
                    label={ENTITY_TYPE_LABELS[type] || type}
                    className="location-group-optgroup"
                >
                    {(location as any[]).map((location: any) => (
                        <option key={location.id} value={location.id} className="location-group-option">
                            {location.name}
                        </option>
                    ))}
                </optgroup>
            ))}
        </select>
    );
});

export default LocationGroupCellEditor;