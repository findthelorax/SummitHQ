import React from 'react';
import TableContainer from '../TableContainer';
import TrailsTable from './TrailsTable';

const TrailsTableContainer = () => {

    return (
        <TableContainer title="Trails" TableComponent={TrailsTable} />
    );
};

export default TrailsTableContainer;