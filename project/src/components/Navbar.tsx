import { ShoppingCart, Menu, X, User, LogOut, Shield } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  cartItemsCount: number;
  onNavigate: (page: string) => void;
  currentPage: string;
  isAuthenticated?: boolean;
  userName?: string;
}

export default function Navbar({ cartItemsCount, onNavigate, currentPage }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const { isAdmin } = useAuth();
  
  const navItems = [
    { label: 'Home', page: '/', path: '/' },
    { label: 'Shop', page: 'shop', path: '/shop' },
    { label: 'About', page: 'about', path: '/about' },
    { label: 'Contact', page: 'contact', path: '/contact' },
  ];
  
  if (isAdmin) {
    navItems.push({ label: 'Admin', page: 'admin', path: '/admin' });
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          ELEGANZA
        </Link>

        <div className="nav-links">
          {navItems.map((item) => (
            <Link
              key={item.page}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="nav-actions">
          {isAuthenticated ? (
            <>
              <div className="user-info" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '16px' }}>
                <User size={18} />
                <span style={{ fontSize: '14px', fontWeight: '500' }}>{user?.name}</span>
              </div>
              <button
                className="nav-link"
                onClick={handleLogout}
                style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="nav-link"
              style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <User size={18} />
              Login
            </Link>
          )}
          
          <Link
            to="/cart"
            className="cart-button"
          >
            <ShoppingCart size={22} />
            {cartItemsCount > 0 && (
              <span className="cart-badge">{cartItemsCount}</span>
            )}
          </Link>

          <button
            className="mobile-menu-button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-menu">
          {navItems.map((item) => (
            <Link
              key={item.page}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`mobile-nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.page === 'admin' && <Shield size={18} style={{ marginRight: '8px' }} />}
              {item.label}
            </Link>
          ))}
          {isAuthenticated ? (
            <>
              <div className="mobile-nav-link" style={{ color: '#4F46E5', fontWeight: '600' }}>
                {user?.name}
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="mobile-nav-link"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mobile-nav-link"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
