import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import Button from './Button';
import ProductCard from './ProductCard';
import { Product } from '../types';

interface HeroSectionProps {
  featuredProducts: Product[];
  onNavigate: (page: string) => void;
  onViewProduct: (id: string) => void;
}

export default function HeroSection({ featuredProducts, onNavigate, onViewProduct }: HeroSectionProps) {
  const displayProducts = featuredProducts.slice(0, 3);

  // Typing animation for the hero title
  const fullTitle = 'Elegance Crafted in Pakistan';
  const highlight = 'Pakistan';
  const highlightIndex = useMemo(() => fullTitle.indexOf(highlight), []);
  const [typedCount, setTypedCount] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (typedCount < fullTitle.length) {
      const t = setTimeout(() => setTypedCount((c) => c + 1), 50);
      return () => clearTimeout(t);
    }
  }, [typedCount]);

  useEffect(() => {
    const blink = setInterval(() => setShowCursor((v) => !v), 500);
    return () => clearInterval(blink);
  }, []);

  const currentText = fullTitle.slice(0, typedCount);
  const beforeHighlight = highlightIndex >= 0 ? currentText.slice(0, Math.min(highlightIndex, currentText.length)) : currentText;
  const highlightPart =
    highlightIndex >= 0 && typedCount > highlightIndex
      ? currentText.slice(highlightIndex, Math.min(highlightIndex + highlight.length, currentText.length))
      : '';
  const afterHighlight =
    highlightIndex >= 0 && typedCount > highlightIndex + highlight.length
      ? currentText.slice(highlightIndex + highlight.length)
      : '';

  return (
    <section className="modern-hero">
      <div className="hero-background">
        <div className="hero-gradient"></div>
        <div className="hero-pattern"></div>
      </div>

      <div className="hero-content">
        <div className="container mx-auto px-4 md:px-6">
          <div className="hero-layout">
            {/* Left Side - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="hero-text-section"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="hero-badge"
              >
                <Sparkles size={16} />
                <span>Premium Collection 2025</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="hero-title"
              >
                {/* Typing animation with gradient highlight on Pakistan */}
                <span>{beforeHighlight}</span>
                {highlightPart && <span className="gradient-text">{highlightPart}</span>}
                <span>{afterHighlight}</span>
                <span style={{ opacity: showCursor ? 1 : 0 }}>&#124;</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="hero-subtitle"
              >
                Discover our premium collection of handcrafted Pakistani fashion.
                Traditional craftsmanship meets contemporary design for the modern connoisseur.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="hero-actions"
              >
                <Button onClick={() => onNavigate('shop')} variant="primary">
                  Shop Collection
                  <ArrowRight size={18} />
                </Button>
                <Button onClick={() => onNavigate('about')} variant="outline">
                  Our Story
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="hero-features"
              >
                <div className="feature-item">
                  <div className="feature-icon">🌍</div>
                  <div>
                    <strong>Worldwide Shipping</strong>
                    <span>USA, UK, Europe & Middle East</span>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✨</div>
                  <div>
                    <strong>Premium Quality</strong>
                    <span>Handcrafted with care</span>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">🚀</div>
                  <div>
                    <strong>Fast Delivery</strong>
                    <span>7-14 business days</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side - Product Showcase */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="hero-products-section"
            >
              {displayProducts.length > 0 ? (
                <div className="hero-products-grid">
                  {displayProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.2, duration: 0.6 }}
                      className="hero-product-card"
                    >
                      <ProductCard
                        {...product}
                        onClick={() => onViewProduct(product.slug || product.id)}
                      />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="hero-placeholder">
                  <div className="placeholder-image"></div>
                  <div className="placeholder-image"></div>
                  <div className="placeholder-image"></div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}




