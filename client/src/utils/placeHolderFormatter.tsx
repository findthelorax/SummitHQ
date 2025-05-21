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