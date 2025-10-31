import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Save } from 'lucide-react';
import adminService, { AdminProduct } from '../../services/adminService';
import productService from '../../services/productService';
import Button from '../../components/Button';

export default function AdminProducts() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Casual',
    sizeOptions: ['S', 'M', 'L', 'XL'],
    images: [{ url: '' }],
    stock: '',
    isFeatured: false,
    material: '',
    colors: [''],
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      alert('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: AdminProduct) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      sizeOptions: product.sizeOptions || ['S', 'M', 'L', 'XL'],
      images: product.images.length > 0 ? product.images : [{ url: '' }],
      stock: product.stock.toString(),
      isFeatured: product.isFeatured || false,
      material: product.material || '',
      colors: product.colors && product.colors.length > 0 ? product.colors : [''],
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await adminService.deleteProduct(id);
      alert('Product deleted successfully');
      fetchProducts();
    } catch (error: any) {
      console.error('Failed to delete product:', error);
      alert(error.response?.data?.message || 'Failed to delete product');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        sizeOptions: formData.sizeOptions.filter(s => s.trim() !== ''),
        images: formData.images.filter(img => img.url.trim() !== ''),
        stock: parseInt(formData.stock),
        isFeatured: formData.isFeatured,
        material: formData.material || undefined,
        colors: formData.colors.filter(c => c.trim() !== ''),
      };

      if (editingProduct) {
        await adminService.updateProduct(editingProduct._id, productData);
        alert('Product updated successfully');
      } else {
        await adminService.createProduct(productData);
        alert('Product created successfully');
      }

      setShowForm(false);
      setEditingProduct(null);
      resetForm();
      fetchProducts();
    } catch (error: any) {
      console.error('Failed to save product:', error);
      alert(error.response?.data?.message || 'Failed to save product');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'Casual',
      sizeOptions: ['S', 'M', 'L', 'XL'],
      images: [{ url: '' }],
      stock: '',
      isFeatured: false,
      material: '',
      colors: [''],
    });
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, { url: '' }] });
  };

  const removeImageField = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const updateImageUrl = (index: number, url: string) => {
    const newImages = [...formData.images];
    newImages[index].url = url;
    setFormData({ ...formData, images: newImages });
  };

  const addColorField = () => {
    setFormData({ ...formData, colors: [...formData.colors, ''] });
  };

  const removeColorField = (index: number) => {
    setFormData({
      ...formData,
      colors: formData.colors.filter((_, i) => i !== index),
    });
  };

  const updateColor = (index: number, color: string) => {
    const newColors = [...formData.colors];
    newColors[index] = color;
    setFormData({ ...formData, colors: newColors });
  };

  if (loading) {
    return <div className="admin-loading">Loading products...</div>;
  }

  return (
    <div className="admin-products">
      <div className="admin-section-header">
        <h2>Product Management</h2>
        <Button onClick={() => { setShowForm(true); setEditingProduct(null); resetForm(); }}>
          <Plus size={18} /> Add Product
        </Button>
      </div>

      {showForm && (
        <div className="admin-form-overlay">
          <div className="admin-form-container">
            <div className="admin-form-header">
              <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
              <button onClick={() => { setShowForm(false); setEditingProduct(null); resetForm(); }} className="close-btn">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-group">
                <label>Product Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Stock *</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  >
                    <option value="Casual">Casual</option>
                    <option value="Formal">Formal</option>
                    <option value="Ethnic">Ethnic</option>
                    <option value="Bridal">Bridal</option>
                    <option value="Summer">Summer</option>
                    <option value="Winter">Winter</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Material</label>
                  <input
                    type="text"
                    value={formData.material}
                    onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Size Options *</label>
                <div className="size-options-input">
                  {formData.sizeOptions.map((size, index) => (
                    <input
                      key={index}
                      type="text"
                      value={size}
                      onChange={(e) => {
                        const newSizes = [...formData.sizeOptions];
                        newSizes[index] = e.target.value;
                        setFormData({ ...formData, sizeOptions: newSizes });
                      }}
                      placeholder="S, M, L, XL"
                      className="size-input"
                    />
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Images *</label>
                {formData.images.map((img, index) => (
                  <div key={index} className="image-input-group">
                    <input
                      type="url"
                      value={img.url}
                      onChange={(e) => updateImageUrl(index, e.target.value)}
                      placeholder="Image URL"
                      required
                    />
                    {formData.images.length > 1 && (
                      <button type="button" onClick={() => removeImageField(index)} className="remove-btn">
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={addImageField} className="add-btn">Add Image</button>
              </div>

              <div className="form-group">
                <label>Colors</label>
                {formData.colors.map((color, index) => (
                  <div key={index} className="color-input-group">
                    <input
                      type="text"
                      value={color}
                      onChange={(e) => updateColor(index, e.target.value)}
                      placeholder="Color name"
                    />
                    {formData.colors.length > 1 && (
                      <button type="button" onClick={() => removeColorField(index)} className="remove-btn">
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={addColorField} className="add-btn">Add Color</button>
              </div>

              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  />
                  Featured Product
                </label>
              </div>

              <div className="form-actions">
                <Button type="submit" variant="primary">
                  <Save size={18} /> {editingProduct ? 'Update' : 'Create'} Product
                </Button>
                <Button type="button" variant="outline" onClick={() => { setShowForm(false); setEditingProduct(null); resetForm(); }}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="admin-products-grid">
        {products.length === 0 ? (
          <div className="admin-empty">No products found</div>
        ) : (
          products.map((product) => (
            <div key={product._id} className="admin-product-card">
              <div className="admin-product-image">
                <img src={product.images[0]?.url || '/placeholder.jpg'} alt={product.name} />
              </div>
              <div className="admin-product-info">
                <h3>{product.name}</h3>
                <p className="admin-product-category">{product.category}</p>
                <p className="admin-product-price">${product.price}</p>
                <p className="admin-product-stock">Stock: {product.stock}</p>
                {product.isFeatured && <span className="featured-badge">Featured</span>}
              </div>
              <div className="admin-product-actions">
                <button onClick={() => handleEdit(product)} className="edit-btn">
                  <Edit size={18} /> Edit
                </button>
                <button onClick={() => handleDelete(product._id)} className="delete-btn">
                  <Trash2 size={18} /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

