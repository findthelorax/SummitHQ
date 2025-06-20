import React from 'react';

type CloseAllButtonProps = {
    onClick: () => void;
    disabled?: boolean;
};

const CloseAllButton: React.FC<CloseAllButtonProps> = ({ onClick, disabled }) => (
    <button className="ag-header-closeall-btn" onClick={onClick} disabled={disabled}>
        Close All
    </button>
);

export default CloseAllButton;