import * as React from 'react';

type OpenAllButtonProps = {
    onClick: () => void;
    disabled?: boolean;
};

const OpenAllButton: React.FC<OpenAllButtonProps> = ({ onClick, disabled }) => (
    <button className="ag-header-openall-btn" onClick={onClick} disabled={disabled}>
        Open All
    </button>
);

export default OpenAllButton;