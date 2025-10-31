import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">ELEGANZA</h3>
          <p className="footer-description">
            Premium Pakistani fashion for the global audience. Handcrafted quality,
            delivered worldwide from our atelier to your doorstep.
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><a href="#shop">Shop</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#shipping">Shipping Policy</a></li>
            <li><a href="#returns">Returns & Exchanges</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Customer Care</h4>
          <ul className="footer-links">
            <li><a href="mailto:info@eleganza.com">info@eleganza.com</a></li>
            <li><a href="https://wa.me/923001234567">WhatsApp: +92 300 1234567</a></li>
            <li>Mon-Sat: 9:00 AM - 6:00 PM (PKT)</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Follow Us</h4>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <Facebook size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <Instagram size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <Twitter size={20} />
            </a>
            <a href="mailto:info@eleganza.com" className="social-icon">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Eleganza. All rights reserved. Designed in Pakistan, Delivered Worldwide.</p>
      </div>
    </footer>
  );
}
