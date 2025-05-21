import React from 'react';
import TableContainer from '../TableContainer';
import HutsTable from './HutsTable';

const HutsTableContainer = () => {

    return (
        <TableContainer title="Patrol Huts" TableComponent={HutsTable} />
    );
};

export default HutsTableContainer;