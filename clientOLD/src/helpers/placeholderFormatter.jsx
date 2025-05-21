export const placeholderFormatter = (params) => {
    if (params.node && params.node.rowPinned === 'top' && (params.value == null || params.value === '')) {
        return params.colDef.headerName + '...';
    }
    return params.value;
};