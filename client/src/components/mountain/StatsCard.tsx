import React from 'react';

type Stat = {
    label: string;
    value: string | number;
    subValue?: string;
    color?: string;
};

type StatsCardProps = {
    title: string;
    icon?: React.ReactNode;
    stats: Stat[];
    accentColor?: string;
    onTitleClick?: () => void;
};

const StatsCard: React.FC<StatsCardProps> = ({
    title,
    icon,
    stats,
    accentColor,
    onTitleClick,
}) => (
    <div
        style={{
            background: '#181f2a',
            borderRadius: 16,
            boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
            padding: 24,
            minWidth: 0,
            width: '100%',
            color: '#fff',
            margin: 8,
            position: 'relative',
            overflow: 'hidden',
            flex: 1,
        }}
    >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
            {icon && <span style={{ fontSize: 28, marginRight: 10, color: accentColor }}>{icon}</span>}
            {onTitleClick ? (
                <span
                    style={{
                        fontWeight: 600,
                        fontSize: 18,
                        color: accentColor,
                        cursor: 'pointer',
                        textDecoration: 'underline',
                    }}
                    onClick={onTitleClick}
                    tabIndex={0}
                    role="button"
                    onKeyPress={e => {
                        if (e.key === 'Enter' || e.key === ' ') onTitleClick();
                    }}
                >
                    {title}
                </span>
            ) : (
                <span style={{ fontWeight: 600, fontSize: 18 }}>{title}</span>
            )}
        </div>
        <div>
            {stats.map((stat, i) => (
                <div key={i} style={{ marginBottom: 8 }}>
                    <span style={{ fontSize: 28, fontWeight: 700, color: stat.color || accentColor }}>
                        {stat.value}
                    </span>
                    <span style={{ marginLeft: 8, fontSize: 15, color: '#b0b8c9' }}>{stat.label}</span>
                    {stat.subValue && (
                        <span style={{ display: 'block', fontSize: 13, color: '#8fa1c7', marginLeft: 2 }}>
                            {stat.subValue}
                        </span>
                    )}
                </div>
            ))}
        </div>
    </div>
);

export default StatsCard;