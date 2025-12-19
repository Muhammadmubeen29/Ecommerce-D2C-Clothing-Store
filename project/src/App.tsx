import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetailPage from './pages/ProductDetailPage';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminRoute from './components/AdminRoute';
import { Product, CartItem } from './types';
import productService from './services/productService';

const slugify = (s: string) => s
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9\s-]/g, '')
  .replace(/\s+/g, '-')
  .replace(/-+/g, '-');
import { useAuth } from './context/AuthContext';


// Main app content component
function AppContent() {
  const { isAuthenticated, user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch all products
        const data = await productService.getAllProducts();
        // Convert backend products to frontend format
        const formattedProducts = data.map(product => ({
          id: product._id,
          slug: product.slug || slugify(product.name),
          name: product.name,
          price: product.price,
          image: product.images[0]?.url || '',
          category: product.category,
        }));
        setProducts(formattedProducts);

        // Fetch featured products for slideshow
        try {
          const featuredData = await productService.getFeaturedProducts();
          const formattedFeatured = featuredData.map(product => ({
            id: product._id,
            slug: product.slug || slugify(product.name),
            name: product.name,
            price: product.price,
            image: product.images[0]?.url || '',
            category: product.category,
          }));
          setFeaturedProducts(formattedFeatured.length > 0 ? formattedFeatured : formattedProducts.slice(0, 5));
        } catch (error) {
          // Fallback to first 5 products if featured products fetch fails
          setFeaturedProducts(formattedProducts.slice(0, 5));
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
        // Use fallback mock data if backend is not available
        setProducts([]);
        setFeaturedProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleNavigate = (page: string) => {
    navigate(`/${page}`);
    window.scrollTo(0, 0);
  };

  const handleViewProduct = (slugOrId: string) => {
    navigate(`/product/${slugOrId}`);
  };

  const handleAddToCart = (productId: string, size: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cartItems.find(item => item.id === productId && item.size === size);

    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === productId && item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1, size }]);
    }

    alert('Item added to cart!');
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="app">
      <Navbar
        cartItemsCount={cartItemsCount}
        onNavigate={handleNavigate}
        currentPage=""
        isAuthenticated={isAuthenticated}
        userName={user?.name}
      />

      <main className="main-content">
        <Routes>
          <Route path="/" element={
            <Home
              onNavigate={handleNavigate}
              onViewProduct={handleViewProduct}
              featuredProducts={featuredProducts}
            />
          } />
          <Route path="/shop" element={
            <Shop
              products={products}
              onViewProduct={handleViewProduct}
            />
          } />
          <Route path="/login" element={
            <Login onNavigate={handleNavigate} />
          } />
          <Route path="/product/:slug" element={
            <ProductDetailPage
              onAddToCart={handleAddToCart}
              onNavigate={handleNavigate}
            />
          } />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/*" element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } />
          <Route path="/cart" element={
            <Cart
              cartItems={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onNavigate={handleNavigate}
            />
          } />
          <Route path="/checkout" element={
            <Checkout
              cartItems={cartItems}
              onNavigate={handleNavigate}
              onClearCart={handleClearCart}
            />
          } />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<AppContent />} />
      </Routes>
    </Router>
  );
}

export default App;