import { Globe, Heart, Package, Shield } from 'lucide-react';
import SEO from '../components/SEO';

export default function About() {
  return (
    <>
      <SEO
        title="About Us - Our Story | D2C Export Fashion"
        description="Learn about D2C Export Fashion - bringing the finest Pakistani fashion to the world. Authentic craftsmanship, premium materials, and worldwide shipping since our founding."
        keywords="about Pakistani fashion, D2C export, traditional craftsmanship, Pakistani textile heritage, ethnic fashion brand"
        image="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=630&fit=crop"
      />
      <div className="about-page">
      <section className="about-hero">
        <div className="about-hero-content">
          <h1 className="page-title">Our Story</h1>
          <p className="hero-text">
            Bringing the finest Pakistani fashion to the world, one masterpiece at a time.
          </p>
        </div>
      </section>

      <section className="about-content">
        <div className="content-section">
          <h2 className="section-title">Heritage Meets Modernity</h2>
          <p className="content-text">
            Founded with a vision to share Pakistan's rich textile heritage with the world, Eleganza
            represents the perfect blend of traditional craftsmanship and contemporary design. Each
            piece in our collection tells a story of skilled artisans, premium materials, and timeless
            elegance.
          </p>
          <p className="content-text">
            From the bustling workshops of Karachi to the fashion capitals of New York, London, and Dubai,
            our garments carry with them centuries of textile tradition and the promise of uncompromising
            quality.
          </p>
        </div>

        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon">
              <Heart size={32} />
            </div>
            <h3 className="value-title">Crafted with Passion</h3>
            <p className="value-text">
              Every piece is meticulously handcrafted by skilled artisans who pour their heart and
              expertise into creating wearable art.
            </p>
          </div>

          <div className="value-card">
            <div className="value-icon">
              <Shield size={32} />
            </div>
            <h3 className="value-title">Quality Assurance</h3>
            <p className="value-text">
              We maintain rigorous quality standards at every stage, from fabric selection to final
              inspection, ensuring excellence in every stitch.
            </p>
          </div>

          <div className="value-card">
            <div className="value-icon">
              <Globe size={32} />
            </div>
            <h3 className="value-title">Global Reach</h3>
            <p className="value-text">
              Partnering with trusted international couriers, we deliver our creations safely to
              customers across USA, UK, Europe, and Middle East.
            </p>
          </div>

          <div className="value-card">
            <div className="value-icon">
              <Package size={32} />
            </div>
            <h3 className="value-title">Premium Packaging</h3>
            <p className="value-text">
              Each order is carefully packaged to preserve its beauty and arrive in perfect condition,
              ready to delight the recipient.
            </p>
          </div>
        </div>

        <div className="content-section">
          <h2 className="section-title">Our Export Vision</h2>
          <p className="content-text">
            As a Direct-to-Consumer export brand, we eliminate the middleman to bring you authentic
            Pakistani fashion at honest prices. Our D2C model allows us to maintain complete control
            over quality while offering competitive pricing on premium garments.
          </p>
          <p className="content-text">
            We're committed to showcasing Pakistan's textile excellence on the global stage, building
            bridges between cultures through fashion, and making high-quality ethnic wear accessible
            to Pakistani diaspora and fashion enthusiasts worldwide.
          </p>
        </div>

        <div className="mission-section">
          <h2 className="section-title">Our Promise</h2>
          <div className="promise-list">
            <div className="promise-item">
              <span className="promise-number">01</span>
              <div>
                <h4 className="promise-title">Authentic Craftsmanship</h4>
                <p className="promise-text">Genuine Pakistani designs and traditional techniques</p>
              </div>
            </div>
            <div className="promise-item">
              <span className="promise-number">02</span>
              <div>
                <h4 className="promise-title">Premium Materials</h4>
                <p className="promise-text">Only the finest fabrics sourced from trusted suppliers</p>
              </div>
            </div>
            <div className="promise-item">
              <span className="promise-number">03</span>
              <div>
                <h4 className="promise-title">Reliable Delivery</h4>
                <p className="promise-text">Fast international shipping with tracking</p>
              </div>
            </div>
            <div className="promise-item">
              <span className="promise-number">04</span>
              <div>
                <h4 className="promise-title">Customer Satisfaction</h4>
                <p className="promise-text">Dedicated support team ready to assist you</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
