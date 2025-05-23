import React, { useCallback, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import type { Employee } from 'shared/types';
import { DEPARTMENT } from 'shared/types/enums';
import type { ColDef, GridSizeChangedEvent, FirstDataRenderedEvent } from 'ag-grid-community';

interface EmployeeTableAgGridProps {
    employees: Employee[];
    fetchEmployees: () => Promise<void>;
    isLoading: boolean;
}

const EmployeeTableAgGrid: React.FC<EmployeeTableAgGridProps> = ({ employees, fetchEmployees, isLoading }) => {
    const gridRef = useRef<AgGridReact>(null);

    type EmployeeRow = {
        id: string;
        employeeIdNumber: number;
        name: string;
        email: string;
        phoneNumber: string;
        roleId?: string;
        department?: DEPARTMENT;
    };

    const columnDefs: ColDef<EmployeeRow>[] = [
        { headerName: 'Employee ID', field: 'employeeIdNumber', minWidth: 100 },
        { headerName: 'Name', field: 'name', minWidth: 120 },
        { headerName: 'Email', field: 'email', minWidth: 140 },
        { headerName: 'Phone', field: 'phoneNumber', minWidth: 120 },
        { headerName: 'Role ID', field: 'roleId', minWidth: 100 },
        {
            headerName: 'Department',
            field: 'department',
            minWidth: 120,
            valueFormatter: (params: any) =>
                params.value ? params.value.replace(/_/g, ' ') : '',
        },
    ];

    const rowData = employees
        ? employees.map((item) => ({
            id: item.id,
            employeeIdNumber: item.employeeIdNumber,
            name: item.name,
            email: item.email,
            phoneNumber: item.phoneNumber,
            roleId: item.roleId,
            department: (item as any).department,
        }))
        : [];

    const onGridSizeChanged = useCallback((params: GridSizeChangedEvent) => {
        params.api.sizeColumnsToFit();
    }, []);

    const onFirstDataRendered = useCallback((params: FirstDataRenderedEvent) => {
        params.api.sizeColumnsToFit();
        setTimeout(() => {
            params.api.sizeColumnsToFit();
        }, 100);
    }, []);

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                width: '100%',
                marginTop: 24,
            }}
        >
            <div
                id="ag-employee-table-container"
                className="ag-theme-quartz-dark"
                style={{
                    width: '100%',
                    maxWidth: 900,
                    minWidth: 300,
                }}
            >
                <AgGridReact
                    ref={gridRef}
                    columnDefs={columnDefs}
                    rowData={rowData}
                    domLayout="autoHeight"
                    overlayLoadingTemplate={'<span class="ag-overlay-loading-center">Loading employees...</span>'}
                    loadingOverlayComponentParams={{ loadingMessage: 'Loading employees...' }}
                    loadingOverlayComponent="agLoadingOverlay"
                    noRowsOverlayComponent="agNoRowsOverlay"
                    noRowsOverlayComponentParams={{ noRowsMessage: 'No employees found.' }}
                    loading={isLoading}
                    autoSizeStrategy={{
                        type: 'fitCellContents',
                    }}
                    onGridSizeChanged={onGridSizeChanged}
                    onFirstDataRendered={onFirstDataRendered}
                    suppressHorizontalScroll
                    getRowId={params => params.data.id}
                />
            </div>
        </div>
    );
};

export default EmployeeTableAgGrid;