import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DateProvider } from './contexts/DateContext';
import MountainProvider from './contexts/MountainContext';
import { SnackbarProvider } from './contexts/SnackbarContext';
import MainLayout from './pages/MainLayout';

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
        <MountainProvider>
          <Router>
            <Routes>
              <Route path="*" element={<MainLayout />} />
            </Routes>
          </Router>
        </MountainProvider>
      </DateProvider>
    </SnackbarProvider>
  );
}

export default App;