import React, { useState } from 'react';
import { useSnackbarContext } from '../contexts/SnackbarContext'; 

const SettingsPage: React.FC = () => {
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const { showSnackbar } = useSnackbarContext();

    const handleDarkModeToggle = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem('theme', newMode ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', newMode);
    };

    const handleProfileSave = (e: React.FormEvent) => {
        e.preventDefault();
        // Save profile logic here
        showSnackbar('Profile saved!', 'success');
    };

    return (
        <div className="max-w-xl mx-auto p-6 text-white">
            <h1 className="text-2xl font-bold mb-6">Settings</h1>

            <section className="mb-8">
                <h2 className="text-lg font-semibold mb-2">Appearance</h2>
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={darkMode}
                        onChange={handleDarkModeToggle}
                    />
                    Dark Mode
                </label>
            </section>

            <section>
                <h2 className="text-lg font-semibold mb-2">Profile</h2>
                <form onSubmit={handleProfileSave} className="flex flex-col gap-3">
                    <input
                        className="border p-2 rounded"
                        placeholder="Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input
                        className="border p-2 rounded"
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Save Profile
                    </button>
                </form>
            </section>
        </div>
    );
};

export default SettingsPage;