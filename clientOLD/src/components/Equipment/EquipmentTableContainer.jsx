import React from 'react';
import TableContainer from '../TableContainer';
import EquipmentTable from './EquipmentTable';

const EquipmentTableContainer = () => {

    return (
        <TableContainer title="Equipment" TableComponent={EquipmentTable} />
    );
};

export default EquipmentTableContainer;