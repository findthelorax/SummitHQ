import React from 'react';
import TableContainer from '../TableContainer';
import PatrollersTable from './PatrollersTable';

const PatrollersTableContainer = () => {

    return (
        <TableContainer title="Patrollers" TableComponent={PatrollersTable} />
    );
};

export default PatrollersTableContainer;