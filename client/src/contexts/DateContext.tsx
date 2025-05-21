import React, { useState, createContext } from 'react';
import type { ReactNode } from 'react';

interface DateContextValue {
    selectedDate: Date;
    setSelectedDate: (date: Date) => void;
    openDatePicker: boolean;
    setOpenDatePicker: (open: boolean) => void;
    handleDateChange: (newDate: Date) => void;
}

export const DateContext = createContext<DateContextValue | undefined>(undefined);

interface DateProviderProps {
    children: ReactNode;
}

export const DateProvider: React.FC<DateProviderProps> = ({ children }) => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date(new Date().setHours(0, 0, 0, 0)));
    const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);

    const handleDateChange = (newDate: Date) => {
        setSelectedDate(newDate);
        localStorage.setItem('selectedDate', newDate.toISOString());
        setOpenDatePicker(false);
    };

    return (
        <DateContext.Provider
            value={{
                selectedDate,
                setSelectedDate,
                openDatePicker,
                setOpenDatePicker,
                handleDateChange,
            }}
        >
            {children}
        </DateContext.Provider>
    );
};

export const useDateContext = (): DateContextValue => {
    const context = React.useContext(DateContext);
    if (!context) {
        throw new Error('useDateContext must be used within a DateProvider');
    }
    return context;
};