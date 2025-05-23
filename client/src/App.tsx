import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DateProvider } from './contexts/DateContext';
import MountainProvider from './contexts/MountainContext';
import { SnackbarProvider } from './contexts/SnackbarContext';
import MainLayout from './pages/MainLayout';
import AdminLayout from './pages/admin/AdminLayout';

function App() {
  const [darkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <SnackbarProvider>
      <DateProvider>
        <Router>
          <Routes>
            <Route path="/admin/*" element={<AdminLayout />} />
            <Route path="*" element={
              <MountainProvider>
                <MainLayout />
              </MountainProvider>
            } />
          </Routes>
        </Router>
      </DateProvider>
    </SnackbarProvider>
  );
}

export default App;