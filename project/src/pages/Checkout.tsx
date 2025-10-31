import { useState } from 'react';
import { CreditCard, Lock } from 'lucide-react';
import Button from '../components/Button';
import { CartItem } from '../types';
import orderService from '../services/orderService';
import { useAuth } from '../context/AuthContext';

interface CheckoutProps {
  cartItems: CartItem[];
  onNavigate: (page: string) => void;
  onClearCart: () => void;
}

export default function Checkout({ cartItems, onNavigate, onClearCart }: CheckoutProps) {
  const { isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 25;
  const taxRate = 0.1; // 10% tax
  const tax = subtotal * taxRate;
  const total = subtotal + shipping + tax;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      alert('Please login to place an order');
      onNavigate('login');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const orderData = {
        orderItems: cartItems.map(item => ({
          product: item.id.toString(),
          name: item.name,
          quantity: item.quantity,
          size: item.size,
          image: item.image,
          price: item.price,
        })),
        shippingAddress: {
          fullName: `${formData.firstName} ${formData.lastName}`,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
          phone: formData.phone,
        },
        paymentMethod: 'Credit Card',
        itemsPrice: subtotal,
        shippingPrice: shipping,
        taxPrice: tax,
        totalPrice: total,
      };

      await orderService.createOrder(orderData);
      alert('Order placed successfully! You will receive a confirmation email shortly.');
      onClearCart();
      onNavigate('home');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    onNavigate('cart');
    return null;
  }

  return (
    <div className="checkout-page">
      <h1 className="page-title">Checkout</h1>

      {error && (
        <div style={{ padding: '12px', margin: '16px auto', maxWidth: '1200px', backgroundColor: '#ef4444', color: 'white', borderRadius: '8px' }}>
          {error}
        </div>
      )}

      <div className="checkout-container">
        <div className="checkout-form-section">
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-section">
              <h2 className="form-section-title">Shipping Information</h2>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName" className="form-label">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName" className="form-label">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="form-label">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="address" className="form-label">Street Address</label>
                <input
                  type="text"
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city" className="form-label">City</label>
                  <input
                    type="text"
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="postalCode" className="form-label">Postal Code</label>
                  <input
                    type="text"
                    id="postalCode"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="country" className="form-label">Country</label>
                <select
                  id="country"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="form-select"
                  required
                >
                  <option value="">Select Country</option>
                  <option value="USA">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="UAE">United Arab Emirates</option>
                  <option value="SA">Saudi Arabia</option>
                  <option value="CA">Canada</option>
                  <option value="AU">Australia</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                </select>
              </div>
            </div>

            <div className="form-section">
              <h2 className="form-section-title">
                <CreditCard size={20} /> Payment Information
              </h2>
              <p className="payment-note">
                <Lock size={14} /> Your payment information is secure and encrypted
              </p>

              <div className="form-group">
                <label htmlFor="cardNumber" className="form-label">Card Number</label>
                <input
                  type="text"
                  id="cardNumber"
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                  className="form-input"
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
                  <input
                    type="text"
                    id="expiryDate"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    className="form-input"
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cvv" className="form-label">CVV</label>
                  <input
                    type="text"
                    id="cvv"
                    value={formData.cvv}
                    onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                    className="form-input"
                    placeholder="123"
                    required
                  />
                </div>
              </div>

              <div className="payment-methods">
                <p className="payment-methods-text">We accept:</p>
                <div className="payment-icons">
                  <span className="payment-badge">Visa</span>
                  <span className="payment-badge">Mastercard</span>
                  <span className="payment-badge">PayPal</span>
                  <span className="payment-badge">Stripe</span>
                </div>
              </div>
            </div>

            <Button type="submit" fullWidth disabled={loading}>
              {loading ? 'Processing...' : `Place Order - $${total.toFixed(2)}`}
            </Button>
          </form>
        </div>

        <div className="order-summary-section">
          <h2 className="summary-title">Order Summary</h2>
          <div className="checkout-items">
            {cartItems.map((item) => (
              <div key={item.id} className="checkout-item">
                <img src={item.image} alt={item.name} className="checkout-item-image" />
                <div className="checkout-item-info">
                  <h4 className="checkout-item-name">{item.name}</h4>
                  <p className="checkout-item-details">Size: {item.size} | Qty: {item.quantity}</p>
                  <p className="checkout-item-price">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="summary-divider"></div>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>International Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Tax (10%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-row summary-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="shipping-info">
            <p className="shipping-info-text">
              Estimated delivery: 7-14 business days via DHL/FedEx
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
