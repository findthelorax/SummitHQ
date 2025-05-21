import React from 'react';
import TableContainer from '../TableContainer';
import LodgesTable from './LodgesTable';

const LodgesTableContainer = () => {

    return (
        <TableContainer title="Lodges" TableComponent={LodgesTable} />
    );
};

export default LodgesTableContainer;