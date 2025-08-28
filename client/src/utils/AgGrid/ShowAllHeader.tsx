import * as React from 'react';

export const ShowAllHeader: React.FC<{ showAllRows: () => void; params: any }> = ({ showAllRows, params }) => {
	const [filterHover, setFilterHover] = React.useState(false);

	const renderSortIcon = () => {
		if (params.column.isSortAscending()) {
			return (
				<svg width="14" height="14" viewBox="0 0 20 20" className="ag-sort-icon">
					<polygon points="10,5 15,13 5,13" fill="#fff" />
				</svg>
			);
		}
		if (params.column.isSortDescending()) {
			return (
				<svg width="14" height="14" viewBox="0 0 20 20" className="ag-sort-icon">
					<polygon points="5,7 15,7 10,15" fill="#fff" />
				</svg>
			);
		}
		return (
			<svg width="14" height="14" viewBox="0 0 20 20" className="ag-sort-icon ag-sort-icon--neutral">
				<polygon points="10,5 15,13 5,13" fill="#fff" />
				<polygon points="5,7 15,7 10,15" fill="#fff" />
			</svg>
		);
	};

	return (
		<div className="ag-header-row">
			<span className="ag-header-name">Name</span>
			<div className="ag-header-center">
				<button
					type="button"
					className="ag-header-showall-btn"
					onMouseOver={(e) => e.currentTarget.classList.add('hover')}
					onMouseOut={(e) => e.currentTarget.classList.remove('hover')}
					onClick={(e) => {
						e.stopPropagation();
						showAllRows();
					}}
				>
					Show All
				</button>
			</div>
			<div className="ag-header-icons">
				<span
					className="ag-header-sort"
					onClick={(e) => {
						e.stopPropagation();
						params.progressSort && params.progressSort();
						const currentSort = params.column.getSort();
						let nextSort: 'asc' | 'desc' | null = null;
						if (currentSort === 'asc') nextSort = 'desc';
						else if (currentSort === 'desc') nextSort = null;
						else nextSort = 'asc';
						params.setSort(nextSort, true);
						params.api.refreshHeader();
					}}
					title="Sort"
				>
					{renderSortIcon()}
				</span>
				<span
					className={`ag-header-filter${filterHover ? ' hover' : ''}`}
					onClick={(event) => {
						event.stopPropagation();
						params.showColumnMenu(event.target);
					}}
					onMouseEnter={() => setFilterHover(true)}
					onMouseLeave={() => setFilterHover(false)}
					title="Filter"
				>
					<svg width="18" height="18" viewBox="0 0 22 22" className="ag-filter-icon">
						<rect x="3" y="5" width="16" height="3" rx="1" fill="#fff" />
						<rect x="6" y="10" width="10" height="3" rx="1" fill="#fff" />
						<rect x="8" y="15" width="6" height="3" rx="1" fill="#fff" />
					</svg>
				</span>
			</div>
		</div>
	);
};