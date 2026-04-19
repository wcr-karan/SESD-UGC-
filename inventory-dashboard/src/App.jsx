import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Login from './pages/Login/Login';
import './styles/global.css';

const pageTitles = {
  dashboard: { title: 'Dashboard', subtitle: 'Welcome back, Karan 👋' },
  inventory: { title: 'Inventory', subtitle: 'Manage your products' },
  categories: { title: 'Categories', subtitle: 'Coming soon' },
  reports: { title: 'Reports', subtitle: 'Coming soon' },
  settings: { title: 'Settings', subtitle: 'Coming soon' },
};

function ComingSoon({ title }) {
  return (
    <div className="page-content">
      <div
        className="fade-in"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '50vh',
          gap: 12,
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            background: 'var(--primary-bg)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.8rem',
          }}
        >
          🚧
        </div>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--gray-900)' }}>
          {title}
        </h2>
        <p style={{ color: 'var(--gray-400)', fontSize: '0.9rem' }}>
          This section is under construction. Check back soon!
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isLoggedIn');
  };

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    if (val.trim() && activePage !== 'inventory') {
      setActivePage('inventory');
    }
  };

  const { title, subtitle } = pageTitles[activePage] || pageTitles.dashboard;

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'inventory':
        return <Inventory searchQuery={searchQuery} />;
      default:
        return <ComingSoon title={title} />;
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      <Sidebar activePage={activePage} onNavigate={setActivePage} onLogout={handleLogout} />
      <div className="main-content">
        <Navbar
          title={title}
          subtitle={subtitle}
          searchValue={searchQuery}
          onSearchChange={handleSearchChange}
          isDarkMode={isDarkMode}
          onToggleTheme={toggleTheme}
          onLogout={handleLogout}
        />
        {renderPage()}
      </div>
    </div>
  );
}
