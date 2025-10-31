import { useState, useEffect } from 'react';
import { Package, Edit } from 'lucide-react';
import adminService, { AdminOrder } from '../../services/adminService';
import Button from '../../components/Button';

export default function AdminOrders() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingOrder, setEditingOrder] = useState<string | null>(null);
  const [statusForm, setStatusForm] = useState({ status: '', trackingNumber: '' });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await adminService.getAllOrders();
      setOrders(data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      alert('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId: string) => {
    try {
      await adminService.updateOrderStatus(orderId, statusForm.status, statusForm.trackingNumber);
      alert('Order status updated successfully');
      setEditingOrder(null);
      setStatusForm({ status: '', trackingNumber: '' });
      fetchOrders();
    } catch (error: any) {
      console.error('Failed to update order:', error);
      alert(error.response?.data?.message || 'Failed to update order status');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return '#f59e0b';
      case 'Processing':
        return '#3b82f6';
      case 'Shipped':
        return '#8b5cf6';
      case 'Delivered':
        return '#10b981';
      case 'Cancelled':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return <div className="admin-loading">Loading orders...</div>;
  }

  return (
    <div className="admin-orders">
      <div className="admin-section-header">
        <h2>Order Management</h2>
        <div className="order-stats">
          <span>Total Orders: {orders.length}</span>
        </div>
      </div>

      <div className="admin-orders-list">
        {orders.length === 0 ? (
          <div className="admin-empty">No orders found</div>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="admin-order-card">
              <div className="admin-order-header">
                <div>
                  <h3>Order #{order._id.slice(-8).toUpperCase()}</h3>
                  <p className="order-date">{formatDate(order.createdAt)}</p>
                </div>
                <div className="order-status-badge" style={{ backgroundColor: getStatusColor(order.status) + '20', color: getStatusColor(order.status) }}>
                  {order.status}
                </div>
              </div>

              <div className="admin-order-details">
                <div className="order-section">
                  <h4>Customer Information</h4>
                  <p><strong>Name:</strong> {order.user.name}</p>
                  <p><strong>Email:</strong> {order.user.email}</p>
                </div>

                <div className="order-section">
                  <h4>Shipping Address</h4>
                  <p>
                    {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                </div>

                <div className="order-section">
                  <h4>Order Items</h4>
                  <div className="order-items">
                    {order.orderItems.map((item, index) => (
                      <div key={index} className="order-item">
                        <span>{item.name}</span>
                        <span>Size: {item.size}</span>
                        <span>Qty: {item.quantity}</span>
                        <span>${item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="order-section">
                  <h4>Payment & Shipping</h4>
                  <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                  <p><strong>Payment Status:</strong> {order.isPaid ? 'Paid' : 'Pending'}</p>
                  {order.trackingNumber && (
                    <p><strong>Tracking Number:</strong> {order.trackingNumber}</p>
                  )}
                </div>

                <div className="order-totals">
                  <div className="total-row">
                    <span>Items:</span>
                    <span>${order.itemsPrice.toFixed(2)}</span>
                  </div>
                  <div className="total-row">
                    <span>Shipping:</span>
                    <span>${order.shippingPrice.toFixed(2)}</span>
                  </div>
                  <div className="total-row">
                    <span>Tax:</span>
                    <span>${order.taxPrice.toFixed(2)}</span>
                  </div>
                  <div className="total-row total">
                    <span>Total:</span>
                    <span>${order.totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {editingOrder === order._id ? (
                <div className="order-status-form">
                  <div className="form-group">
                    <label>Status</label>
                    <select
                      value={statusForm.status}
                      onChange={(e) => setStatusForm({ ...statusForm, status: e.target.value })}
                    >
                      <option value="">Select Status</option>
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Tracking Number</label>
                    <input
                      type="text"
                      value={statusForm.trackingNumber}
                      onChange={(e) => setStatusForm({ ...statusForm, trackingNumber: e.target.value })}
                      placeholder="Optional"
                    />
                  </div>
                  <div className="form-actions">
                    <Button onClick={() => handleStatusUpdate(order._id)} variant="primary">
                      <Edit size={18} /> Update Status
                    </Button>
                    <Button onClick={() => { setEditingOrder(null); setStatusForm({ status: '', trackingNumber: '' }); }} variant="outline">
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="admin-order-actions">
                  <Button onClick={() => { setEditingOrder(order._id); setStatusForm({ status: order.status, trackingNumber: order.trackingNumber || '' }); }} variant="secondary">
                    <Edit size={18} /> Update Status
                  </Button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

