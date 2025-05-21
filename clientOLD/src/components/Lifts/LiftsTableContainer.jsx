import React from 'react';
import TableContainer from '../TableContainer';
import LiftsTable from './LiftsTable';

const LiftsTableContainer = () => {

    return (
        <TableContainer title="Lifts" TableComponent={LiftsTable} />
    );
};

export default LiftsTableContainer;