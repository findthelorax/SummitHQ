import React from 'react';
import TableContainer from '../TableContainer';
import AidRoomsTable from './AidRoomsTable';

const AidRoomTableContainer = () => {

    return (
        <TableContainer title="First Aid Rooms" TableComponent={AidRoomsTable} />
    );
};

export default AidRoomTableContainer;