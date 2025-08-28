import * as React from 'react';

interface FooterProps {
	className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
	const year = new Date().getFullYear();

	return <footer className={`footer ${className}`}>© {year} Brett Ferrante</footer>;
};

export default Footer;
