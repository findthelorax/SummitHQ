import React from 'react';
import { MainListItems, SecondaryListItems, SettingsListItems } from './NavItemsList';
import { Avatar, Box, ListItem, Drawer } from '@mui/material';
import patrolcross from '../../../assets/patrolcross.jpg';
// import { StyledDrawer, drawerWidth, StyledDrawerAvatar } from '../../../styles/mainLayoutStyles';
import { Link } from 'react-router-dom';
import { drawerWidth } from '../../../helpers/constants';


export function PermanentDrawerLeft() {
    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                }}
                variant="permanent"
                anchor="left"
            >
                <ListItem sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Avatar
                        src={patrolcross}
                        alt="patrolcross"
                        variant="square"
                    />
                </ListItem>
                <Box>
                    <MainListItems component={Link} />
                </Box>
                <Box>
                    <SecondaryListItems component={Link} />
                </Box>
                <Box>
                    <SettingsListItems component={Link} />
                </Box>
            </Drawer>
        </Box>
    );
}