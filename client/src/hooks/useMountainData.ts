import { useApiData } from './useApiData';

export const useMountainData = <T>(
    api: Record<string, (id: string) => Promise<T>>,
    method: string,
    id: string
): [T | null, boolean, () => Promise<void>] => {
    const [data, isLoading, fetchData] = useApiData(api[method], id);
    return [data, isLoading, fetchData];
};