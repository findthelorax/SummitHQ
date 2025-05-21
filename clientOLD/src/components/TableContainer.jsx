import React, { useRef, useCallback, useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, InputBase, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import GetAppIcon from '@mui/icons-material/GetApp';

const TableContainer = ({ title, TableComponent, ...tableProps }) => {
    const gridApiRef = useRef(null);
    const [searchText, setSearchText] = useState("");

    const onExportClick = useCallback(() => {
        gridApiRef.current.exportDataAsCsv();
    }, []);

    const onSearchChange = useCallback((event) => {
        setSearchText(event.target.value);
    }, []);

    return (
        <Box sx={{ bgcolor: '#2a3244', color: 'white', height: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '10px' }}>
            <AppBar position="static" sx={{ backgroundColor: '#2a3244', color: 'white', borderRadius: '10px' }} elevation={0}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <SearchIcon />
                        <InputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search', style: { color: 'white', marginLeft: '5px' } }}
                            onChange={onSearchChange}
                        />
                    </Box>
                    <IconButton color="inherit" onClick={onExportClick}>
                        <GetAppIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <TableComponent gridApiRef={gridApiRef} quickFilterText={searchText} {...tableProps} />
        </Box>
    );
};

export default TableContainer;