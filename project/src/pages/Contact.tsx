import { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import Button from '../components/Button';
import SEO from '../components/SEO';
import contactService from '../services/contactService';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await contactService.submitContactForm(formData);
      setSuccessMessage(response.message || 'Thank you for your inquiry! We will get back to you within 24 hours.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Contact Us - Get In Touch | D2C Export Fashion"
        description="Contact D2C Export Fashion for inquiries about products, shipping, or orders. We're here to help with email, phone, and WhatsApp support. Response within 24 hours."
        keywords="contact Pakistani fashion, customer support, D2C export contact, fashion inquiries, shipping questions"
        image="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=630&fit=crop"
      />
      <div className="contact-page">
      <div className="contact-header">
        <h1 className="page-title">Get In Touch</h1>
        <p className="page-subtitle">Have questions? We'd love to hear from you.</p>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <h2 className="info-title">Contact Information</h2>
          <p className="info-text">
            Reach out to us through any of the following channels. Our team is ready to assist you
            with your queries about our products, shipping, or orders.
          </p>

          <div className="contact-methods">
            <div className="contact-method">
              <div className="method-icon">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="method-title">Email</h4>
                <a href="mailto:info@eleganza.com" className="method-link">info@eleganza.com</a>
                <p className="method-text">Response within 24 hours</p>
              </div>
            </div>

            <div className="contact-method">
              <div className="method-icon">
                <MessageCircle size={24} />
              </div>
              <div>
                <h4 className="method-title">WhatsApp</h4>
                <a href="https://wa.me/923001234567" className="method-link">+92 300 1234567</a>
                <p className="method-text">Available Mon-Sat, 9 AM - 6 PM PKT</p>
              </div>
            </div>

            <div className="contact-method">
              <div className="method-icon">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="method-title">Phone</h4>
                <a href="tel:+923001234567" className="method-link">+92 300 1234567</a>
                <p className="method-text">Mon-Sat, 9 AM - 6 PM PKT</p>
              </div>
            </div>

            <div className="contact-method">
              <div className="method-icon">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="method-title">Address</h4>
                <p className="method-link">Karachi, Pakistan</p>
                <p className="method-text">Shipping worldwide</p>
              </div>
            </div>
          </div>

          <div className="social-section">
            <h3 className="social-title">Follow Us</h3>
            <p className="social-text">Stay updated with our latest collections and offers</p>
            <div className="social-links-contact">
              <a href="https://facebook.com" className="social-link-btn">Facebook</a>
              <a href="https://instagram.com" className="social-link-btn">Instagram</a>
              <a href="https://twitter.com" className="social-link-btn">Twitter</a>
            </div>
          </div>
        </div>

        <div className="contact-form-container">
          <h2 className="form-title">Send Us a Message</h2>
          {successMessage && (
            <div style={{ padding: '12px', marginBottom: '16px', backgroundColor: '#10b981', color: 'white', borderRadius: '8px' }}>
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div style={{ padding: '12px', marginBottom: '16px', backgroundColor: '#ef4444', color: 'white', borderRadius: '8px' }}>
              {errorMessage}
            </div>
          )}
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="form-input"
                required
              />
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
              <label htmlFor="subject" className="form-label">Subject</label>
              <input
                type="text"
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="form-textarea"
                rows={6}
                required
              />
            </div>

            <Button type="submit" fullWidth disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}
