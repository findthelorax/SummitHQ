export const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const formatPhoneNumber = (value: string) => {
	const digits = value.replace(/\D/g, '');
	if (digits.length <= 3) return digits;
	if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
	return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
};

export const formatDate = (dateStr: string) => {
	if (!dateStr) return '—';
	const date = new Date(dateStr);
	if (isNaN(date.getTime())) return dateStr;
	return date
		.toLocaleDateString('en-US', {
			month: 'short',
			day: '2-digit',
			year: 'numeric',
		})
		.replace(',', ',');
};

export const currentTime = () => {
	const now = new Date();
	return now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
};

interface PlaceholderFormatterParams {
	node?: {
		rowPinned?: string;
	};
	value?: string | null;
	colDef: {
		headerName: string;
	};
}

export const placeholderFormatter = (params: PlaceholderFormatterParams): string | null | undefined => {
	if (params.node && params.node.rowPinned === 'top' && (params.value == null || params.value === '')) {
		return params.colDef.headerName + '...';
	}
	return params.value;
};

export function parseCoordinate(coord: unknown): number | null {
	if (coord === null || coord === undefined) return null;
	if (typeof coord === 'object' && 'toNumber' in coord) return (coord as any).toNumber();
	return Number(coord);
}

type Area = { id: string; name: string };

export const areaValueFormatter = (areas: Area[], mountainName?: string) => (params: { value: string }) => {
	if (!areas.length) return `No areas available for ${mountainName || 'this mountain'}`;
	if (!params.value) return 'None';
	const area = areas.find((a) => a.id === params.value);
	return area ? area.name : '-';
};
