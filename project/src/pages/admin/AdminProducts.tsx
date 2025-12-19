// ...existing code...
import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Save, Upload, Link, Loader2 } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import adminService, { AdminProduct } from '../../services/adminService';
import aiService from '../../services/aiService';
import productService from '../../services/productService';
import Button from '../../components/Button';

export default function AdminProducts() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
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
    // AI-related fields
    keyFeatures: '',
    targetAudience: '',
    metaTitle: '',
    metaKeywords: '',
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
      keyFeatures: '',
      targetAudience: '',
      metaTitle: product.metaTitle || '',
      metaKeywords: product.metaKeywords || '',
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
        metaTitle: formData.metaTitle?.slice(0, 60) || undefined,
        metaKeywords: formData.metaKeywords || undefined,
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
      keyFeatures: '',
      targetAudience: '',
      metaTitle: '',
      metaKeywords: '',
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

  const triggerFileSelect = (index: number) => {
    const el = document.getElementById(`image-file-${index}`) as HTMLInputElement | null;
    el?.click();
  };

  const handleFileChange = async (index: number, file?: File) => {
    if (!file) return;
    try {
      // optimistic preview using local object URL
      const preview = URL.createObjectURL(file);
      updateImageUrl(index, preview);

      // upload to server
      const uploadService = (await import('../../services/uploadService')).default;
      const res = await uploadService.uploadImage(file);
      if (res?.url) {
        updateImageUrl(index, res.url);
      }
      // revoke local URL after upload to avoid memory leak
      URL.revokeObjectURL(preview);
    } catch (err) {
      console.error('Image upload failed', err);
      alert('Failed to upload image');
    }
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

  // AI generation handler (cleaned up)
  const handleGenerateAI = async () => {
    if (!formData.name.trim()) {
      alert('Please enter a product name first');
      return;
    }
    setAiLoading(true);
    try {
      const payload = {
        productName: formData.name,
        category: formData.category,
        price: formData.price,
        features: formData.keyFeatures,
        audience: formData.targetAudience,
      };

      const response = await aiService.generateProductContent(payload);
      const data = response?.data ?? response;

      if (!data || typeof data !== 'object' || typeof data.description !== 'string') {
        console.error('Invalid AI response shape:', data);
        alert('AI returned an unexpected result');
        return;
      }

      setFormData(prev => ({
        ...prev,
        description: data.description,
        metaTitle: (data.metaTitle ?? prev.metaTitle ?? '').toString().slice(0, 60),
        metaKeywords: data.metaKeywords ?? prev.metaKeywords ?? '',
      }));
    } catch (err) {
      console.error('AI generation failed:', err);
      alert('Failed to generate AI content');
    } finally {
      setAiLoading(false);
    }
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
                <ReactQuill
                  value={formData.description}
                  onChange={(value) => setFormData({ ...formData, description: value })}
                  theme="snow"
                  modules={{
                    toolbar: [
                      [{ 'header': [1, 2, false] }],
                      ['bold', 'italic', 'underline'],
                      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                      ['clean']
                    ],
                  }}
                  placeholder="Enter product description..."
                />

                <div className="ai-generator-section" style={{ marginTop: '16px' }}>
                  <div className="ai-inputs-grid">
                    <div className="ai-input-group">
                      <label>Key Features (one per line)</label>
                      <textarea
                        value={formData.keyFeatures}
                        onChange={(e) => setFormData({ ...formData, keyFeatures: e.target.value })}
                        rows={3}
                        placeholder="e.g. Breathable fabric&#10;Lightweight&#10;Machine washable"
                      />
                    </div>

                    <div className="ai-input-group">
                      <label>Target Audience</label>
                      <input
                        type="text"
                        value={formData.targetAudience}
                        onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                        placeholder="e.g. Young professionals, active travelers"
                      />
                    </div>
                  </div>

                  <div style={{ marginTop: '12px' }}>
                    <Button
                      type="button"
                      variant="primary"
                      onClick={handleGenerateAI}
                      disabled={aiLoading}
                    >
                      {aiLoading ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <span>🤖</span>
                          Generate AI Description
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Meta Title (max 60 chars)</label>
                <input
                  type="text"
                  value={formData.metaTitle}
                  onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value.slice(0, 60) })}
                />
              </div>

              <div className="form-group">
                <label>Meta Keywords (comma-separated)</label>
                <input
                  type="text"
                  value={formData.metaKeywords}
                  onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value })}
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
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', width: '100%' }}>
                      <input
                        type="url"
                        value={img.url}
                        onChange={(e) => updateImageUrl(index, e.target.value)}
                        placeholder="Image URL or paste URL here"
                        style={{ flex: 1 }}
                        required
                      />
                      <input
                        id={`image-file-${index}`}
                        style={{ display: 'none' }}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(index, e.target.files?.[0])}
                      />
                      <button type="button" onClick={() => triggerFileSelect(index)} className="button button-outline" style={{ padding: '8px 10px' }}>
                        <Upload size={16} />
                      </button>
                    </div>
                    {img.url && (
                      <div style={{ marginTop: 8 }}>
                        <img src={img.url} alt={`preview-${index}`} style={{ maxWidth: 120, maxHeight: 80, borderRadius: 6 }} />
                      </div>
                    )}
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