import React from 'react';
import { Tabs, Tab } from '@mui/material';
import { colors } from '../../theme/theme';

function AreaTabs({ value, onChange, areas }) {
    return (
        <Tabs value={value} onChange={onChange}>
            {areas.map((area, index) => (
                <Tab
                    key={area._id}
                    label={area.name}
                    style={{ backgroundColor: colors[index % colors.length] }}
                />
            ))}
        </Tabs>
    );
}

export default AreaTabs;