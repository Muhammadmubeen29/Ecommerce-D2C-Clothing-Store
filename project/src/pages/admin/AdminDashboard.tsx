import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, ShoppingBag, Plus, Edit, Trash2, LogOut } from 'lucide-react';
import AdminProducts from './AdminProducts';
import AdminOrders from './AdminOrders';
import { useAuth } from '../../context/AuthContext';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="admin-header-content">
          <h1 className="admin-title">Admin Dashboard</h1>
          <div className="admin-user-info">
            <span>Welcome, {user?.name}</span>
            <button onClick={handleLogout} className="admin-logout-btn">
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="admin-nav">
        <button
          className={`admin-nav-btn ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          <Package size={20} /> Products
        </button>
        <button
          className={`admin-nav-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          <ShoppingBag size={20} /> Orders
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'products' && <AdminProducts />}
        {activeTab === 'orders' && <AdminOrders />}
      </div>
    </div>
  );
}







