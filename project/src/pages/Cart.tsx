import { Trash2, ShoppingBag } from 'lucide-react';
import Button from '../components/Button';
import { CartItem } from '../types';

interface CartProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onNavigate: (page: string) => void;
}

export default function Cart({ cartItems, onUpdateQuantity, onRemoveItem, onNavigate }: CartProps) {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 25 : 0;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <ShoppingBag size={64} />
          <h2 className="empty-cart-title">Your cart is empty</h2>
          <p className="empty-cart-text">Add some items to get started!</p>
          <Button onClick={() => onNavigate('shop')}>Continue Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1 className="page-title">Shopping Cart</h1>

      <div className="cart-container">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-info">Size: {item.size}</p>
                <p className="cart-item-price">${item.price}</p>
              </div>
              <div className="cart-item-actions">
                <div className="quantity-control">
                  <button
                    onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className="quantity-button"
                  >
                    -
                  </button>
                  <span className="quantity-display">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="quantity-button"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="remove-button"
                  aria-label="Remove item"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2 className="summary-title">Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping (International)</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-row summary-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Button onClick={() => onNavigate('checkout')} fullWidth>
            Proceed to Checkout
          </Button>
          <button
            onClick={() => onNavigate('shop')}
            className="continue-shopping"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
