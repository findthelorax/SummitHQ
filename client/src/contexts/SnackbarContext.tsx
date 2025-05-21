import React, { createContext, useContext } from 'react';
import { Toaster, toast } from 'sonner';

export interface SnackbarContextValue {
    showSnackbar: (
        message: string,
        severity: 'success' | 'error' | 'info' | 'warning',
        once?: boolean
    ) => void;
}

const SnackbarContext = createContext<SnackbarContextValue | undefined>(undefined);

const useSnackbarContext = (): SnackbarContextValue => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error('useSnackbarContext must be used within a SnackbarProvider');
    }
    return context;
};

// Map to keep track of active toast IDs by message to avoid duplicates
const activeToasts = new Map<string, string | number>();

const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const showSnackbar = (
        message: string,
        severity: 'success' | 'error' | 'info' | 'warning',
        once = false
    ) => {
        // If 'once' flag is true, don't show duplicate messages
        if (once && activeToasts.has(message)) return;

        // Also avoid duplicates even if once is false (optional, remove if you want duplicates)
        if (activeToasts.has(message)) return;

        const toastId = toast(message, {
            style: {
                backgroundColor: severity === 'success' ? 'rgb(144, 238, 144)' : 'rgb(255, 204, 204)',
                borderColor: severity === 'success' ? '#00ff00' : '#ff0000',
                borderWidth: '2px',
                borderStyle: 'solid',
                color: 'black',
            },
            duration: 4000,
            onDismiss() {
                activeToasts.delete(message);
            },
        });

        activeToasts.set(message, toastId);
    };

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}
            <Toaster position="bottom-right" />
        </SnackbarContext.Provider>
    );
};

export { SnackbarContext, SnackbarProvider, useSnackbarContext };