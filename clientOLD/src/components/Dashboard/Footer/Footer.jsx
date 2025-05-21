import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <Box sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: 'background.default' }}>
            <Typography variant="body2" color="text.secondary" align="center">
                © {year} Brett Ferrante
            </Typography>
        </Box>
    );
};

export default Footer;