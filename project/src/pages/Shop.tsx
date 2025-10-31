import { useState } from 'react';
import { Filter } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import SEO from '../components/SEO';
import { Product } from '../types';

interface ShopProps {
  products: Product[];
  onViewProduct: (id: string) => void;
}

export default function Shop({ products, onViewProduct }: ShopProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['all', 'casual', 'formal', 'ethnic'];
  const priceRanges = [
    { label: 'All Prices', value: 'all' },
    { label: 'Under $50', value: '0-50' },
    { label: '$50 - $100', value: '50-100' },
    { label: '$100 - $200', value: '100-200' },
    { label: 'Above $200', value: '200+' },
  ];

  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory;

    let priceMatch = true;
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(p => p.replace('+', ''));
      if (max) {
        priceMatch = product.price >= parseInt(min) && product.price <= parseInt(max);
      } else {
        priceMatch = product.price >= parseInt(min);
      }
    }

    return categoryMatch && priceMatch;
  });

  return (
    <>
      <SEO
        title="Shop Collection - Premium Pakistani Fashion | D2C Export Fashion"
        description="Browse our complete collection of premium Pakistani fashion. Filter by category and price range. Elegant kurtas, shalwar kameez, and traditional outfits with worldwide shipping."
        keywords="shop Pakistani fashion, kurta collection, shalwar kameez, traditional clothing, ethnic wear, online shopping, premium fashion"
        image="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=630&fit=crop"
      />
      <div className="shop-page">
      <div className="shop-header">
        <div>
          <h1 className="page-title">Shop Collection</h1>
          <p className="page-subtitle">Discover our complete range of premium Pakistani fashion</p>
        </div>
        <button
          className="filter-toggle"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={20} /> Filters
        </button>
      </div>

      <div className="shop-container">
        <aside className={`filters-sidebar ${showFilters ? 'active' : ''}`}>
          <div className="filter-section">
            <h3 className="filter-title">Category</h3>
            <div className="filter-options">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`filter-option ${selectedCategory === category ? 'active' : ''}`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3 className="filter-title">Price Range</h3>
            <div className="filter-options">
              {priceRanges.map((range) => (
                <button
                  key={range.value}
                  onClick={() => setPriceRange(range.value)}
                  className={`filter-option ${priceRange === range.value ? 'active' : ''}`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="shop-content">
          <p className="results-count">{filteredProducts.length} products found</p>
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onClick={() => onViewProduct(product.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
