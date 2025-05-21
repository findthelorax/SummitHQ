import React, { useContext, useEffect } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { ThemeContext } from '../../contexts/ThemeContext';

function DarkModeButton() {
    const { darkMode, setDarkMode } = useContext(ThemeContext);

    useEffect(() => {
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode !== null) {
            setDarkMode(savedDarkMode === 'true');
        }
    }, [setDarkMode]);

    const handleThemeChange = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem('darkMode', newDarkMode.toString());
    };

    return (
        <Tooltip title="Toggle light/dark mode">
            <IconButton color="inherit" onClick={handleThemeChange}>
                {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
        </Tooltip>
    );
}

export default DarkModeButton;