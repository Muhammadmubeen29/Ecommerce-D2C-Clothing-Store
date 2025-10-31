import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from './ProductDetail';
import productService from '../services/productService';
import SEO from '../components/SEO';
import { Product } from '../types';

interface ProductDetailPageProps {
  onAddToCart: (productId: string, size: string) => void;
  onNavigate: (page: string) => void;
}

export default function ProductDetailPage({ onAddToCart, onNavigate }: ProductDetailPageProps) {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError('Product ID is required');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await productService.getProductById(id);
        // Convert backend product to frontend format
        const formattedProduct: Product = {
          id: data._id,
          _id: data._id,
          name: data.name,
          description: data.description,
          price: data.price,
          image: data.images[0]?.url || '',
          category: data.category,
          sizeOptions: data.sizeOptions,
          images: data.images,
          stock: data.stock,
          isFeatured: data.isFeatured,
          material: data.material,
          colors: data.colors,
          rating: data.rating,
          numReviews: data.numReviews,
        };
        setProduct(formattedProduct);
      } catch (err) {
        console.error('Failed to fetch product:', err);
        setError('Product not found');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="product-detail-page">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <div>Loading product...</div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-detail-page">
        <div className="not-found" style={{ textAlign: 'center', padding: '2rem' }}>
          <h2>{error || 'Product not found'}</h2>
          <button onClick={() => onNavigate('shop')} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${product.name} - D2C Export Fashion`}
        description={product.description || `Shop ${product.name} - Premium Pakistani fashion at $${product.price}. ${product.material ? `Made from ${product.material}.` : ''} Worldwide shipping available.`}
        keywords={`${product.name}, ${product.category}, Pakistani fashion, ${product.material || 'premium fabric'}, kurta, shalwar kameez`}
        image={product.image}
        url={typeof window !== 'undefined' ? window.location.href : ''}
        type="product"
        product={{
          name: product.name,
          price: product.price,
          currency: 'USD',
          availability: product.stock && product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
          category: product.category,
        }}
      />
      <ProductDetail product={product} onAddToCart={onAddToCart} onNavigate={onNavigate} />
    </>
  );
}

