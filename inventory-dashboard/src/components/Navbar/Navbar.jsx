import { Search, Bell, Moon, Sun, LogOut } from 'lucide-react';
import './Navbar.css';

export default function Navbar({
  title,
  subtitle,
  searchValue,
  onSearchChange,
  isDarkMode,
  onToggleTheme,
  onLogout,
}) {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <div>
          <h2 className="navbar-title">{title}</h2>
          {subtitle && <p className="navbar-subtitle">{subtitle}</p>}
        </div>
      </div>

      <div className="navbar-search">
        <Search size={18} />
        <input
          type="text"
          placeholder="Search products, categories..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="navbar-right">
        <button
          className="navbar-icon-btn"
          aria-label="Toggle theme"
          onClick={onToggleTheme}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button className="navbar-icon-btn" aria-label="Notifications">
          <Bell size={20} />
          <span className="navbar-notification-dot"></span>
        </button>
        <button
          className="navbar-icon-btn logout-btn"
          aria-label="Logout"
          onClick={onLogout}
          title="Logout"
          style={{ color: 'var(--danger)', marginLeft: '12px' }}
        >
          <LogOut size={20} />
        </button>
        <div className="navbar-avatar" title="Karan Thakur">
          KT
        </div>
      </div>
    </header>
  );
}
