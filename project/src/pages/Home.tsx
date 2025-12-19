import { motion } from 'framer-motion';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';
import HeroSection from '../components/HeroSection';
import AnimatedText, { AnimatedParagraph, AnimatedSectionTitle } from '../components/AnimatedText';
import SEO from '../components/SEO';
import { Product } from '../types';

interface HomeProps {
  onNavigate: (page: string) => void;
  onViewProduct: (id: string) => void;
  featuredProducts: Product[];
}

export default function Home({ onNavigate, onViewProduct, featuredProducts }: HomeProps) {
  return (
    <>
      <SEO
        title="D2C Export Fashion - Premium Pakistani Fashion | Worldwide Shipping"
        description="Shop premium handcrafted Pakistani fashion including elegant kurtas, shalwar kameez, and traditional outfits. Fast worldwide shipping to USA, UK, Europe & Middle East."
        keywords="Pakistani fashion, kurta, shalwar kameez, traditional clothing, ethnic wear, online shopping, D2C export, handcrafted fashion, premium quality"
        image="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=630&fit=crop"
      />
    <div className="home-page">
      {/* Modern Hero Section */}
      <HeroSection
        featuredProducts={featuredProducts}
        onNavigate={onNavigate}
        onViewProduct={onViewProduct}
      />

      {/* Premium Banner Section */}
      <section className="premium-banner py-16 bg-gradient-to-r from-purple-900 to-indigo-900 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <AnimatedText
              text="Premium Collection 2025"
              className="text-4xl md:text-5xl font-bold mb-6"
              delay={0.2}
              animation="fadeInUp"
            />
            <AnimatedParagraph
              text="Exclusive designs for discerning customers worldwide"
              className="text-xl mb-8 opacity-90"
              delay={0.4}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Button variant="outline" onClick={() => onNavigate('shop')}>
                Explore Premium
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Collections Section */}
      <section className="featured-section py-16">
        <div className="container mx-auto px-6">
          <AnimatedSectionTitle
            title="Featured Collections"
            subtitle="Handpicked selections from our latest arrivals"
            delay={0.2}
          />
          <div className="product-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
              >
            <ProductCard
              {...product}
              onClick={() => onViewProduct(product.slug || product.id)}
            />
              </div>
          ))}
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="subscribe-section py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <AnimatedText
              text="Join Our Exclusive Community"
              className="text-3xl md:text-4xl font-bold mb-6"
              delay={0.2}
              animation="fadeInUp"
            />
            <AnimatedParagraph
              text="Subscribe to receive updates on new arrivals, exclusive offers, and our upcoming subscription box service."
              className="text-lg text-gray-600 mb-8"
              delay={0.4}
            />
            <form className="subscribe-form flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
                className="subscribe-input flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
              <Button type="submit">
                Subscribe
              </Button>
          </form>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section py-16">
        <div className="container mx-auto px-6">
          <AnimatedSectionTitle
            title="Why Choose Us"
            subtitle="Experience the difference with our premium services"
            delay={0.2}
          />
          <div className="features-grid grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="feature-card text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <AnimatedText
                text="Worldwide Shipping"
                className="text-xl font-semibold mb-3"
                delay={0.4}
                animation="fadeInUp"
              />
              <AnimatedParagraph
                text="Fast delivery via DHL, FedEx & Aramex to USA, UK, Europe & Middle East"
                className="text-gray-600"
                delay={0.5}
              />
            </div>
            <div className="feature-card text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <AnimatedText
                text="Premium Quality"
                className="text-xl font-semibold mb-3"
                delay={0.6}
                animation="fadeInUp"
              />
              <AnimatedParagraph
                text="Handcrafted with finest fabrics and attention to detail"
                className="text-gray-600"
                delay={0.7}
              />
            </div>
            <div className="feature-card text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
          </div>
              <AnimatedText
                text="Authentic Pakistani Fashion"
                className="text-xl font-semibold mb-3"
                delay={0.8}
                animation="fadeInUp"
              />
              <AnimatedParagraph
                text="Traditional craftsmanship meets contemporary design"
                className="text-gray-600"
                delay={0.9}
              />
          </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}