import React from 'react';

interface NoSelectionNoticeProps {
    icon?: React.ReactNode;
    title?: string;
    message?: React.ReactNode;
    style?: React.CSSProperties;
}

const defaultStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '60vh',
    background: 'linear-gradient(135deg, #e0e7ef 0%, #c1d3fe 100%)',
    borderRadius: '18px',
    boxShadow: '0 4px 24px 0 rgba(60,80,120,0.08)',
    margin: '2rem auto',
    maxWidth: 480,
    padding: '2.5rem 2rem',
};

const NoSelectionNotice: React.FC<NoSelectionNoticeProps> = ({
    icon = (
        <span style={{ fontSize: 48, marginBottom: 16, color: '#3b82f6' }} role="img" aria-label="mountain">
            🏔️
        </span>
    ),
    title = 'No Selection',
    message = (
        <>
            Please make a selection to view details.<br />
            You can choose an item from the menu above.
        </>
    ),
    style,
}) => (
    <div style={{ ...defaultStyle, ...style }}>
        {icon}
        <h2 style={{ fontWeight: 700, fontSize: 28, color: '#1e293b', marginBottom: 8 }}>{title}</h2>
        <p style={{ fontSize: 18, color: '#334155', marginBottom: 0, textAlign: 'center' }}>{message}</p>
    </div>
);

export default NoSelectionNotice;