import { useState } from 'react';

export function useConfirmDialog<T>() {
	const [open, setOpen] = useState(false);
	const [item, setItem] = useState<T | null>(null);

	const requestConfirm = (item: T) => {
		setItem(item);
		setOpen(true);
	};

	const closeConfirm = () => {
		setOpen(false);
		setItem(null);
	};

	return {
		confirmOpen: open,
		itemToDelete: item,
		requestConfirm,
		closeConfirm,
	};
}
