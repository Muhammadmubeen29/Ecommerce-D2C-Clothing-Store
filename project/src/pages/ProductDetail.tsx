import { useState } from 'react';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import Button from '../components/Button';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product | null;
  onAddToCart: (productId: string, size: string) => void;
  onNavigate: (page: string) => void;
}

const reviews = [
  { id: 1, name: 'Sarah M.', rating: 5, comment: 'Absolutely stunning quality! The fabric is luxurious and the stitching is impeccable.', date: 'March 10, 2025' },
  { id: 2, name: 'Amira K.', rating: 5, comment: 'Fast shipping to the UK. The dress fits perfectly and looks exactly like the photos.', date: 'March 5, 2025' },
  { id: 3, name: 'Fatima R.', rating: 4, comment: 'Beautiful design and great quality. Took about 10 days to arrive in the USA.', date: 'February 28, 2025' },
];

export default function ProductDetail({ product, onAddToCart, onNavigate }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState('M');
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="not-found">
          <h2>Product not found</h2>
          <Button onClick={() => onNavigate('shop')}>Back to Shop</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <div className="product-image-section">
          <img src={product.image} alt={product.name} className="detail-image" />
        </div>

        <div className="product-info-section">
          <p className="product-category-tag">{product.category}</p>
          <h1 className="product-title">{product.name}</h1>
          <div className="product-rating">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} fill={i < Math.floor(product.rating || 0) ? "#D4AF37" : "none"} color="#D4AF37" />
            ))}
            <span className="rating-text">
              ({product.rating?.toFixed(1) || '4.8'} - {product.numReviews || 127} reviews)
            </span>
          </div>
          <p className="product-price-large">${product.price}</p>

          <div className="product-description">
            <h3 className="section-heading">Description</h3>
            <p>
              {product.description || 'Exquisite handcrafted piece featuring premium quality fabric with intricate detailing. Designed in Pakistan with traditional craftsmanship and contemporary aesthetics. Perfect for special occasions and celebrations.'}
            </p>
            <ul className="product-features">
              {product.material && <li>Material: {product.material}</li>}
              <li>Premium quality fabric</li>
              <li>Expert craftsmanship</li>
              <li>Traditional embroidery</li>
              <li>Worldwide shipping available</li>
            </ul>
          </div>

          <div className="size-selection">
            <h3 className="section-heading">Select Size</h3>
            <div className="size-options">
              {(product.sizeOptions && product.sizeOptions.length > 0 ? product.sizeOptions : sizes).map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`size-button ${selectedSize === size ? 'active' : ''}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="product-actions">
            {product.stock !== undefined && product.stock <= 0 ? (
              <div style={{ width: '100%' }}>
                <Button
                  disabled
                  fullWidth
                >
                  Out of Stock
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => {
                  onAddToCart(product.id, selectedSize);
                }}
                fullWidth
              >
                <ShoppingCart size={18} /> Add to Cart
              </Button>
            )}
            <button className="wishlist-button">
              <Heart size={20} />
            </button>
          </div>

          <div className="product-details">
            <h3 className="section-heading">Product Details</h3>
            <ul className="details-list">
              {product.material && <li><strong>Material:</strong> {product.material}</li>}
              {product.colors && product.colors.length > 0 && (
                <li><strong>Available Colors:</strong> {product.colors.join(', ')}</li>
              )}
              {product.stock !== undefined && (
                <li><strong>Stock:</strong> {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}</li>
              )}
              <li><strong>Care:</strong> Dry clean only</li>
              <li><strong>Origin:</strong> Handcrafted in Pakistan</li>
              <li><strong>Shipping:</strong> 7-14 business days worldwide</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="reviews-section">
        <h2 className="section-title">Customer Reviews</h2>
        <div className="reviews-grid">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <div>
                  <h4 className="review-name">{review.name}</h4>
                  <p className="review-date">{review.date}</p>
                </div>
                <div className="review-rating">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="#D4AF37" color="#D4AF37" />
                  ))}
                </div>
              </div>
              <p className="review-comment">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
