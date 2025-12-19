import api from '../config/api';

export interface Product {
  _id: string;
  slug?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  sizeOptions: string[];
  images: { url: string; publicId?: string }[];
  stock: number;
  isFeatured: boolean;
  material?: string;
  colors?: string[];
  rating?: number;
  numReviews?: number;
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
  search?: string;
}

class ProductService {
  async getAllProducts(filters?: ProductFilters): Promise<Product[]> {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.minPrice) params.append('minPrice', filters.minPrice.toString());
    if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
    if (filters?.featured) params.append('featured', 'true');
    if (filters?.search) params.append('search', filters.search);

    const response = await api.get(`/products?${params.toString()}`);
    return response.data.data;
  }

  async getFeaturedProducts(): Promise<Product[]> {
    const response = await api.get('/products/featured');
    return response.data.data;
  }

  async getProductBySlug(slug: string): Promise<Product> {
    const response = await api.get(`/products/slug/${slug}`);
    return response.data.data;
  }

  async getProductById(id: string): Promise<Product> {
    const response = await api.get(`/products/${id}`);
    return response.data.data;
  }

  async createProduct(data: Partial<Product>): Promise<Product> {
    const response = await api.post('/products', data);
    return response.data.data;
  }

  async updateProduct(id: string, data: Partial<Product>): Promise<Product> {
    const response = await api.put(`/products/${id}`, data);
    return response.data.data;
  }

  async deleteProduct(id: string): Promise<void> {
    await api.delete(`/products/${id}`);
  }
}

export default new ProductService();








