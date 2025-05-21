import { useState, useCallback, useEffect } from 'react';
import { useSnackbarContext } from '../contexts/SnackbarContext';

interface ApiError {
    message: string;
    statusCode?: number;
    details?: any;
}

export const useApiData = <T>(apiFunc: (id: string) => Promise<T>, id: string): [T | null, boolean, () => Promise<void>] => {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { showSnackbar } = useSnackbarContext();

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await apiFunc(id);
            setData(response || null);
        } catch (error: any) {
            const apiError: ApiError = error.response?.data || { message: error.message };
            showSnackbar(apiError.message, 'error');
        } finally {
            setIsLoading(false);
        }
    }, [apiFunc, id, showSnackbar]);

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id, fetchData]);

    return [data, isLoading, fetchData];
};